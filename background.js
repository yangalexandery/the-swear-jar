chrome.runtime.onInstalled.addListener(function() {
chrome.storage.sync.set({color: '#3aa757'}, function() {
  console.log('The color is green.');
});
chrome.storage.sync.set({num_swears: 0}, function(){
  console.log("Number of swears is initialized to 0.");
});
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'developer.chrome.com'},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});
});