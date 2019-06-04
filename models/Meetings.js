const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const meetingSchema = new Schema({
    timeStamp: {
        type: String
    },
    topic: {
        type: String
    },
    members: [
        {
            email: String,
            accepted: Boolean
        }
    ]
});

module.exports = Meeting = mongoose.model("meetings", meetingSchema);
