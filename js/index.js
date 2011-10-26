$(document).ready( function() {
  $('#slides .visuallyhidden').removeClass('visuallyhidden');
  
  $('#slides').cycle({
	fx: 'scrollLeft',
    easing: 'easeOutQuad',
    timeout: 0,
    pager:  '#slide_nav',
    speed: 500
  });
});