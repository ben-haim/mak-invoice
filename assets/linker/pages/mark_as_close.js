	$('.popover-mark-close').popover({
		trigger: 'click',
		content: $('#popover-mark-form').html(),
		title: 'Mark Job Order as Closed <button type="button" class="close close-popover" onClick="closeMe(this);" aria-hidden="true">&times;</button>',
		container: 'body',
		html: true,
		placement: 'left'
	});

	$('.close-popover').click(function(){
		alert('test');
		// $('.popover').popover('hide');
	});

	function closeMe(element){
		// $(this).parent().popover('hide');
		// console.log( $(this).parent().find('popover') );

		$(this).parent().find('popover').popover('hide');

		alert('test');
		
	}