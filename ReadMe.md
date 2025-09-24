# testris

Testris is an implementation of tetris I made early during my first semester at Howest.  It is a rough implementation of tetris entirely within html/css/javascript.  The code quality is horrible because only a single javascipt file is used.

## Features

Testris has:
- delayed autoshift
- held pieces
- SRS kick system and piece rotations
- sound effects, which you can turn off
- several gamemodes (can be found at the bottom of the script)
- adjustable controls and handling
- displays simple events of things you did during the game
- a simple damage system
- 2 different skins

## Controls and Handling

Near the top of the code, from line 219 to 234 some simple controls can be found.
For DAS, ARR, SDF and DCD you can enter the time in miliseconds.
For the keybinds you can use the key name of the keybind you want to use.
Turning sound on and off is just a boolean.

## Changing the gamemode

On line 1424, you can find a function which contains all gamemodes.
Each gamemode is a function that should be called within the update function.
Some gamemodes require the timestamp, or other parameters for things such as difficulty.
By default the steadyDamage gamemode is used.

## Changing the skin

You can change the skin used on line 206, currently only values 0 and 1 will work.



It's pretty hard to use this because all configuration has been done in the code however I still hope someone can have some fun with this.

Some assets (soundeffects and skin) were taken from tetris99.