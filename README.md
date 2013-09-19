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



### How to run simple HTTP server, and to lint and unit tests files when they change in real time?
This command must be executed in the project root directory

	$ grunt

### How to active watch any file changes to lint them with JSHint and to re re run the unit tests in real time?

	$ grunt dev


### How to run all the e2e tests?
Needs the server started

	http://localhost:9000/test/e2e/runner.html
