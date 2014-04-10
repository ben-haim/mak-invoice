require("test_helper");

describe(TEST_NAME, function() {

  describe("Session URLS", function() {


    it("accesing session/ should be redirected to /session/new/", function(done) {
      request
        .get("/session/")
        .expect(200)
        .expect('Location', '/session/new')
        .expect(302, done);
    }); 

    it("should be successfull when accesing session/new", function(done) {
      request
        .get("/session/new")
        .expect(200, done);
    });    

    it("should be successfull when accesing session/auth", function(done) {
      request
        .get("/session/auth")
        .expect(200)
        .expect('Location', '/session/new/')
        .expect(302, done);
    });    

    it("should be successfull when accesing session/logout", function(done) {
      request
        .get("/session/logout")
        .expect(200)
        .expect('Location', '/session/new')
        .expect(302, done);
    });    

  });




});