import chalk from "chalk";
import { Socket } from "net";
import { BaseAI } from "./base-ai";
import { BaseGame } from "./base-game";
import { BaseGameObject } from "./base-game-object";
import { BaseGameManager, IServerConstants } from "./game-manager";
import { ErrorCode, handleError } from "./handle-error";
import * as Serializer from "./serializer";

const EOT_CHAR = String.fromCharCode(4);

// tslint:disable:no-console

/**
 * Talks to the server receiving game information and sending commands to
 * execute via TCP socket. Clients perform no game logic
 */
export class Client {
    public gameManager?: BaseGameManager;

    private host = "";
    private printIO = false;
    private awaitingEOT = "";
    private awaitingEvents: {
        [event: string]: Array<(value: any) => void> | undefined;
    } = {};

    private acceptingOrders = false;
    private cachedOrders: any[] = [];

    private socket?: Socket;
    private game?: BaseGame;
    private ai?: BaseAI;

    public connect(host: string, port: number, options: {
        printIO: boolean;
    }): Promise<void> {
        return new Promise((resolve, reject) => {
            this.host = host;
            this.printIO = options.printIO;

            console.log(chalk.cyan(`Connecting to: ${host}:${port}`));

            try {
                this.socket = new Socket();
                this.socket.connect({
                    host,
                    port,
                });
            }
            catch (err) {
                return handleError(
                    ErrorCode.COULD_NOT_CONNECT,
                    err,
                    `Could not connect to ${host}:${port}.`,
                );
            }

            this.socket.on("connect", () => {
                resolve();
            });

            const disconnected = (message: string) => () => {
                handleError(ErrorCode.DISCONNECTED_UNEXPECTEDLY, message);
            };

            this.socket.on("error", disconnected("Socket errored unexpectedly"));
            this.socket.on("close", disconnected("Server closed connection"));

            this.socket.on("data", (data) => {
                this.onData(data.toString());
            });
        });
    }

    public setup(
        ai: BaseAI,
        game: BaseGame,
        gameManager: BaseGameManager,
    ): void {
        this.ai = ai;
        this.game = game;
        this.gameManager = gameManager;
    }

    public send(event: string, data: any): void {
        this.sendRaw(
            JSON.stringify({
                sentTime: (new Date()).getTime(),
                event,
                data: Serializer.serialize(data),
            }) + EOT_CHAR,
        );
    }

    public async runOnServer(caller: BaseGameObject, functionName: string, args: {
        [key: string]: any;
    }): Promise<any> {
        this.send("run", {
            caller,
            functionName,
            args,
        });

        const ranData = await this.waitForEvent("ran");
        return Serializer.deSerialize(ranData, this.game!);
    }

    public waitForEvent(event: "named"): Promise<string>;
    public waitForEvent(event: "start"): Promise<{ playerID: string; }>;
    public waitForEvent(event: "lobbied"): Promise<{
        gameName: string;
        gameSession: string;
        constants: IServerConstants;
    }>;
    public waitForEvent(event: "ran"): Promise<any>;

    public waitForEvent(event: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.awaitingEvents[event]) {
                this.awaitingEvents[event] = [];
            }

