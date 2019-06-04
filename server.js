const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const hbs = require('hbs');
const cors = require('cors')
const path = require('path')

const users = require("./routes/api/users");
const meetings = require("./routes/api/meetings");
const User = require('./models/User')
const Meeting = require('./models/Meetings')
const acceptMail = require('./middlewares/acceptMailer')

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'client/build')))

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
  Meeting.findOne({timeStamp: req.params.meetingId})
    .then(meeting => {
      console.log(meeting)
      res.render('invite', { meeting, to: req.params.to, from: req.params.from })
    })
})

app.get('/acceptinvite/:meetingTime/:to', (req, res) => {
  let to = req.params.to
  to = to.split(' ').join('@').concat('.com')
  Meeting.findOneAndUpdate({timeStamp: req.params.meetingTime}, {$push: {members: {email: to, accepted: true}}})
    .then(meeting => {
      meeting.members.map(member => {
        acceptMail(to, member.email, {name: 'Accepted Invitation'}, meeting)
      })
    }) 
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
