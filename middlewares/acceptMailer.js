const sgMail = require('@sendgrid/mail');

const acceptMail = (constant, to, from, meeting) => {
    let date = new Date(meeting.timeStamp)
    meeting.time = date.getHours() + date.getMinutes()
    meeting.date = date.getDate() + date.getMonth()
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('Sending mail to', to);
    const msg = {
        to: to.email,
        from: constant.email,
        subject: `${from.name} | New Meeting`,
        text: `Hi! This is an invite for a new meeting`,
        html: `
            <p>Hi!
            ${constant.name} has accepted the invite for the meeting scheduled on ${meeting.date} at time ${meeting.time}.`,
    };
    sgMail.send(msg);
}

module.exports = acceptMail