            this.awaitingEvents[event]!.push(resolve);
        });
    }

    public disconnect(): void {
        if (this.socket) {
            try {
                this.socket.removeAllListeners("close");
                this.socket.removeAllListeners("error");

                this.socket.destroy();
            }
            catch (err) {
                // Ignore errors on disconnecting; as this should only happen
                // during times we don't care about error, such as handleError()
            }
        }
    }

    public acceptOrders(): void {
        this.acceptingOrders = true;
        for (const order of this.cachedOrders) {
            this.autoHandleOrder(order);
        }
    }

    private sendRaw(str: string): void {
        if (!this.socket) {
            throw new Error("Cannot write to socket that has not been initialized");
        }

        if (this.printIO) {
            console.log(chalk.magenta(`TO SERVER <-- ${str}`));
        }

        try {
            this.socket.write(str);
        }
        catch (err) {
            handleError(
                ErrorCode.DISCONNECTED_UNEXPECTEDLY,
                err,
                "Could not send string through server.",
            );
        }
    }

    private onData(data: string): void {
        if (this.printIO) {
            console.log(chalk.magenta(`FROM SERVER --> ${data}`));
        }

        const unparsedEvents = (this.awaitingEOT + data).split(EOT_CHAR);

        // The last element does not have an EOT_CHAR yet, so cache it
        this.awaitingEOT = unparsedEvents.pop()!; // There will always be at least 1 element

        for (const sent of unparsedEvents) {
            let parsed: any;
            try {
                parsed = JSON.parse(sent);
            }
            catch (err) {
                handleError(ErrorCode.MALFORMED_JSON, err, `Error parsing json: '${sent}'.`);
            }

            const callbacks = this.awaitingEvents[parsed.event];

            if (callbacks) {
                for (const callback of callbacks) {
                    callback(parsed.data);
                }

                continue;
            }

            if (this.tryToAutoHandle(parsed.event, parsed.data)) {
                continue;
            }

            return handleError(
                ErrorCode.UNKNOWN_EVENT_FROM_SERVER,
                `Cannot handle event '${parsed.event}'.`,
            );
        }
    }

    // --- auto handle events --- \\

    private tryToAutoHandle(event: string, data: any): boolean {
        switch (event) {
            case "order":
                this.autoHandleOrder(data);
                return true;
            case "delta":
                this.autoHandleDelta(data);
                return true;
            case "invalid":
                this.autoHandleInvalid(data);
                return true;
            case "fatal":
                this.autoHandleFatal(data);
                return true;
            case "over":
                this.autoHandleOver(data);
                return true;
            default:
                return false;
        }
    }

    private async autoHandleOrder(data: any): Promise<any> {
        if (!this.acceptingOrders) {
            this.cachedOrders.push(data);
            return; // it's cached and will be re0invoked later
        }

        let returned: any;
        const aiOrderCallback: (...args: any[]) => Promise<any> | undefined
            = (this.ai as any)[data.name];

        if (aiOrderCallback) {
            const args: any[] = Serializer.deSerialize(data.args, this.game!);
            try {
                returned = await aiOrderCallback.apply(this.ai, args);
            }
            catch (err) {
                handleError(
                    ErrorCode.AI_ERRORED,
                    err,
                    `AI errored in order '${data.name}'.`,
                );
            }
        }
        else {
            handleError(
                ErrorCode.REFLECTION_FAILED,
                `Could not find AI order function '${data.name}'.`,
            );
        }

        this.send("finished", {
            orderIndex: data.index,
            returned,
        });
    }

    private async autoHandleDelta(delta: any): Promise<void> {
        try {
            this.gameManager!.applyDeltaState(delta);
        }
        catch (err) {
            handleError(
                ErrorCode.DELTA_MERGE_FAILURE,
                err,
                "Error applying delta state.",
            );
        }

        if (this.ai!.player) { // The AI is ready for updates
            try {
                await this.ai!.gameUpdated();
            }
            catch (err) {
                handleError(
                    ErrorCode.AI_ERRORED,
                    err,
                    "AI errored in gameUpdate() after delta.",
                );
            }
        }
    }

    private autoHandleInvalid(data: {message: string}): void {
        try {
            this.ai!.invalid(data.message);
        }
        catch (err) {
            handleError(ErrorCode.AI_ERRORED, err, "AI errored in invalid().");
        }
    }

    private autoHandleFatal(data: {message: string}): void {
        handleError(
            ErrorCode.FATAL_EVENT,
            `Got fatal event from server: ${data.message}`,
        );
    }

    private autoHandleOver(data: any): never {
        const won = this.ai!.player.won;
        const reason = won ? this.ai!.player.reasonWon : this.ai!.player.reasonLost;

        console.log(chalk.green(
            `Game is over. ${won ? "I Won!" : "I Lost :("} because: ${reason}`,
        ));

        try {
            this.ai!.ended(won, reason);
        }
        catch (err) {
            handleError(ErrorCode.AI_ERRORED, err, "AI errored in ended().");
        }

        if (data.message) {
            const message = data.message.replace("__HOSTNAME__", this.host);
            console.log(chalk.cyan(message));
        }

        this.disconnect();

        return process.exit(0);
    }
}

export const client = new Client();
