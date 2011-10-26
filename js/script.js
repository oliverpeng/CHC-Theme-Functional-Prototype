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


$(document).ready( function() {
    var defaultHeight = $('#container').height();
    var defaultWidth = $('#container').width();
    var $window = $(window);
    
    $window.resize( function(e) {
        var newHeight = $window.height();
        if(newHeight <= defaultHeight) {
            // use defaults
        } else {
            var scale = newHeight / defaultHeight;
            var newWidth = Math.floor(scale*defaultWidth);
            console.log(newWidth);
            $('#container').width( newWidth );
            $('#container').height( newHeight );
            
            var $main = $('#main');
            var hPadding = $main.innerWidth() - $main.width();
            var vPadding = $main.innerHeight() - $main.height();
            $main.width( newWidth - hPadding );
            $main.height( newHeight - $('header').innerHeight() - $('nav').innerHeight() - $('footer').innerHeight() - vPadding - 1);
        }
    }).resize();
});


















