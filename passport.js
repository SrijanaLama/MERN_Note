const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;

const User = require('./models/User');

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}
//authorization 
passport.use(new JWTStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "srijana"
},(payload,done) =>{
    User.findById({_id : payload.sub},(err,user)=>{
        if(err)
            return done(err,false);
        if(user)
            return done(null,user);
        else   
            return done(null,false);
    });
}));


//authenticated local strategy using username and password
passport.use(new LocalStrategy ((username, password, done)=>{
    User.findOne({username},(err,user)=>{
        //something went wrong with database
        if(err)
            return done(err);
            //user not available
        if(!user)
            return done(null, false);

        //check password is correct
        user.comparePassword(password,done);

       
    })

}))