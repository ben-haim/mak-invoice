module.exports = {

  htmlOptions: function(selection, selected){
  	var return_value = '';
  	for(key in selection){
  		if(selected == key){
			return_value = return_value + '<option value="' + key + '" selected="selected">' + selection[key] + '</option>';
  		}else{
			return_value = return_value + '<option value="' + key + '">' + selection[key] + '</option>';
  		}
  	}

  	return return_value;
  },

  getJobOrderStatusByCode : function(code){
    /*
      0 = new
      1 = open
      2 = closed
    */
    var array_codes = ['New', 'Open', 'Closed'];

    return array_codes[code];

  },

  convertDateToReadable : function (timestamp){

    console.log(timestamp);

    var date_obj = new Date(timestamp);

    return date_obj.toUTCString();

    // return date_obj.getUTCMonth() + '/' + date_obj.getDay() + '/' + date_obj.getFullYear();

  },


  // convertTo
  convertToUnixTime : function(date){

    var time_stamp = new Date(date);

    return parseInt((time_stamp.getTime() / 1000)) + 86400;

  },

  str_pad: function (input, pad_length, pad_string, pad_type) {
    var half = '',
      pad_to_go;
    var str_pad_repeater = function(s, len) {
      var collect = '',
        i;
      while (collect.length < len) {
        collect += s;
      }
      collect = collect.substr(0, len);
      return collect;
    };
    input += '';
    pad_string = pad_string !== undefined ? pad_string : ' ';

    if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
      pad_type = 'STR_PAD_RIGHT';
    }
    if ((pad_to_go = pad_length - input.length) > 0) {
      if (pad_type === 'STR_PAD_LEFT') {
        input = str_pad_repeater(pad_string, pad_to_go) + input;
      } else if (pad_type === 'STR_PAD_RIGHT') {
        input = input + str_pad_repeater(pad_string, pad_to_go);
      } else if (pad_type === 'STR_PAD_BOTH') {
        half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
        input = half + input + half;
        input = input.substr(0, pad_length);
      }
    }

   return input;
  }



}