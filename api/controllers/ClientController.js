/**
 * ClientController
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
   * (specific to ClientController)
   */ 
  _config: {},

  index: function(req, res, next){
 
    Client.find()
    .where({ user_id: req.session.userSessionObject.id, is_active: 1})
    .sort('id')
    .exec(function(err, clients) {
      if(err){ return next(err);}

      if(!clients){
        res.redirect('/session/new');
        return;
      }else{
        res.view({client_list: clients});
      }
    });

  },

  create: function(req, res, next){
    var client_details = {
      name: req.param('name'),
      company: req.param('company'),
      designation: req.param('designation'),
      address: req.param('address'),
      user_id: req.session.userSessionObject.id   
    }

    Client.create(client_details).done(function(err, new_client){
      if(err){return next(err);}
      
      if(!new_client){
          req.session.flash = {
            error: {message: 'An Error Occured!, please try again!'}
          }        
          res.redirect('/client');
          return;
       
      }else{
        req.session.flash = {
          success: {message: 'New Client Added'}
        }
        res.redirect('/client/');
        return;
      }
    });    
  },

  new: function(req, res, next){
  	res.view();
  },

  edit: function(req, res, next){
   if(!req.param('id')){
      res.redirect('/client');
      return;
    }

    Client.findOneById(req.param('id')).done(function(err, client){
      if(err){return next(err);}

      if(!client){
        res.redirect('/client');
        return;
      }else{
        res.view({client_details: client});
      }

    });        
    // res.view();
  },

  view: function(req, res, next){
  	res.view();
  },

  update: function(req, res, next){
    var client_details = {
      name: req.param('name'),
      company: req.param('company'),
      designation: req.param('designation'),
      address: req.param('address'),
    }

    Client.update({id: req.param('id')}, client_details, function(err, client_details){
      if(err){return next(err);}

      if(!client_details){
          req.session.flash = {
            error: {message: 'An Error Occured!, please try again!'}
          }        
          res.redirect('/client');
          return;
      }else{
        req.session.flash = {
          success: {message: 'Client details updated!'}
        }
        res.redirect('/client');
        return;
      }
    });
  },

  deactivate: function(req, res, next){
    if(!req.param('id')){
      res.redirect('/client');
      return;
    }   

    Client.update({id: req.param('id')}, {is_active: 0}, function(err, updated_client){
      if(err){return next(err);}

      if(!updated_client){
          req.session.flash = {
            error: {message: 'An Error Occured!, please try again!'}
          }        
          res.redirect('/client');
          return;
      }else{
        req.session.flash = {
          success: {message: 'Client deactivate!'}
        }
        res.redirect('/client');
        return;
      }
    });    
  }  

  
};
