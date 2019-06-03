const jwt = require('jsonwebtoken')

const validate = (req, res, next) => {
    const jw = req.headers.authorization.split(' ')[1]
    console.log('Inside middleware', jw)

    jwt.verify(jw, 'secret', (err, decoded) => {
        console.log(decoded)
        req.user = decoded
    })
    next();
}

module.exports = validate