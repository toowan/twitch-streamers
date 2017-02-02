$(document).ready(function() {

  var channels = ["freecodecamp","riotgames","ESL_SC2", "syndicate", "EULCS1", "avalonstar"];

  // API calls to get streaming status and current activity of each channel
  function getChannelInfo() {
    channels.forEach(function(channel) {
      function makeURL(type, name) {
        return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
      };

      // Get stream status of channel
      $.getJSON(makeURL("streams", channel), function(data) {
        console.log(data);
        var game;
        var status;
        if (data.stream === null) {
          game = "Offline";
          status = "offline";
        } else if (data.stream === undefined) {
          game = "Account Closed";
          status = "offline";
        } else {
          game = data.stream.game;
          status = "online";
        };

        // Display channels and activities in html
        $.getJSON(makeURL("channels", channel), function(data) {
          console.log(data);
            // Get logo
            var logo = data.logo;
            // Get username
            var name = data.display_name;
            // If online, include data status in description
            var description = status === "online" ? ': ' + data.status : "";

            // Embed logo, name, description in html
            html = '<div class="row ' + status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' + logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' + 
   data.url + '" target="_blank">' + name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">'+ game + '<span class="hidden-xs">' + description + '</span></div></div>';
            
            // If online, display users at the top.  If not, display at the bottom. 
            status === "online" ? $("#display").prepend(html) : $("#display").append(html);
        });
      });
    });
  };


  // If a menu selector is clicked, hide the other options
  getChannelInfo();
  $(".selector").click(function() {
    $(".selector").removeClass("active");
    $(this).addClass("active");
    var status = $(this).attr('id');
    if (status === "all") {
      $(".online, .offline").removeClass("hidden");
    } else if (status === "online") {
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  })

});



