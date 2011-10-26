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
    var $window = $(window);
    var $container = $('#container');
    var $main = $('#main');
    
    if($container.hasClass('no-resize')) {
        return;
    }
    
    var defaultHeight = $container.height();
    var defaultWidth = $container.width();
    
    var hPadding = $main.innerWidth() - $main.width();
    var vPadding = $main.innerHeight() - $main.height();
    var innerHeights = $('header').innerHeight() + $('nav').innerHeight() + $('footer').innerHeight();
    
    $window.resize( function(e) {
        var newHeight = $window.height();
        if(newHeight <= defaultHeight) {
            // use defaults
        } else {
            var scale = newHeight / defaultHeight;
            var newWidth = Math.floor(scale*defaultWidth);
            
            $container.width( newWidth );
            $container.height( newHeight );
            
            $main.width( newWidth - hPadding );
            $main.height( newHeight - innerHeights - vPadding );
        }
    }).resize();
});
