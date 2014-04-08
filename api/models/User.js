/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    username:{
    	type: 'string',
    	required: true,
    	unique: true
    },
    password:{
    	type: 'string',
    	required: true
    },
    full_name:{
    	type: 'string',
    	required: true
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

   // pre-insert method modifications
  beforeCreate: function (userObj, next) {
    require('bcrypt').hash(userObj.password, 10, function passwordEncrypted(err, password) {
      if (err) return next(err);
      userObj.password = password;
      next();
    });
  }

};
