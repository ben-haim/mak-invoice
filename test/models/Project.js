require("test_helper");

describe(TEST_NAME, function() {

  var valid_project ={
  	title: 'Resa Website',
  	description: 'Organization Website for RESA',
  	project_code: 'RESAWEB',
  	client_id: 1
  }

  describe("TEST Create", function(done){
    it("Should Insert Valid Project", function(){
      Project.create(valid_project).done(function(err, done){
      	expect(err).not.to.exist;
      	done;
      });
    });
  });

  describe("TEST destroy", function(done){
  	it("Should Delete an Entry", function(){
  	  Project.findOneByTitle(valid_project.title).done(function(err, project){
  	  	expect(err).not.to.exist;
  	  	project.destroy(function(err){
  	  	  expect(err).not.to.exist;
  	  	  done;
  	  	});
  	  });	
  	});

  });

  describe("Validations", function(done){

    describe("Title Field Checking", function(done){
      it("should return error if title field is not valid", function(done){
      	var no_title = _.clone(valid_project);
      	delete no_title.title;
        Project.create(_.clone(no_title), function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});
	   
    describe("Project Code Field Checking", function(done){
      it("should return error if project_code field is not valid", function(done){
      	var no_title = _.clone(valid_project);
      	delete no_title.project_code;
        Project.create(_.clone(no_title), function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});	   

    describe("Client ID Field Checking", function(done){
      it("should return error if client_id field is not valid", function(done){
      	var no_title = _.clone(valid_project);
      	delete no_title.client_id;
        Project.create(_.clone(no_title), function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});

  });

});