const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const hbs = require('hbs');
const cors = require('cors')

const users = require("./routes/api/users");
const meetings = require("./routes/api/meetings");
const User = require('./models/User')

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.use(express.static('public'))

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

app.use(cors())

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/meetings", meetings);

app.get('/invite/:to/:from/:meetingId', (req, res) => {
  User.findById(req.params.from)
    .then(user => {
      let meeting = user.meetings.find(meeting => meeting.timeStamp === req.params.meetingId)
      console.log(meeting)
      res.render('invite', {meeting, to: req.params.to, from: req.params.from})
    })
})

app.get('/acceptinvite/:meetingId/:to', (req, res) => {
  let to = req.params.to
  to = to.split(' ').join('@').concat('.com')
  User.findOneAndUpdate({'meetings._id': req.params.meetingId}, {$push: {'meetings.$elem.membersFinalized': {email: to}}})
    .then(user => {
      console.log(user)
      res.send(to)
    }).catch(e => res.send(e)) 
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
