function toHex(e) {
    for (var e = unescape(encodeURIComponent(e)), n = "", o = 0; o < e.length; o++) n += e.charCodeAt(o).toString(16);
    return n
}
var ex = "https://script.google.com/macros/s/AKfycbzHCFyVEylxHXCJqSghaXPaVYwKecgq7Cc0hhVqQWCCw7XtizCU/exec?hex=";
var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        playerVars: {autoplay:0, vq: "tiny", controls: 1},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    })
}
      var done = false;
      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
       
      }
    function onPlayerStateChange(event) {
    var index = player.getPlaylistIndex();
    if (event.data == -1) {
     $(".item-list-item").find(".album").removeClass("album-play");
     $(".item-list-item").find(".album").eq(index).addClass("album-play");
    }
      }
function parseurl(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return null;
    }
}
var ff = [];
var playlistx = [];
$(".ins").change(function(){
    var xc = $(this).val();
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = xc.match(regExp);
    if (match && match[2].length == 11) {
        var search_yt = match[2];
    } else {
        var search_yt = xc.replace(/ /g, "+");;
    }
    $(".pres").hide();
    playlistx.length = 0;
    $(".all").html("");
    $(".footer").css("position","absolute");
    $(".progress").show();
    $(".item-list-item").html("");
    var urls = ex + toHex("https://www.youtube.com/results?search_query=" + search_yt);
    $.getJSON(urls, function(json, textStatus) {
        var data = json.results[0].html;
        $(data).find('.yt-lockup-video > .yt-lockup-dismissable').each(function(index, el) {
            var title = $(el).find('.yt-lockup-content > h3.yt-lockup-title > a').text();
            var time = $(el).find('.video-time').text();
            var link = "https://www.youtube.com" + $(el).find('a.yt-uix-sessionlink').attr("href");
            var id = link.match(/(&|\?)v=([^&]+)/)[2];
            playlistx.push(id);
            var thumbnail = "https://i.ytimg.com/vi/" + id + "/default.jpg";
            var parts_time = time.split(':'),
                timeSeg = (+parts_time[0] * 60 + +parts_time[1]);

            $(".item-list-item").append('<div class="item"><div class="album-item" data-id="' + id + '" data-q="play"><img src="img/ic_play_circle_outline_white_24px.svg" class="play"><img src="' + thumbnail + '" class="album"></div><img src="img/ic_cloud_download_white_24px.svg" class="down" data-q="down" data-title="' + title + '" data-time="' + timeSeg + '" data-id="' + id + '"><div class="title-album" title="'+title+'">' + title + '</div><div class="view"><div class="time-item"><img src="img/ic_access_time_white_24px.svg" class="time"><div class="time-time">' + time + '</div></div></div></div>')
        });
        $(".album-item, .down").click(function() {
            if ($(this).data("q") == "play") {
                var index =  $('.album-item').index(this);
                player.loadPlaylist(playlistx,index);
                $(".play-video, iframe").css("display", "block");
            } else {
                var title = $(this).data("title");
                var timeSeg = $(this).data("time");
                var url_id = $(this).data("id");
                var thumbnail = "https://i.ytimg.com/vi/" + url_id + "/hqdefault.jpg";
                var ul = 'https://fetchy.io/api/v1/download-audio?url=' + "https://www.youtube.com/watch?v=" + url_id + '&quality=22&' + title + '=title&startTime=00%3A00%3A00&duration=' + timeSeg + '&albumName=&genreName=&coverArt=' + thumbnail;
                window.location = ul;
            }
        });
     var fir = ff.slice(0,1);
     ff.shift();
    $(".all").html('<div class="play-all" onclick="iframeplay()">Reproducir todo</div>');
    $(".progress").hide();
    $(".footer").css("position","inherit");
    });
});
var suggestCallBack; // global var for autocomplete jsonp
$(document).ready(function() {
    $("#youtube").autocomplete({
        source: function(request, response) {
            $.getJSON("https://suggestqueries.google.com/complete/search?callback=?", {
                "hl": "es", // Language                  
                "jsonp": "suggestCallBack", // jsonp callback function name
                "q": request.term, // query term
                "client": "youtube" // force youtube style response, i.e. jsonp
            });
            suggestCallBack = function(data) {
                var suggestions = [];
                $.each(data[1], function(key, val) {
                    suggestions.push({
                        "value": val[0]
                    });
                });
                suggestions.length = 5; // prune suggestions list to only 5 items
                response(suggestions);
            };
        },
    });
});

iframeplay = function(){
  player.loadPlaylist(playlistx,0);
  $(".play-video, iframe").css("display", "block");
}
