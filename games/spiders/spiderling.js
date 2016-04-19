// Generated by Creer at 12:46AM on April 16, 2016 UTC, git hash: 'f74143f3f89eebeaa381aba30a8afbda7d0e1d89'
// This is a simple class to represent the Spiderling object in the game. You can extend it by adding utility functions here in this file.

var Class = require(__basedir + "/joueur/class");
var client = require(__basedir + "/joueur/client");
var Spider = require("./spider");


//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
// any additional requires you want can be required here safely between creer runs
//<<-- /Creer-Merge: requires -->>

/**
 * @class
 * @classdesc A Spider spawned by the BroodMother.
 * @extends Spider
 */
var Spiderling = Class(Spider, {
    /**
     * initializes a Spiderling with basic logic as provided by the Creer code generator
     *
     * @memberof Spiderling
     * @private
     */
    init: function() {
        Spider.init.apply(this, arguments);


        // The following values should get overridden when delta states are merged, but we set them here as a reference for you to see what variables this class has.


        /**
         * When empty string this Spiderling is not busy, and can act. Otherwise a string representing what it is busy with, e.g. 'Moving', 'Attacking'.
         *
         * @name Spiderling#busy
         * @type string
         */
        this.busy = "";

        /**
         * All the Spiderlings busy with the same work this Spiderling is doing, speeding up the task.
         *
         * @name Spiderling#coworkers
         * @type Array.<Spiderling>
         */
        this.coworkers = [];

        /**
         * The Web this Spiderling is using to move. Null if it is not moving.
         *
         * @name Spiderling#movingOnWeb
         * @type Web
         */
        this.movingOnWeb = null;

        /**
         * The Nest this Spiderling is moving to. Null if it is not moving.
         *
         * @name Spiderling#movingToNest
         * @type Nest
         */
        this.movingToNest = null;

        /**
         * How much work needs to be done for this Spiderling to finish being busy. See docs for the Work forumla.
         *
         * @name Spiderling#workRemaining
         * @type number
         */
        this.workRemaining = 0;

        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // any additional init logic you want can go here
        //<<-- /Creer-Merge: init -->>

    },


    /**
     * Attacks another Spiderling
     *
     * @memberof Spiderling
     * @instance
     * @param {Spiderling} spiderling - The Spiderling to attack.
     * @returns {boolean} - True if the attack was successful, false otherwise.
     */
    attack: function(spiderling) {
        return client.runOnServer(this, "attack", {
            spiderling: spiderling,
        });
    },

    /**
     * Starts moving the Spiderling across a Web to another Nest.
     *
     * @memberof Spiderling
     * @instance
     * @param {Web} web - The Web you want to move across to the other Nest.
     * @returns {boolean} - True if the move was successful, false otherwise.
     */
    move: function(web) {
        return client.runOnServer(this, "move", {
            web: web,
        });
    },


    //<<-- Creer-Merge: functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    // any additional functions you want to add to this class can be perserved here
    //<<-- /Creer-Merge: functions -->>

});

module.exports = Spiderling;