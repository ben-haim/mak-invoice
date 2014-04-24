/**
 * Invoice
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    invoice_number: {
      type: "string"
    },

    date_generated: {
      type: "integer"
    },

    total_amount: {
      type: "float"
    },

    status: {
      type : "integer" // new, open, closed or paid
    },

    subject: {
      type: "string"
    },

    footer_note: {
      type: "string"
    },

    footer_name: {
      type: "string"	
    },

    footer_description: {
      type: "string"
    },

    project_id: {
      type: "integer"
    },

    joborder_id: {
      type: "string" //setup will be pipe delimited eg.: 1|2|3|4|5
    },

    paid_date: {
      type: "integer"	
    }

  }

};
