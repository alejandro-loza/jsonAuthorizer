# Authorizer

To solve the challenge I have chosen to create a CLI tool, which obtains the path to the JSON file and reads it.

For this the CLI uses the Comander plugin to create a promp command and the authorizer service would read the file using a stream reader that transforms it into JSON object,
once the CLI gets the JSON object that will be sent to the authorizer processing service using pipes, this way the CLI could be reading and processing at the same time.

After processing the row that will be written to an output file using pipes and a write stream.

The authorizer service will create an immutable singleton account once it gets a valid account row, that authorizer has a private queue to store the first 3 valid transactions and will push the new ones when all the rules are accepted, the last transaction row would have the remaining available amount of the account.

To store into the queue the new transactions there is a ruler function object that checks each rule in an asynchronous process, this way we will save processing time and avoid the use of the switch structure.

The Singleton and Strategy patterns have been used in the solution.

**Tech stack used:**
-Node.js
-Days.js
-Commander.js
-jest
 
I chose this stack because it is the most suitable for CLI type applications, it provides natural asynchronous processing and functional programming capabilities. 
To test the CLI I used jest because it is a well-known tool for testing in node.
Commander came to mind because I wanted to spend less time creating command-based logic.
Days.js is a recommendation because momment.js is going to be deprecated. 

**How to use.**  

-	Install the dependency 
> npm install ó npm i
-	Run the CLI
>  node . authorize {YOUR_FILE_PATH}.json
- Help command
> node . --help

- If you want a global install the CLI tool on your promp
>  npm i -g  

-	Run the CLI
> authorizer authorize {YOUR_FILE_PATH}.json
- Help command
> authorizer --help

**Test run**
> npm run test
