let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
changeColor.style.backgroundColor = data.color;
changeColor.setAttribute('value', data.color);
});
changeColor.onclick = function(element) {
chrome.storage.sync.get(['num_swears'], function(result){
  inc_result = result.num_swears+1;
  chrome.storage.sync.set({num_swears: inc_result}, function(){
  	console.log("Increment number of swears to " + inc_result);
  });
  if(inc_result>=100){
  	chrome.storage.sync.set({sworeTooManyTimes: true});
  }
  else{
  	chrome.storage.sync.set({sworeTooManyTimes: false});
  }
  var opt = {
    type: "basic",
    title: "Not in my Christian browser!",
    message: "what the fuck? the swear jar is now at $" + (inc_result/100),
    iconUrl: "images/disappoint.jpg"
  }
  chrome.notifications.create(opt, function(){
  	// console.log("finished notifying");
  	return;
  });
});

let color = element.target.value;
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.body.style.backgroundColor = "' + color + '";'});
});
};
