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
  var opt = {
    type: "basic",
    title: "Not in my Christian browser!",
    message: "Stop swearing! what the fuck? you swore " + inc_result + " times!",
    iconUrl: "images/disappoint.jpg"
  }
  chrome.notifications.create(opt);
});

let color = element.target.value;
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.body.style.backgroundColor = "' + color + '";'});
});
};