require("test_helper");

describe(TEST_NAME, function() {

  var valid_user ={
  	username: 'testusername',
  	password: 'testpassword',
  	full_name: 'Full Name of User',
  }

  describe("TEST Create", function(done){
    it("Should Insert Valid User", function(){
      User.create(valid_user).done(function(err, done){
      	expect(err).not.to.exist;
      	done;
      });
    });
  });

  // describe("TEST destroy", function(done){
  // 	it("Should Delete an Entry", function(){
  // 	  User.findOneByUsername(valid_user.username).done(function(err, user){
  // 	  	expect(err).not.to.exist;
  // 	  	user.destroy(function(err){
  // 	  	  expect(err).not.to.exist;
  // 	  	  done;
  // 	  	});
  // 	  });	
  // 	});
  // });

  describe("Validations", function(done){

    describe("Username Field Checking", function(done){
      it("should return error if username field is not present", function(done){
      	var no_username = _.clone(valid_user);
      	delete no_username.username;
        User.create(no_username, function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});

   describe("Password Field Checking", function(done){
      it("should return error if password field is not present", function(done){
      	var no_password = _.clone(valid_user);
      	delete no_password.password;
        User.create(no_password, function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});

   describe("Fullname Field Checking", function(done){
      it("should return error if full_name field is not present", function(done){
      	var no_fullname = _.clone(valid_user);
      	delete no_fullname.full_name;
        User.create(no_fullname, function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});

  });	  
  
});