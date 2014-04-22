
	//hide other opened pop-ups then open the latest one
	$('.popover-mark-close').click(function(){
    	$('.popover-mark-close').not(this).popover('hide'); //all but this
	});	

	function initDatePicker(element){
		$(element).datepicker({
		format: 'mm-dd-yyyy'
		});
	}

	function initPopOver(job_id){

		$('#joborder_id').val(job_id);

		$('.popover-mark-close').popover({
			trigger: 'click',
			content: $('#popover-mark-form').html(),
			title: 'Mark Job Order as Closed',
			container: 'body',
			html: true,
			placement: 'left'
		});

	}