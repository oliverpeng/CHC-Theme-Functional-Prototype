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
        'api_key': '0dfd190065b8726df9f0670b7ec3dd0e',
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
    var $ul = $('#photostream ul');
    ajaxFetchPhotos({
        page: 1,
        'per_page': 27,
        callback: function(json) {
            $.each(json.photos.photo, function(i, photo) {
                var urls = buildFlickrPhotoURL({farmId: photo.farm, serverId: photo.server, id: photo.id, secret: photo.secret, size: ['s','z'] });
                var $image = $( document.createElement('img') ).attr('src', urls.s);
                var $a = $( document.createElement('a') ).attr('href', urls.z).append( $image );
                $( document.createElement('li') ).append( $a ).appendTo($ul);
            });
            $ul.find('a').lightBox({fixedNavigation:true});
        }
    });
    
});