/**
 * UserController
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

module.exports = {
    
  
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {},

  edit: function(req, res, next){
  	res.view();
  },

  view: function(req, res){
  	res.view();
  }, 

  new: function(req, res){
  	res.view();
  },

  create: function(req, res, next){
    
    User.create(req.params.all()).done(function(err, user_added){
      if(err){next(err); return;}
      return res.json(user_added);
    });
  }

};
