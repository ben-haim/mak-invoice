require("test_helper");

describe(TEST_NAME, function() {

  var validProject = {
     title: 'Test Project Title',
     description: 'Test Project Description and some long items here...', 
     project_code: 'TPT',
     client_id: 1
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
        .get("/project/")
        .expect(200, done);
    });    

    it("should be successfull when accesing projects/index", function(done) {
      request
        .get("/project/index")
        .expect(200, done);
    });    

    it("should be successfull when accesing projects/view", function(done) {
      request
        .get("/project/view")
        .expect(200, done);
    });

    // it("should be successfull when accesing projects/create", function(done) {
    //   request
    //     .get("/project/create")
    //     .expect(200, done);
    // });

  });


});