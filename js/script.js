/* Author: Oliver Peng (oliverpeng@gmail.com)

*/

/* Toggle buttons shows or hides text bubble below it */
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

/* jQuery UI Tabs behavior on item with id 'tabs' */
$(document).ready( function() {
    if ($.fn.tabs) {
        $("#tabs").tabs({
            'select': function(event, ui) {
                // update URL based on which tab was selected
                window.location.hash = ui.tab.hash;
            }
        });
    }
    
    
    if ($.fn.hashchange) {
        $(window).hashchange( function(){
            var hash = location.hash;
            $('#tabs').tabs('select', hash);
        });
    }
});

/* Dynamically resize page depending on viewport */
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
