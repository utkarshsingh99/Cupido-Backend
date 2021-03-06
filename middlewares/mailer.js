const sgMail = require('@sendgrid/mail');

const mail = (to, from, meeting) => {
    let date = new Date(meeting.timeStamp)
    meeting.time = date.getHours() + date.getMinutes()
    meeting.date = date.getDate() + date.getMonth()
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('Sending mail to', to);
    const msg = {
        to: to.email,
        from: from.email,
        subject: `${from.name} | New Meeting`,
        text: `Hi! This is an invite for a new meeting`,
        html: `
            <p>Hi!
            ${from.name} has invited you to a new meeting scheduled on ${meeting.date} at time ${meeting.time}. 
            Click on the following link to confirm your presence.</p>
        <a href="http://localhost:5000/invite/${to.email.split(/@|.com/)[0] + "%20" + to.email.split(/@|.com/)[1]}/${from.id}/${meeting.timeStamp}">Confirm Meeting</a>`,
    };
    sgMail.send(msg);
}

module.exports = mail