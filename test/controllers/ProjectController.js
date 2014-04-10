require("test_helper");

describe(TEST_NAME, function() {

  var validProject = {
     title: 'Test Project Title',
     description: 'Test Project Description and some long items here...', 
     project_code: 'TPT',
     client_id: 1,
     user_id : 1
  }

  before(function(done){
    Project.create(validProject, function(err, project){
      expect(err).not.to.exist;
      done();
    });
  });  

  after(function(done){
    Project.findOneByTitle(validProject.title, function(err, project){
      expect(err).not.to.exist;
      project.destroy(function(err){
        expect(err).not.to.exist;
      });
      done();
    });
  });
 
  describe("Project URLS", function() {

    it("should be successfull when accesing projects/", function(done) {
      request
        .get("/project/index")
        .expect(200)
        .expect('Location', '/session/new')
        .expect(302, done);
    });    

    it("should redirect to /session/new when no user_id is found", function(done) {
      request
        .get("/project/index")
        .expect(200)
        .expect('Location', '/session/new')
        .expect(302, done);
    });

    it("should be successfull when accesing projects/new", function(done) {
      request
        .get("/project/new")
        .expect(200)
        .expect('Location', '/session/new')
        .expect(302, done);
    });


    // it("should be successfull when accesing projects/create", function(done) {
    //   request
    //     .get("/project/create")
    //     .expect(200, done);
    // });

  });


});