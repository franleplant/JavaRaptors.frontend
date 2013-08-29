var express = require('express');
var app = express();
app.configure(function () {
    app.use(
        "/", //the URL throught which you want to access to you static content
        express.static('../../') //where your static content is located in your filesystem
    );
});
app.listen(3000); //the port you want to use