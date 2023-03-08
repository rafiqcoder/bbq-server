const jwt = require('jsonwebtoken');
module.exports.veryfyJwt = (req,res,next) => {
    const { authorization } = req.headers;
    // console.log(authorization);
    // console.log(authHeader);
    const token = authorization && authorization.split(' ')[1];
    if (token == null) return res.status(401).json({ error: 'Unauthorized' });
    jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        // console.log(user);
        next();
    });
}