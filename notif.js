var getNotif = function(swears, balance) {
  if (swears <= 0) {
    return;
  }
  console.log("Number of new swears: " + swears);
  balMessage = "\nYour swear jar balance is now $" + balance + ".";
  if (swears === 1) {
    msgs = ["What the heck? You swore!",
            "Ah jeez, you swore!",
            "Gosh! You swore!",
            "What the frick? You swore!",
            "Jinkees, you swore!",
            "What the heck? You cursed!",
            "Ah jeez, you cursed!",
            "Gosh! You cursed!",
            "What the frick? You cursed!",
            "Jinkees, you cursed!",
            "What a potty-mouth!",
            "Do you kiss your mother with that mouth?",
            "Ugh, such filthy language!",
            "Excuse me, this is a Christian browser!",
            "No profanities in this browser!",
            "No foul language in this browser!"];

    titles = ["Oh no!",
              "Uh oh!",
              ">:(",
              ":(",
              "No swearing!"];
    message = msgs[Math.floor(Math.random()*msgs.length)] + balMessage;
    title = titles[Math.floor(Math.random()*titles.length)];
    var opt = {
      type: "basic",
      title: title,
      message: message,
      iconUrl: "images/disappoint.jpg"
    }
    chrome.notifications.create(opt);
    return;
  }
  if (swears === 2) {
    msgs = ["What the heck? You swore twice!",
            "Ah jeez, you swore twice!",
            "Gosh! You swore twice!",
            "What the frick? You swore twice!",
            "Jinkees, you swore twice!",
            "What the heck? You cursed twice!",
            "Ah jeez, you cursed twice!",
            "Gosh! You cursed twice!",
            "What the frick? You cursed twice!",
            "Jinkees, you cursed twice!",
            "What a potty-mouth!",
            "Do you kiss your mother with that mouth?",
            "Ugh, such filthy language!",
            "Excuse me, this is a Christian browser!",
            "No profanities in this browser!",
            "No foul language in this browser!"];

    titles = ["Oh no!",
              "Uh oh!",
              ">:(",
              ":(",
              "No swearing!"];
    message = msgs[Math.floor(Math.random()*msgs.length)] + balMessage;
    title = titles[Math.floor(Math.random()*titles.length)];
    var opt = {
      type: "basic",
      title: title,
      message: message,
      iconUrl: "images/disappoint.jpg"
    }
    chrome.notifications.create(opt);
    return;
  }
  if (swears >= 3) {
    msgs = ["What the heck? You swore " + swears + " times!",
            "Ah jeez, you swore " + swears + " times!",
            "Gosh! You swore " + swears + " times!",
            "What the frick? You swore " + swears + " times!",
            "Jinkees, you swore " + swears + " times!",
            "What the heck? You cursed " + swears + " times!",
            "Ah jeez, you cursed " + swears + " times!",
            "Gosh! You cursed " + swears + " times!",
            "What the frick? You cursed " + swears + " times!",
            "Jeepers, you cursed " + swears + " times!",
            "What a potty-mouth!",
            "Do you kiss your mother with that mouth?",
            "Ugh, such filthy language!",
            "Excuse me, this is a Christian browser!",
            "No profanities in this browser!",
            "No foul language in this browser!",
            "Keep it PG!"];

    titles = ["Oh no!",
              "Uh oh!",
              ">:(",
              ":(",
              "No swearing!"];
    message = msgs[Math.floor(Math.random()*msgs.length)] + balMessage;
    title = titles[Math.floor(Math.random()*titles.length)];
    var opt = {
      type: "basic",
      title: title,
      message: message,
      iconUrl: "images/disappoint.jpg"
    }
    chrome.notifications.create(opt);
    return;
  }
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    // inc_result = result.num_swears+1;
    if ('num_swears' in changes) {
      var storageChange = changes['num_swears'];
      var inc_result = storageChange.newValue - storageChange.oldValue;
      
      // chrome.storage.sync.set({num_swears: inc_result}, function(){
      // 	console.log("Increment number of swears to " + inc_result);
      // });
      getNotif(inc_result, storageChange.newValue/100.0);
      if (storageChange.newValue>=10){
        chrome.storage.sync.set({sworeTooManyTimes: true}, function() {
          console.log('YOU SWORE TOO MANY TIMES');
          // console.log(window.onbeforeunload);
          window.onbeforeunload = null;

          chrome.tabs.update({
               url: chrome.extension.getURL("swearingisbad.html")
          });

        //for the future: update all active tabs
        // chrome.tabs.query( { active: true, currentWindow: true }, function( tabs ) {
        //   chrome.tabs.update( tabs[0].id, { url: "http://stackoverflow.com//" } ); 
        // });

        });
      } else{
        chrome.storage.sync.set({sworeTooManyTimes:false}, function(){

        });
      }
    }
    // msgs = ["What the heck?", "Ah jeez,", "Gosh!", "What the frick?", "Jinkees,"]
    // specific_msg = msgs[Math.floor(Math.random()*msgs.length)];
    // var opt = {
    //   type: "basic",
    //   title: "Not in my Christian browser!",
    //   message: specific_msg + " you swore " + inc_result + " times! your swear jar balance is now $" + storageChange.newValue/100,
    //   iconUrl: "images/disappoint.jpg"
    // }
    // if (inc_result > 0) {
    //   console.log("Number of new swears: " + inc_result);
    //   chrome.notifications.create(opt);s
    // }
  // });
  });
});