$(document).ready( function() {
    $('#photostream').flickrLoader();
});


$(document).ready( function() {
    var _videoIds = ['a9MoMj8x94s', 'l-zGrR_urZs', '3Ac8UlEq4rg', 'aexG6z3g368', 'uqt9FniOvv8', 'Qzg_eR8uyL0'],
        _player = $('#player embed').get(0),
        _index = 0;
    
    $('#cycle').cycle({
        fx: 'fade',
        easing: 'easeOutQuad',
        timeout: 0,
        pager:  '#cycle_nav',
        speed: 1000,
        onPagerEvent: function(index) {
            _index = index;
        }
    });
    
    $('#play').hover(
        function() {
            $('#icon').stop().fadeTo(500, 1);
        },
        function() {
            $('#icon').stop().fadeTo(500, 0.5);
        }
    ).click(play);
    
    function reset() {
        _player.stopVideo();
        $('#player').css('left', -9999);
        $('#play').show();
    }
    
    function play() {       
        _player.loadVideoById(_videoIds[_index]);
        
        $('#play').hide();
        $('#player').css('left', 0);
    }
    
    $('#cycle_nav').click(reset)
});