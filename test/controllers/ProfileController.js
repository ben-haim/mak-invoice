require("test_helper");

describe(TEST_NAME, function() {

  describe("Profile URLS", function() {

    it("should be successfull when accesing /profile/", function(done) {
      request
        .get("/profile/")
        .expect(200, done);
    });

    it("should be successfull when accesing /profile/update", function(done) {
      request
        .get("/profile/update")
        .expect(200, done);
    });

  });

});