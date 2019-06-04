## Backend Repository for Universal Meeting Scheduler

Due to shortage of time, I couldn't host the site properly on heroku. There are certain Build issues that I could not resolve given the time.
Thus, I would request the user to run the repo in their PCs as a development server.

### Steps
- Git Clone the repo
- "npm install"
- "npm start"

### Solution
- A very basic login system has been used. Middleware validation for every request is performed using jwt
- SendGrid API is used for Email Management. 
- The user sends the users to invite for a meeting. The server then sends a notification to everyone in the list.
- Two records are created for each such request: 
    - Meeting - a new meeting record consisting of the topic, time of the meeting, and members invited is created
    - User - a new entry for the user under meetings array is added consisting of the meetingId from the meetings collection.
- A notification email is also sent back to all members of the meeting once a member accepts the invitation.

### Last Notes
- There are a couple of functionalities that I have failed to build in this assignment:
    - Every 30 minute notification for an invited member ( would have used CRON jobs for this )
    - User can see previous meeting ( would have made DB queries, maybe modified the Schema to add a MinutesOfMeeting field )
    - Common meetings b/w 2 or more emails ( DB Queries )
