/**
 * JoborderController
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

function genereateTicketNumber(project_code, id){

  var return_value;

  var year = new Date().getFullYear();

  return project_code + '-' + year + '-' + AppHelper.str_pad(id, 6, '0', 'STR_PAD_LEFT');

}


module.exports = {
    
  _config: {},

  index : function (req, res, next) {
  	console.log(req.param('project_id'))
  	res.view();
  }, 

  view : function (req, res, next) {
  	res.view();
  },

  new : function (req, res, next) {

  	var view_vars = {
  	  project_id: req.param('project_id'), 
	  project_code: req.param('project_code'),
  	}
  	res.view(view_vars);
  },

  create: function (req, res, next) {

  	var joborder_to_insert = {
	  title : req.param('title'),  		  
	  requested_by : req.param('requested_by'),  		  
	  date_requested : AppHelper.convertToUnixTime(req.param('date_requested')),
	  remarks : req.param('remarks'),  		  
	  amount : req.param('amount'),  		  
	  status : req.param('status'),  		  
	  project_id : req.param('project_id')  		  
  	};

  	Joborder.create (joborder_to_insert).done( function( err, new_joborder ){
  	  if(err){
  	  	next(err);
  	  	return;
  	  }

      if(!new_joborder){
          req.session.flash = {
            error: {message: 'An Error Occured!, please try again!'}
          }        
          res.redirect('/project');
          return;               
       
      }else{

      	var ticketNumber = genereateTicketNumber(req.param('project_code'), new_joborder.id);

      	var update_job = {ticket_number: ticketNumber};

      	Joborder.update({id: new_joborder.id}, update_job, function(err, job_updated){
  		  if(err){
  		  	next(err);
  		  	return;
      	  }
      	});

        req.session.flash = {
          success: {message: 'New JobOrder Added'}
        }
        res.redirect('/project/view/' + req.param('project_id'));
        return;
      
      }

  	});
  }



  
};