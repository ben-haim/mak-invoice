require("test_helper");

describe(TEST_NAME, function() {

    // it("should be successfull when accesing invoice/", function(done) {
    //   request
    //     .get("/invoice/")
    //     .expect(200, done);
    // }); 

    // it("should be successfull when accesing invoice/new", function(done) {
    //   request
    //     .get("/invoice/new")
    //     .expect(200, done);
    // });    

    it("should be successfull when generating pdf", function(done) {
      request
        .get("/invoice/generate/22")
        .expect(200, done);
    });    


});