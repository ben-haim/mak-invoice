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

  create: function (req, res, next){

  	var args = {
  	  client : getClientDetails(req.param("project_id")),
  	  date_generated : AppHelper.getCurrentDate('%m-%d-%Y'),
      job_orders : getJobOrders(req.param("project_id")),
      project_id : req.param("project_id"),
      invoice_number: generateInvoiceNumber(),
  	}

    var new_invoice = {
      invoice_number : generateInvoiceNumber(),
      date_generated : AppHelper.convertToUnixTime( AppHelper.getCurrentDate('%m-%d-%Y') )
    }

    Invoice.create(new_invoice).done(function(err, invoice){
      if(err){
        return next(err);
      }

      if(!invoice){
        req.session.flash = {
          error: {message: 'An Error Occured!, please try again!'}
        }
        res.redirect('/project/view/' + req.param("project_id"));
        return;        
      }else{

        res.redirect("/" + req.param("project_code") + "/" + req.param("project_id") + "/invoice/setup/" + invoice.id );

      }
    });

  	// res.view(args);
  },

  select: function (req, res, next){

    var joborders = req.param("joborder_id");

    var amounts = [];
    var new_ids = [];

    var new_amount = 0;

    for(key in joborders){
      var pipe = AppHelper.explode("|", joborders[key]);
      new_amount = new_amount + parseFloat(pipe[1]);
      new_ids.push(pipe[0]);
    }

    var invoice = getInvoiceDetails(req.param("id"));

    //merge job ids
    var old_joborder_ids = AppHelper.explode("|", invoice.joborder_id);
    var merged_ids = (!old_joborder_ids) ? new_ids : old_joborder_ids.concat(new_ids);
    var total_amount = (invoice.total_amount) ? parseFloat(invoice.total_amount + new_amount) :  new_amount;

    var invoice_update = {
      joborder_id: AppHelper.implode("|", merged_ids),
      total_amount : total_amount
    }

    Invoice.update({id: req.param("id")}, invoice_update,function(err, invoice_updated){
      if(err){
        next(err);
        return;
      }

      if(!invoice_updated){

        req.session.flash = {
          error: {message: 'An Error Occured!, please try again!'}
        }
        res.redirect("/" + req.param("project_code") + "/" + req.param("project_id") + "/invoice/setup/" + req.param("id"));        
        return;  

      }else{

        req.session.flash = {
          error: {message: 'Invoice Updated!'}
        }        
        res.redirect("/" + req.param("project_code") + "/" + req.param("project_id") + "/invoice/setup/" + req.param("id"));        
      }

    });

  },

  setup: function(req, res, next){

    var invoice = getInvoiceDetails(req.param("invoice_id"));

    console.log(invoice);

    var args = {
      client : getClientDetails(req.param("project_id")),
      date_generated : AppHelper.convertDateToReadable("%m-%d-%Y", invoice.date_generated),
      job_orders : getJobOrders(req.param("project_id"), invoice.joborder_id),
      project_id : req.param("project_id"),
      project_code : req.param("project_code"),
      invoice_number: invoice.invoice_number,
      invoice_id: req.param("invoice_id"),
      invoice_body: getInvoiceBody(invoice.joborder_id),
      total_amount: invoice.total_amount,
      invoice: invoice,

    };

    console.log(args.job_orders);

    res.view(args);
  },

  removejoborder: function(req, res, next){

    var invoice = getInvoiceDetails(req.param("invoice_id"));

    var jobrders = AppHelper.explode("|", invoice.joborder_id);

    //remove joborder in array
    jobrders.splice( jobrders.indexOf( req.param("joborder_id") , 1));

    // console.log(invoice);
    console.log(jobrders);

    var invoice_update = {
      joborder_id : AppHelper.implode("|", jobrders),
      total_amount: parseFloat(invoice.total_amount - req.param("amount"))
    }

    //update invoice
    Invoice.update({id: req.param("invoice_id")}, invoice_update, function(err, invoice_updated){
      if(err){
        return next(err);
      }

      if(!invoice_updated){

        req.session.flash = {
          error: {message: 'An Error Occured!, please try again!'}
        }
        res.redirect("/" + req.param("project_code") + "/" + req.param("project_id") + "/invoice/setup/" + req.param("invoice_id"));        
        return;  

      }else{

        req.session.flash = {
          error: {message: 'Job Order removed, Invoice Updated!'}
        }        
        res.redirect("/" + req.param("project_code") + "/" + req.param("project_id") + "/invoice/setup/" + req.param("invoice_id"));        
      }

    })
    res.json({ret: req.params.all()})
  },

  save: function (req, res, next){
    console.log(req.params.all());

    var invoice_id = req.param("invoice_id");
    var project_code = req.param("project_code");

    delete req.params.all()["invoice_id"];
    delete req.params.all()["project_code"];

    Invoice.update({id: invoice_id}, req.params.all(), function(err, invoice_updated){
      if(err){
        return next(err);
      }

      if(!invoice_updated){

        req.session.flash = {
          error: {message: 'An Error Occured!, please try again!'}
        }
        res.redirect("/" + project_code + "/" + req.param("project_id") + "/invoice/setup/" + invoice_id);        
        return;  

      }else{

        req.session.flash = {
          error: {message: 'Invoice Saved!'}
        }        
        res.redirect("/" + project_code + "/" + req.param("project_id") + "/invoice/setup/" + invoice_id);        
      }
    });

  },

  generate: function(req, res, next){
    // console.log(req.params.all());

    var pdf = PdfGenerator.init();
    
    res.json({rest: 'test'});
    // res.view('setup.ejs');
    // res.download(PdfGenerator.init());
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

function getInvoiceDetails(invoice_id){
  var return_value = {};

  Invoice.findOneById(invoice_id).done(function(err, invoice){
    if(err){
      return err;
    }
    if(!invoice){
      return null;
    }else{
      return_value = invoice;
    }

  });

  return return_value;
}


function getJobOrders(projectid, exclude_ids){

  var ids = {};

  if(exclude_ids){
    console.log(exclude_ids);
    exclude_ids = AppHelper.explode('|', exclude_ids);

    ids = exclude_ids.map(function (x) { 
      return parseInt(x, 10); 
    });
  }

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

      var j_orders = {}

      for(key in job_orders){
        if(!AppHelper.in_array(job_orders[key].id, ids)){
          j_orders[key] = job_orders[key];
        }
      }
      return_value = j_orders;
    }
  });

  return return_value;

}

function generateInvoiceNumber(){

  var return_value = '';

  Invoice.find()
    .sort('id DESC')
    .limit(1)
    .exec(function (err, invoice){
      if(err){
        return next(err);
      }

      if(!invoice){
        return null;
      }else{
        var invoice_id = (invoice.length == 0) ? 1 : parseInt(invoice[0].id + 1);
        return_value = AppHelper.generateInvoiceNumber(invoice_id);
      }

  }); 

  return return_value;
}

function getInvoiceBody(joborder_id){
  var return_value = {};
  var ids = {}

  if(joborder_id){
    exclude_ids = AppHelper.explode('|', joborder_id);
    ids = exclude_ids.map(function (x) { 
        return parseInt(x, 10); 
    });    
  }

  Joborder.find()
    .where({id: ids})
    .exec(function(err, job_orders){
      if(err){
        return err;
      }

      if(!job_orders){
        return null;
      }else{
        return_value = job_orders        
      }
    });

  return return_value;

}