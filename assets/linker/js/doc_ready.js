$(document).ready(function(){

	$('.datepicker').datepicker({
		format: 'mm-dd-yyyy'
	});

	$('.popover-summary').hover(function(){
		initSummaryPopOver($(this).attr('data-title'), $(this).attr('data-remarks'));	
	}, function(){});		

	//load selected Job Orders to invoice via AJAX
	$('#select-job-orders').click(function(){

		// window.onbeforeunload = function() {
		//   return "Changes in the invoice will not be saved!";
		// }
	    var btn = $(this)
	    btn.button('loading');
	    setTimeout(function(){
			$.post('/invoice/select', $('#job-selection-form').serialize(), function(response){
				$('#selected-joborders-container').append(response.html);
				btn.button('reset');
				$('#total-amount-holder').html(response.total_amount);
				$('#total-amount').val(response.total_amount);
				$('#total-amount-raw').val(response.total_amount_raw);
				$('#joborder-id').val(response.joborder_id);
				btn.button('reset');
				$('.modal').modal('hide');
				$('#job-selection-form').get(0).reset()
			});
		}, 1000);
	});	

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

function initSummaryPopOver(date_completed, remarks){

	$('#date-completed-replace').html(date_completed);
	$('#remarks-replace').html(remarks);

	$('.popover-summary').popover({
		trigger: 'hover',
		content: $('#popover-summary-display').html(),
		title: 'Job Order Summary',
		html: true,
		placement: 'left'
	});
}