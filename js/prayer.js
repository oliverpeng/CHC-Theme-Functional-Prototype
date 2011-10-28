$(document).ready( function() {
    var $dialog = $('#dialog');
    
    $dialog.dialog({
        autoOpen: false,
        width: 1060,
        height: 565,
        modal: true,
        resizable: false,
        title: "Read Prayers"
    });
    
    $('#read').click( function() {
        $dialog.dialog('open');
        setTimeout( function() {
            batchgeo('#map')
                .source('#prayers')
                .options({
                    width:'757px',
                    height:'510px'
                })
                .map();
                $('#scrollbar1').tinyscrollbar();
        }, 100);
        
    });
});
