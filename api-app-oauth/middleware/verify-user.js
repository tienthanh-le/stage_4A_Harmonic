// Redo: using oauth2 instead of jwt/express-session
// Using passport stag : http://www.passportjs.org/packages/
// user data saved localy (in test_db) -> passport-local -> for "play only"
// 2 trag available : http://www.passportjs.org/packages/passport-google-oauth20/
// http://www.passportjs.org/packages/passport-oauth2/

// Verify Token

// function verifyToken(req, res, next) {
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if (typeof bearerHeader !== 'undefined') {
//         //Split at the space
//         const bearer = bearerHeader.split(' ');
//         //Get Token from array
//         const bearerToken = bearer[1];
//         //Set the Token
//         req.token = bearerToken;
//     } else {
//         // Forbidden
//         res.sendStatus(403)
//     }

// }

// exports.verifyToken = verifyToken
