$(document).ready( function() {  
    var user = 'dshin';
    var domain = 'churcheshelpingchurches.com';
    var address = user + '@' + domain;
    $('<a>' + address + '</a>').attr('href', 'mailto:'+address).appendTo('#contact');
});