/**
 * ProjectController
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
   * (specific to ProjectController)
   */
  _config: {},

  index: function(req, res, next){
  	res.locals.title = 'Projects'
  	res.view();
  },

  view: function(req, res, next){

    var project_list;
  	// res.view();
    Project.find().done(function(err, projects){
      if(err){return next(err);}
      project_list = projects;
    });
    res.json(project_list);
  },

  create: function(req, res, next){

    Project.create(req.params.all()).done(function(err, new_project){
      if(err){return next(err);}

      //to do:: Insert UserProject.create(); here

    });
    res.view();
  }

};