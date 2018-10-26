const http = require('http');
const site = require('./site');

//Tweet every 8 hours
setInterval(req, 1000*60*60*8);

//Request to Chuck Norris API
function req() {
  http.get(site, function(res) {
      res.on('data', function (chunk) {
        let data = JSON.parse(chunk);
        tweetIt(data.value.joke);
      });
  });
}

//Tweeting through Twitter API
function tweetIt(text) {
  var tweet = {
      status: text
  }
  
  T.post('statuses/update', tweet, tweeted);
  
  function tweeted(err, data, response) {
      if (err) {
      console.log("Something went wrong!");
     } else {
      console.log("It worked!");
     }
  }
}

//Setting up a user stream
var stream = T.stream('user');

//Reply when followed
stream.on('follow', followed);

function followed(eventMsg) {
    var name = eventMsg.source.name;
    var screenName = eventMsg.source.screen_name;
    tweetIt('@' + screenName + ' thank you for following. Enjoy.')
}