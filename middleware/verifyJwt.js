const jwt = require('jsonwebtoken');
module.exports.veryfyJwt = async (req,res,next) => {
    try {
        const { authorization } = req.headers;
        const { refreshToken } = req.cookies;
        // console.log(authorization);
        // console.log(authHeader);
        // console.log('rea',req)
        // console.log('refreshToken',refreshToken);
        const token = authorization && authorization.split(' ')[1];
        if (token === null) return res.status(401).json({ error: 'Unauthorized' });
        jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,user) => {
            if (err) {

                
                    jwt.verify(refreshToken,process.env.ACCESS_REFRESH_TOKEN,(err,user) => {
                        if (err) {
                            return res.status(403).json({
                                logout: true,
                                error: 'session Expired',
                                message: 'Please login again',

                            });
                        }
                        // const accessToken = jwt.sign({ email: user.email },process.env.ACCESS_SECRET_TOKEN,{ expiresIn: '15s' });


                        req.accessToken = accessToken;
                        req.user = user;
                     next();


                    })

                
            } else {
                req.user = user;
                next();
            }
        })
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
}