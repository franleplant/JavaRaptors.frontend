JavaRaptors - Library system: Front End
====================

Java Raptors front end.

This requires node.js

### How to bootstrap?

Install grunt globally

	$ npm install -g grunt-cli 

We may have this dep already installed in our JavaRaptors VM


Install all project dependencies 
This command must be executed in the project root directory

	$ npm install



### How to run a simple http server? 
This command must be executed in the project root directory

	$ grunt

### How to active watch any file changes to lint them with JSHint in real time?

	$ grunt watch 


### How to run all the unit tests?
This command will also run the tests whenever a file changes.

	$ grunt karma

### How to run all the e2e tests?
Needs the server started

	http://localhost:9000/test/e2e/runner.html
