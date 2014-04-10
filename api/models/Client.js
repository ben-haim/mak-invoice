/**
 * Client
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
    name: {
      type: 'string',
      required: true
    },
    company:{
      type: 'string',
      required: true
    },
    designation:{
      type: 'string',
      required: true
    },
    address:{
      type: 'string',
      required: true
    },
    user_id:{
    	type: 'integer',
    	required: true
    },
    is_active:{
      type: 'boolean',
      defaultsTo: 1
    }

  }

};