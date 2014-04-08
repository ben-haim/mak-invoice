/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var obj_bcrypt = require('bcrypt');
module.exports = {
  
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionController)
   */
  _config: {},

  index: function(req, res, next){
  	res.redirect('/session/new');
  	return;
  },

  auth: function(req, res, next){
    var username = req.param('username');
    var password = req.param('password');
    
    //check for empty values then redirect    
    if(!username || !password){
      req.session.flash = {
        err: {message: 'Please fill-in the login form.'}
      }
      res.redirect('/session/new/');
      return;
    }

    //find username
    User.findOneByUsername(username).done(function(err, found_user){
      if(err){return next(err);}

      if(!found_user){
        req.session.flash = {
          err: {message: 'Username is not found!'}
        }
        res.redirect('/session/new/');
        return;        
      }

      //check password
      obj_bcrypt.compare(password, found_user.password, function(err, valid){
        if(err){return next(err);}

        //invalid password
        if(!valid){
          req.session.flash = {
            err: {message: 'Password is incorrect'},
            uname: username
          }
          res.redirect('/session/new/');
          return;          
        }else{
          req.session.authenticated = true;
          req.session.userSessionObject = found_user;
          res.redirect('/project');
          return;  
        }

      });

    });

  },

  new: function(req, res, next){
    if(req.session.authenticated){
      res.redirect('/project');
      return;
    }
  	res.view('user/login.ejs');
  },

  logout: function(req, res, next){
    req.session.authenticated = false;
    req.session.userSessionObject = {}
    res.redirect('/session/new');
    return;
  },

  
};
