const router = require("express").Router()

const validate = require('../../middlewares/validate')
const User = require('../../models/User')
const mail = require('../../middlewares/mailer')

router.post('/new', validate, (req, res) => {
    // Define meeting
    let meeting = {
        timeStamp: req.body.timeStamp,
        topic: req.body.topic,
        members: req.body.members
    }
    // Add meeting to User's list
    User.findByIdAndUpdate(req.user.id, {$push: {meetings: meeting}})
        .then(user => {
            let members = req.body.members
            members.map(member => {
                mail(member, user, meeting);
            })
            res.sendStatus(200)
        })

})

module.exports = router