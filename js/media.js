/* Simple helper function to convert key, value pairs in object to URL query string
Sample input:
{
     'key1': 'value1',
     'key2': 5
}
Output:
"key1=value1&key2=5"

NOT meant to be robust (handle array types, etc.)
*/
function toUrlQueryString(object) {
    var array = [];
    $.each(object, function(index, value) {            
        if ( typeof(value)!== 'string' ) {
            value = value.toString();
        }
     
        array.push(index + '=' + encodeURIComponent(value));
    });
    return array.join('&');
}

/* Builds Flickr photo URL based on http://www.flickr.com/services/api/misc.urls.html
size parameter can be string or array of strings. If an array is provided, an object is returned
keyed by size.

Example:
Input - ['m','s']
Output - { m: 'url1', s: 'url2' }
*/
function buildFlickrPhotoURL(params) {
    params = params || {};
    var defaultParams = {
        farmId: 1, // override
        serverId: 6167, // override
        id: 1, // override
        secret: '80bc2d6509', // override
        size: 's' // m,s,t,z,b or array of sizes ie ['s', 'm']
    }
 
    var p = $.extend(defaultParams, params);
 
    // http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
    var base_url = 'http://farm'+ p.farmId +'.static.flickr.com/'+ p.serverId +'/'+ p.id +'_'+ p.secret;
    if (typeof(p.size) === 'string') {
        return base_url +'_'+ p.size +'.jpg';
    } else if ( p.size instanceof Array ) {
        var returnObj = {};
        $.each(p.size, function(i, v) {
            returnObj[v] = base_url + '_' + v + '.jpg';
        });
        return returnObj;
    } else {
        return ''; // silent fail
    }
}

/* Make ajax request to fetch CHC's Flickr photostream
Options:
 page     - page #
 per_page - how many images per request
 callback - callback function to run upon successful ajax request

Based on Flickr API: http://www.flickr.com/services/api/
*/
function ajaxFetchPhotos(options) {
    options = options || {};
    var defaultOpts = {
        'page': 1,
        'per_page': 30,
        'callback': function(json, textStatus, jqXHR) { /* do nothing */ }
    }
    options = $.extend({}, defaultOpts, options);
 
    var fetchParams = {
        'method': 'flickr.people.getPublicPhotos',
        'api_key': 'bd47fb8ff09bbed816a31a947228c533',
        'user_id': '46965176@N02',
        'format': 'json',
        'nojsoncallback': 1
    }
    $.extend(fetchParams, { page: options.page, per_page: options.per_page, format: options.format });
 
    $.ajax({
        url: 'http://api.flickr.com/services/rest/?' + toUrlQueryString(fetchParams),
        dataType: 'json',
        success: options.callback
    });
}

$(document).ready( function() {       
    var $photostream = $('#photostream');
    var $ulContainer = $('#photostream .ul-container');
    var _firstFetch = true;
    var _currPage = 0;
    var _numPages = 0;
    var IMAGES_PER_PAGE = 9;
    var IMAGES_PER_FETCH = 36;
    
    function fetchImages() {
        ajaxFetchPhotos({
            page: (_numPages*IMAGES_PER_PAGE / IMAGES_PER_FETCH)+1,
            'per_page': IMAGES_PER_FETCH,
            callback: function(json) {
                if(!json.photos) {
                    console.log(json.message);
                    return;
                }
                
                var $ul = $( document.createElement('ul') );
                $.each(json.photos.photo, function(i, photo) {
                    var urls = buildFlickrPhotoURL({farmId: photo.farm, serverId: photo.server, id: photo.id, secret: photo.secret, size: ['s','z'] });
                    var $image = $( document.createElement('img') ).attr('src', urls.s);
                    var $a = $( document.createElement('a') ).attr('href', urls.z).attr('rel','group1').append( $image );
                    $( document.createElement('li') ).append( $a ).appendTo($ul);
                    
                    if ( (i+1)%IMAGES_PER_PAGE === 0 ) {
                        $ul.hide().appendTo($ulContainer);
                        $ul = $( document.createElement('ul') );
                    }
                });
                
                _numPages += IMAGES_PER_FETCH / IMAGES_PER_PAGE;
                
                /*$ulContainer.find('a').lightBox({
                    fixedNavigation: true,
                    imageBtnClose: 'css/lightbox/images/lightbox-btn-close.gif'
                });*/
                if (_firstFetch) {
                    _firstFetch = false;
                    $ulContainer.find('ul:first').css('left', '890px').show();
                    _currPage = 1;
                }
                $photostream.trigger('pageChange');
                
                // TODO: move this
                $('a', $ulContainer).fancybox();
            }
        });
    }
    
    $photostream.bind('pageChange', function() {
        if ( _currPage <= 1 ) {
            $('#prev').addClass('disabled');
        } else {
            $('#prev').removeClass('disabled');
        }
        
        if ( _currPage >= _numPages ) {
            $('#next').addClass('disabled');
            fetchImages();
        } else {
            $('#next').removeClass('disabled');
        }
    }).trigger('pageChange');
    
    function nextPage() {
        if ( _currPage === _numPages ) {
            return;
        }
        
        var $currUL = $ulContainer.find('ul:visible');
        var $nextUL = $currUL.next();
        
        if ($currUL.queue('fx').length > 0 ) {  // wait for all animations to end first
            return;
        }
        
        $nextUL.css({left: 1780, display: 'block' }); // Put it right of current
        
        // Animate them both left
        $currUL.animate({left: 0}, 'slow', 'easeOutQuad', function() {
            $(this).hide();
        });
        $nextUL.animate({left: 890}, 'slow', 'easeOutQuad');
        
        _currPage++
        $photostream.trigger('pageChange');
        console.log(_currPage, ' of ', _numPages);
    }
    
    function prevPage() {
        if ( _currPage === 1 ) {
            return;
        }
        
        var $currUL = $ulContainer.find('ul:visible');
        var $prevUL = $currUL.prev();
        
        if ($currUL.queue('fx').length > 0 ) {  // wait for all animations to end first
            return;
        }
        
        $prevUL.css({ left: 0, display: 'block' }); // Put it left of current
        
        // Animate them both right
        $currUL.animate({left: 1780}, 'slow', 'easeOutQuad', function() {
            $(this).hide();
        });
        $prevUL.animate({left: 890}, 'slow', 'easeOutQuad');
        
        _currPage--;
        $photostream.trigger('pageChange');
        console.log(_currPage, ' of ', _numPages);
    }
    
    $('#next').click( nextPage );
    $('#prev').click( prevPage );
    
    /*$('#photostream .ul-container a').live('click', function(e) {
        var url=$(this).attr('href');
        displayLightbox(url);
        return false; // prevent default action of link
    });
    
    $(window).keypress(function(e) {
        console.log(e);
        if(e.keyCode == 39) { // right
            
        } else if (e.keyCode == 37) { // left
            
        }
    });
    
    $('#lightbox-image').load( function() {
        var $this = $(this);
        var h = $this.height();
        var w = $this.width();
        console.log(h, w);
        
        $('#lightbox-container').animate({ width: w, height: h}, 300, 'easeOutQuad');
        $('#lightbox').fadeIn(300);
    });
    
    function displayLightbox(url) {
        $('#lightbox-image').attr('src', url);
    }
    
    function closeLightbox() {
        $('#lightbox').hide();
    }
    
    $('#lightbox-close').click( closeLightbox );*/
});
