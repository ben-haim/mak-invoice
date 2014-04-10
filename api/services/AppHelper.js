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
  }

}