/* Author: Oliver Peng (oliverpeng@gmail.com)

*/

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

/* Contact lightbox */
$(document).ready( function() {
    var $contact = $('#contact-dialog');
    $contact.dialog({
        autoOpen: false,
        width: 350,
        height: 410,
        modal: true,
        resizable: false
    });
    
    $('#footer-contact').click( function() {
        $contact.dialog('open');
    });
});
