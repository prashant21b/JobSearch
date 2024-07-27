const {expressjwt}=require('express-jwt')

exports.requireSingIn=expressjwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
});