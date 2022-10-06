const db = require('../database/models');
function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

   let emailInCookie = req.cookies.userEmail;
   if(emailInCookie != undefined 
    && req.session.userLogged == undefined){
        db.User.findOne({
            where: {
                Email: emailInCookie
            }
        })
        .then(user => {
            req.session.userLogged = user;
        })
        .catch(error => {
            console.log(error);
        });
}
  

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  } 

  next();
}

module.exports = userLoggedMiddleware;
