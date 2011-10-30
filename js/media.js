$(document).ready( function() {
    
    
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
    
    /* Flickr API: http://www.flickr.com/services/api/
    */
    function fetchPhotos(options) {
        options = options || {};
        var defaultOpts = {
            'page': 1,
            'per_page': 30,
            'callback': function(data, textStatus, jqXHR) { /* do nothing */ },
            'format': 'json'
        }
        options = $.extend({}, defaultOpts, options);
        
        var fetchParams = {
            'method': 'flickr.people.getPublicPhotos',
            'api_key': '0dfd190065b8726df9f0670b7ec3dd0e',
            'user_id': '46965176@N02',
            'nojsoncallback': 1
        }
        $.extend(fetchParams, { page: options.page, per_page: options.per_page, format: options.format });
        
        $.ajax({
            url: 'http://api.flickr.com/services/rest/?' + toUrlQueryString(fetchParams),
            dataType: 'json',
            success: options.callback
        });
    }
    fetchPhotos({
        page: 2,
        callback: function(data) {
            console.log('YEEHAW', data);
        }
    });
    
    
    
});