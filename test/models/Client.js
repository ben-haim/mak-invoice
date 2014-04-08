require("test_helper");

describe(TEST_NAME, function() {

  var valid_client ={
  	name: 'Test Client Name',
  	company: 'Test Company Name',
  	designation: 'Test Designation',
  	address: 'Test Address',
  	user_id: 1
  }

  describe("TEST Create", function(done){
    it("Should Insert Valid Client", function(){
      Client.create(valid_client).done(function(err, done){
      	expect(err).not.to.exist;
      	done;
      });
    });
  });

  describe("TEST destroy", function(done){
  	it("Should Delete a client Entry", function(){
  	  Client.findOneByName(valid_client.name).done(function(err, client){
  	  	expect(err).not.to.exist;
  	  	client.destroy(function(err){
  	  	  expect(err).not.to.exist;
  	  	  done;
  	  	});
  	  });	
  	});

  });

  describe("Validations", function(done){

    describe("Name Field Checking", function(done){
      it("should return error if name field is not present", function(done){
      	var no_name = _.clone(valid_client);
      	delete no_name.name;
        Client.create(no_name, function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});

    describe("Company Field Checking", function(done){
      it("should return error if company field is not present", function(done){
      	var no_company = _.clone(valid_client);
      	delete no_company.company;
        Client.create(no_company, function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});		


    describe("Designation Field Checking", function(done){
      it("should return error if designation field is not present", function(done){
      	var no_designation = _.clone(valid_client);
      	delete no_designation.designation;
        Client.create(no_designation, function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});   

	describe("Address Field Checking", function(done){
      it("should return error if address field is not present", function(done){
      	var no_address = _.clone(valid_client);
      	delete no_address.address;
        Client.create(no_address, function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});

	describe("User_ID Field Checking", function(done){
      it("should return error if user_id field is not present", function(done){
      	var no_userid = _.clone(valid_client);
      	delete no_userid.user_id;
        Client.create(no_userid, function(err, done){
          expect(err).to.exist;
          done;
        });
        done();
      });
	});

  });	 
   
});