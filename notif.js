chrome.storage.onChanged.addListener(function(changes, namespace) {
  // inc_result = result.num_swears+1;
  var storageChange = changes['num_swears'];
  var inc_result = storageChange.newValue - storageChange.oldValue;
  
  // chrome.storage.sync.set({num_swears: inc_result}, function(){
  // 	console.log("Increment number of swears to " + inc_result);
  // });
  var opt = {
    type: "basic",
    title: "Not in my Christian browser!",
    message: "Stop swearing! what the fuck? you swore " + inc_result + " times!",
    iconUrl: "images/disappoint.jpg"
  }
  console.log("Number of new swears: " + inc_result);
  chrome.notifications.create(opt);
// });
});
