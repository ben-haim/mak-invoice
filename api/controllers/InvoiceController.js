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
  	  date_generated : AppHelper.getCurrentDate('%m-%d-%Y'),
      job_orders : getJobOrders(req.param("project_id")),
      project_id : req.param("project_id")
  	}

    // console.log(args);
  	res.view(args);
  },

  select: function (req, res, next){
    Joborder.findById(req.param("joborder_id")).done( function(err, job_orders){
      if(err){
        return next(err);
      }
      if(!job_orders){
        return {};
      }else{

        var job_ids = [];
        var dom_str = '';
        var totalamount = 0;
        for(key in job_orders){
          job_ids[key] = job_orders[key].id;
          totalamount = (totalamount + parseFloat(job_orders[key].amount));
          res.render('partials/invoice_jobs.ejs', {joborder: job_orders[key]}, function(err, html){
            dom_str = dom_str + html;
          });          
        }

        var args = {
          joborder_id : job_ids,
          html: dom_str,
          total_amount: AppHelper.number_format(totalamount, 2, ','),
          total_amount_raw: totalamount,
        }

        console.log(args);

        res.json(args); 
      }
    });
  },

  create: function(req, res, next){
    console.log(req.params.all());
  }
  
};



//------ custom functions 

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


function getJobOrders(projectid){

  var return_value = {};

  Joborder.find()
  .where({ project_id: projectid, status: 2})
  .sort('id')
  .exec(function(err, job_orders) {
    if(err){ 
      return next(err);
    }

    if(!job_orders){
     return null;
    }else{
      return_value = job_orders;
    }
  });
  return return_value;
}



