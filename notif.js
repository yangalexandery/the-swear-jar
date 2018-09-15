chrome.storage.onChanged.addListener(function(changes, namespace) {
  // inc_result = result.num_swears+1;
  var storageChange = changes['num_swears'];
  var inc_result = storageChange.newValue - storageChange.oldValue;
  
  // chrome.storage.sync.set({num_swears: inc_result}, function(){
  // 	console.log("Increment number of swears to " + inc_result);
  // });
  msgs = ["What the heck?", "Ah jeez,", "Gosh!", "What the frick?", "Jinkees,"]
  specific_msg = msgs[Math.floor(Math.random()*msgs.length)];
  var opt = {
    type: "basic",
    title: "Not in my Christian browser!",
    message: specific_msg + " you swore " + inc_result + " times! your swear jar balance is now $" + storageChange.newValue/100,
    iconUrl: "images/disappoint.jpg"
  }
  console.log("Number of new swears: " + inc_result);
  chrome.notifications.create(opt);
// });
});
