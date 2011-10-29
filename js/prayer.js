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
            
            // Tinyscrollbar needs to be called first since it re-wraps the DOM
            // and will break batchgeo's click event handlers if called after
            $('#prayers').tinyscrollbar({'height': 475});
            
            batchgeo('#map')
                .source('#prayers')
                .options({
                    width:'757px',
                    height:'510px'
                })
                .map();
        }
        
        
    });
});
