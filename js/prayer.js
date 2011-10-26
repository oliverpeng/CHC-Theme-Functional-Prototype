$(document).ready( function() {
    var $modal = $('#modal');
    var $overlay = $('#overlay');
    var $window = $(window);
    var open = false;
    
    function openModal() {
        $modal.css('left', '50%');
        $overlay.show();
        open = true;
    }
    
    function closeModal() {
        $modal.css('left', -9999);
        $overlay.hide();
        open = false;
    }
    
    $('#read').click( openModal );
    $('#close').click( closeModal );
    $window.keypress( function(e) {
        if(e.keyCode === 27) { // ESC
            closeModal();
        }
    });
    
    $window.resize( function(e) {
        var height = Math.max( $window.height(), 900);
        $overlay.height( height );
    }).resize();
});

$(document).ready( function() {
    $('#scrollbar1').tinyscrollbar();
});
