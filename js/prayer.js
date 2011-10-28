$(document).ready( function() {
    var $prayermap = $('#prayermap');
    
    $prayermap.dialog({
        autoOpen: false,
        width: 1060,
        height: 565,
        modal: true,
        resizable: false
    });
    
    $('#read').click( function() {
        $prayermap.dialog('open');
    });
});

$(document).ready( function() {
    $('#scrollbar1').tinyscrollbar();
});
