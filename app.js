var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('<html><head></head><body><h1>Hello world!</h1></body></html>');
});

app.get('/:id', function(req, res) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var request = req.params.id;
    var unix = request;
    var natural = request;
    var d, month, day, year, temp;
    
    // if the request is a natural date, set unix to the unix date parsed from natural
    if(isNaN(request)) {
        // set temp to standard UTC format so unix time is not time zone dependent
        d = new Date (request);
        // UTC so code is not time zone dependent
        month = d.getUTCMonth();
        year = d.getUTCFullYear();
        day = d.getUTCDate();
        temp = year + '-' + month + '-' + day
        // divide by 1,000 to convert from ms to seconds
        unix = String(Date.parse(temp)/1000);
    }
    // if the request is unix, set natural to the natural date parsed from unix
    else {
        // request is in ms, new js date is made in ms, so multiply by 1,000
        d = new Date(Number(request) * 1000);
        // UTC so code is not time zone dependent
        month = d.getUTCMonth();
        year = d.getUTCFullYear();
        day = d.getUTCDate();
        natural = months[month] +  ' ' + day + ', ' + year;
    }
    
    // if the request is not a number and it fails to be parsed into unix
    // or if the request is too high of a unix value
    // null will be returned
    if(unix === "NaN" || request > 253402041600) {
        res.json({ unix: null, natural: null, request: request});  
    }
    
    res.json({ unix: unix, natural: natural, request: request});
});

app.listen(port);