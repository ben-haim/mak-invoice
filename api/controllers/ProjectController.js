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
//======================= INDEX =========================== //
  index: function(req, res, next){

    async.waterfall([
        function(next){
          Project.find()
          .where({ user_id: req.session.userSessionObject.id, is_active: 1})
          .sort('title')
          .exec(function(err, projects) {
            if(err){ return next(err);}
            if(projects){
              return next(null, projects);
            }
          });
        },
        function(projects, next){
          var project_ids = _.union([0], _.pluck(projects, "id"));
            Joborder.find()
              .where({project_id: project_ids})
              .exec(function(err, job_orders){
                if(err){return next(err);}
                if(job_orders){
                  return next(null, job_orders, projects);
                }
              });
        }
    ], function (err, job_orders, projects) {

       for(key in projects){

         var jo_total =_.where(job_orders, {project_id: projects[key].id});
         var jo_summary ={
          total: jo_total.length,
          closed: _.where(jo_total, {status: 2}).length,
          open:  _.where(jo_total, {status: 0}).length
         }
         projects[key].jo_summary = jo_summary;
       }
       res.view({project_list: projects});       
    });
  },
//======================= INDEX =========================== //  

//======================= VIEW ============================ //
  view: function(req, res, next){

    var project_detail = {};
    var client_detail = {};
    var joborder_list = {};

    if(!req.param('id')){
      res.redirect('/project');
      return;
    }

    async.waterfall([
        function(next){
          Project.findOneById(req.param('id')).done(function(err, project){
            if(err){return next(err);}
            next(null, project);
          });          
        },
        function(project, next){
          Client.findOneById(project.client_id).done(function(err, client){
            if(err){return next(err);}
            next(null, project, client);
          });
        },
        function(project, client, next){
            var return_value = {
              project_detail: project,
              client_detail: client
            }
            next(null, return_value);
        }
    ], function (err, result) {
       res.view({project_detail: result.project_detail,
              client_detail: result.client_detail
              // joborder_list: joborder_list,
       });       
    });    


    // //Get tickets / Job Orders
    // Joborder.findByProject_id(req.param('id')).done(function (err, job_orders){ 
    //   if(err){
    //     next(err);
    //     return;
    //   } 

    //   joborder_list = job_orders;

    // });



  },
//======================= VIEW =========================== //

//======================= NEW =========================== //
  new: function(req, res, next){

    Client.find()
    .where({ user_id: req.session.userSessionObject.id, is_active: 1})
    .sort('name')
    .exec(function(err, clients) {

      if(err){ 
        return next(err);
      }

      if(!clients){
        res.redirect('/session/new');
        return;
      }else{

        var client_list = []
        for(prop in clients){
          client_list[clients[prop].id] = clients[prop].name;
        }

        client_dropdown = AppHelper.htmlOptions(client_list, null);
        res.view({client_select: client_dropdown});
      }
    });

  },
//======================= NEW ============================ //

//======================= EDIT =========================== //
  edit: function(req, res, next){

    // var client_selection = {};

    if(!req.param('id')){
      res.redirect('/project');
      return;
    }


    async.series({
      project: function(next){
        Project.findOneById(req.param('id')).done(function(err, project){
          if(err){
            return next(err);
          }
          next(null, project);
        });
      },
      client: function(next){
        Client.find()
          .where({ user_id: req.session.userSessionObject.id, is_active: 1})
          .sort("name")
          .exec(function(err, clients){
            var client_list = []
            for(prop in clients){
              client_list[clients[prop].id] = clients[prop].name;
            }
            next(null, client_list);
          })
      }
    },
    function(err, async_response) {
      console.log(async_response);
      var args = {
        project_detail: async_response.project,
        client_select: AppHelper.htmlOptions(async_response.client, async_response.project.client_id)
      }
      res.view(args);
    });
  },
//======================= EDIT =========================== //

//======================= UPDATE =========================== //
  update: function(req, res, next){

    var project_details = {
      title: req.param('title'),
      description: req.param('description'),
      project_code: req.param('project_code'),
      client_id: req.param('client_id'),
    }

    Project.update({id: req.param('id')}, project_details, function(err, updated_project){
      if(err){return next(err);}

      if(!updated_project){
          req.session.flash = {
            error: {message: 'An Error Occured!, please try again!'}
          }        
          res.redirect('/project');
          return;
      }else{
        req.session.flash = {
          success: {message: 'Project details updated!'}
        }
        res.redirect('/project/view/' + req.param('id'));
        return;
      }
    });

  },
//======================= UPDATE =========================== //

//======================= CREATE =========================== //
  create: function(req, res, next){

    var project_details = {
      title: req.param('title'),
      description: req.param('description'),
      project_code: req.param('project_code'),
      client_id: req.param('client_id'),
      user_id: req.session.userSessionObject.id   
    }

    Project.create(project_details).done(function(err, new_project){
      if(err){return next(err);}
      
      if(!new_project){
          req.session.flash = {
            error: {message: 'An Error Occured!, please try again!'}
          }        
          res.redirect('/project');
          return;               
       
      }else{
        req.session.flash = {
          success: {message: 'New Project Added'}
        }
        res.redirect('/project/view/' + new_project.id);
        return;
      
      }
    });
  },

//======================= CREATE =========================== //

//======================= DEACTIVATE =========================== //
  deactivate: function(req, res, next){
    if(!req.param('id')){
      res.redirect('/project');
      return;
    }   

    Project.update({id: req.param('id')}, {is_active: 0}, function(err, updated_project){
      if(err){return next(err);}

      if(!updated_project){
          req.session.flash = {
            error: {message: 'An Error Occured!, please try again!'}
          }        
          res.redirect('/project');
          return;
      }else{
        req.session.flash = {
          success: {message: 'Project deactivate!'}
        }
        res.redirect('/project');
        return;
      }
    });    
  }
//======================= DEACTIVATE =========================== //

};