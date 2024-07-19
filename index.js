// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function (req, res) {
  const inputDate = req.params.date
  const regexUtc = /^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}/;
  const regexUnix = /[0-9]{1,13}/;
  if (inputDate.match(regexUtc)) {
    const utcDate = new Date(inputDate);
    const unixDate = utcDate.getTime();
    const utcMsg = utcDate.toUTCString();
    res.json({"unix" : unixDate, "utc" : `${utcMsg}`})
  } else if (inputDate.match(regexUnix)) {
    const unixDate = Number(inputDate)
    const utcDate = new Date(unixDate);
    const utcMsg = utcDate.toUTCString();
    res.json({"unix" : unixDate, "utc" : `${utcMsg}`})
  } else {
    // res.json({ error : "Invalid Date" });
  }
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 5500, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
