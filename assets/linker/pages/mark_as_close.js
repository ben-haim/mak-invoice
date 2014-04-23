

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

	$(document).ready(function(){
		$('.popover-summary').hover(function(){
			initSummaryPopOver($(this).attr('data-title'), $(this).attr('data-remarks'));	
		}, function(){});		
	});
