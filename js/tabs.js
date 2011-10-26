$(document).ready( function() {   
    $("#tabs").tabs({
        'select': function(event, ui) {
            // update URL based on which tab was selected
            window.location.hash = ui.tab.hash;
        }
    });
    
    $(window).hashchange( function(){
        var hash = location.hash;
        $('#tabs').tabs('select', hash);
    });
});