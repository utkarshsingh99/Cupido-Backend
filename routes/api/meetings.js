const router = require("express").Router()

const validate = require('../../middlewares/validate')
const User = require('../../models/User')
const Meeting = require('../../models/Meetings')
const mail = require('../../middlewares/mailer')

router.post('/new', validate, (req, res) => {
    // Define meeting
    let meeting = {
        timeStamp: req.body.timeStamp,
        topic: req.body.topic,
        members: req.body.members
    }
    console.log('New meeting created')
    // Add New Meeting
    let newMeet = new Meeting(meeting)
    newMeet.save().then(meet => {
        console.log('Meeting saved, ID: ', meet._id)
        User.findByIdAndUpdate(req.user.id, { $push: { meetings: {meetingId: meet._id} } })
            .then(user => {
                let members = req.body.members
                console.log('Meeting request: ', meeting)
                members.map(member => {
                    mail(member, user, meeting);
                })
                res.sendStatus(200)
            })
    })
    // Add meeting to User's list
    

})

module.exports = router