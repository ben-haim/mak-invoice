/**
 * Joborder
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes : {
  	ticket_number : {
  	  type : "string"
  	},
  	title : {
  	  type : "string",
  	  required : true
  	},
  	requested_by : {
  	  type : "string"	
  	},
    date_requested: {
      type : "integer"
    },
  	date_completed : {
  	  type : "integer"
  	},
  	remarks : {
  	  type : "string"	
  	},
  	amount : {
  	  type : "float"	
  	},
    status : {
      type : "integer" // new, open, closed
    },
  	project_id : {
  	  type : "integer"
  	}
  },

};