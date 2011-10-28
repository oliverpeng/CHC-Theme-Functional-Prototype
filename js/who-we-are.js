$(document).ready( function() {
    var $dialog = $('#statement-dialog');
    $dialog.dialog({
        autoOpen: false,
        width: 622,
        height: 710,
        modal: true,
        resizable: false
    });
    
    var scrollbar = false;
    $('#statement').click( function() {
        $dialog.dialog('open');
        if(!scrollbar) {
            scrollbar = true;
            $('#statement-dialog > div').tinyscrollbar({'height': 650});
        }
        
    });
    
    
});