require("test_helper");

describe(TEST_NAME, function() {

  describe("Client URLS", function() {

    it("should be successfull when accesing client/", function(done) {
      request
        .get("/client/")
        .expect(200, done);
    });    

    it("should be successfull when accesing client/new", function(done) {
      request
        .get("/client/new")
        .expect(200, done);
    });    

    it("should be successfull when accesing client/edit", function(done) {
      request
        .get("/client/edit")
        .expect(200, done);
    });    

    it("should be successfull when accesing client/view", function(done) {
      request
        .get("/client/view")
        .expect(200, done);
    });    

  });

});