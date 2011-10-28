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
    
    var initialize = false;
    $('#read').click( function() {
        $dialog.dialog('open');
        if(!initialize) {
            initialize = true;
            batchgeo('#map')
                .source('#prayers')
                .options({
                    width:'757px',
                    height:'510px'
                })
                .map();
            $('#prayers').tinyscrollbar({'height': 475});
        }
        
        
    });
});
