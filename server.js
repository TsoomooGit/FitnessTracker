var express = require("express");
var path = require("path");
const moment = require("moment");

var PORT = process.env.PORT || 8082;

/** Mongoose connection */
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});

const Activity = require("./models/Workout");

var app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//Adding new activity
app.post("/add", function(req, res) {
  console.log(req.body);
  var data = req.body;
  var newEntry = new Activity({
    name: data.activity,
    calories: data.calories,
    timestamp: moment().format("YYYY-MM-DD"),
    time: moment().format('h:mm:ss a')
  });
  newEntry.save(function(err, entry) {
    if (err) return console.error(err);
    console.log("Successfully saved the activity");
  });
});

//getting activities for requested date
app.get("/activities", function(req, res) {
  Activity.find({})
    .sort({ timestamp: 1 })
    .then((data) => res.json(data))
    .catch((err) => res.status(422).json(err));

});


app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
