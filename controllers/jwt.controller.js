
module.exports.getJwt = async (req,res,next) => {

    try {
        const email = req.query.email;
        console.log(email);
        
        const token = jwt.sign(user,process.env.ACCESS_SECRET_TOKEN);
        console.log(token);
        return res.status(200).send(token);
    } catch (error) {
        res.send({ error: error.message });
    }

}