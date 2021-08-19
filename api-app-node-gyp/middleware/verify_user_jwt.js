// FORMAT TOKEN
// Authorization: Bearer <access_token>

// Verify Token

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get Token from array
        const bearerToken = bearer[1];
        //Set the Token
        req.token = bearerToken;
    } else {
        // Forbidden
        res.sendStatus(403)
    }

}

exports.verifyToken = verifyToken
