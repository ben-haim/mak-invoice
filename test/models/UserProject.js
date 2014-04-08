require("test_helper");

describe(TEST_NAME, function() {

  var valid_userproject ={
    user_id: 1,
    project_id: 1
  }

  describe("TEST Create", function(done){
    it("Should Insert Valid UserProject", function(){
      UserProject.create(valid_userproject).done(function(err, done){
        expect(err).not.to.exist;
        done;
      });
    });
  });


  describe("TEST destroy", function(done){
    it("Should Delete a UserProject Entry", function(){
      UserProject.findOneByUser_id(valid_userproject.user_id).done(function(err, client){
        expect(err).not.to.exist;
        client.destroy(function(err){
          expect(err).not.to.exist;
          done;
        });
      }); 
    });

  });
   
});