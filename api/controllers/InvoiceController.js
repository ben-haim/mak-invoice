/**
 * InvoiceController
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

function getClientDetails(project_id){

  var return_value = {};

  Project.findOneById(project_id).done(function(err, project){
  	if(err){
  	  return err;
  	}
  	if(!project){
  	  return null;
  	}else{

 	  Client.findOneById(project.client_id).done( function(err, client){
	    if(err){
	      return err;
	    }
	    return_value = client;
	  });
  	}

  });

  return return_value;
}

module.exports = {
  
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to InvoiceController)
   */
  _config: {},

  new: function (req, res, next){

  	//get latest invoice number
  	var args = {
  	  client : getClientDetails(req.param("project_id")),
  	  date_generated : AppHelper.getCurrentDate('%m-%d-%Y')
  	}
  	res.view(args);
  }

  
};
