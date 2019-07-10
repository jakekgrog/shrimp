# Shrimp Bot

## Adding new commands

- Add a handler for your command in `messageHandlers.js`
- Add the command logic in a new file in the commands directory
- Add description and usage in the map located in the `help.js` command file 
- Submit a PR

- If your command requires a global variable, put it in the global vars json
- If you command requires a utility function, put it in the utils file
- If your command requires any special access keys, create a file called `keys.json` in the root directory

- Shrimp Bot has a NoSQL database behind it so any storage related stuff goes in `storageEngine.js`