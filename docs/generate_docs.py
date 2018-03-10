import os
import os.path
import shutil
import subprocess
import argparse
import re
import sys
from shutil import copyfile
from distutils.dir_util import copy_tree

def run(*args, **kwargs):
    error_code = subprocess.call(*args, **kwargs)
    if error_code != 0: # an error happened
        sys.exit(error_code)

def copy_module_files(base_path, joueur=False):
    for dirpath, dnames, filenames in os.walk(base_path):
        last_dir = os.path.split(dirpath)[1]
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            if filename.endswith('.ts'):
                path = os.path.join(dirpath, filename)
                local_path = dirpath[1:]
                game_name = last_dir[0].upper() + last_dir[1:]
                preferred = (filename == "index.ts" or filename == "run.ts")

                if not os.path.exists(local_path):
                    os.makedirs(local_path)

                with open(file_path, 'r') as file:
                    file_contents = file.read()

                with open(os.path.join(local_path, filename), 'w+') as file:
                    file.write("""
/**
 * {}
 * @module {}
 * {}
 */
{}
{}
""".format(
    "This is the namespace for the inner working of the TypeScript joueur client.\n *\n * 99.9% of the time none of this matters to you. However if you are curious how it works under the hood then it is documented here for your use." if joueur else "This contains all the class documentation for the {} game".format(game_name),
    "Joueur-ts-Core" if joueur else game_name,
    "@preferred" if preferred else "",
    "\n\n/** description */" if preferred else "",
    file_contents
))

"""
parser = argparse.ArgumentParser(description='Runs the python 3 client doc generation script.')
parser.add_argument('game', action='store', help='the name of the game you want to document. Must exist in ../games/')

args = parser.parse_args()

game_name = args.game[0].upper() + args.game[1:]
lower_game_name = game_name[0].lower() + game_name[1:]
"""

if os.path.isdir("./output"):
    shutil.rmtree("./output")

#copy_tree("../joueur/", "./joueur/")
#copy_tree("../games/", "./games/")
copyfile("../tsconfig.json", "./tsconfig.json")

copy_module_files("../games")
copy_module_files("../joueur", True)

"""
with open("../README.md", "r") as f:
    readme = f.read()

readme = readme.replace("GAME_NAME", game_name).replace("game_name", lower_game_name)

with open("README.md", "w+") as f:
    f.write(readme)
"""

run(["npm", "install"], shell=True)
run(["npm", "run", "docs"], shell=True)
copyfile("./favicon.ico", "./output/favicon.ico")

with open("./output/index.html", "r+") as file:
    index_contents = file.read()
    HEAD = "<head>"
    i = index_contents.find(HEAD) + len(HEAD)
    if i > -1:
        file.seek(0) # rewind
        file.write(index_contents[:i] + '\n\t<link rel="shortcut icon" href="favicon.ico">\n' + index_contents[i:])

# cleanup files we made
os.remove("tsconfig.json")
shutil.rmtree("./node_modules")
shutil.rmtree("./joueur")
shutil.rmtree("./games")
