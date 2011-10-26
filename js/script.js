/* Author: 

*/

$(document).ready( function() {
    $('.toggle-button').click( function() {
        var $this = $(this);
        var $textbubble = $this.next('.textbubble-outside');
        if ($textbubble.css('display') == 'none') {
            $this.removeClass('expand');
            $textbubble.slideDown();
        } else {
            $this.addClass('expand');
            $textbubble.slideUp();
        }
    });
});





















