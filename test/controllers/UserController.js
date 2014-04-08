require("test_helper");

describe(TEST_NAME, function() {

  describe("User URLS", function() {

    it("should be successfull when accesing user/", function(done) {
      request
        .get("/user/")
        .expect(200, done);
    });    

    it("should be successfull when accesing user/edit", function(done) {
      request
        .get("/user/edit")
        .expect(200, done);
    });    

    it("should be successfull when accesing user/view", function(done) {
      request
        .get("/user/view")
        .expect(200, done);
    });

    it("should be successfull when accesing user/new", function(done) {
      request
        .get("/user/new")
        .expect(200, done);
    });

  });

});