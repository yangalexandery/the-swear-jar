var parseRawData = function(data) {
	// data is 
	// console.log(data[d]['bytes']);
	uintarray = data[0]['bytes'];
	uintarray = new Uint8Array(uintarray);
	stringdata = new TextDecoder("utf-8").decode(uintarray);
	body = stringdata.split('&');
	body_dict = {}
	for (i in body) {
		str_split = body[i].split('=');
		body_dict[str_split[0]] = str_split[1];
	}
	return body_dict;
};

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({user_paypal_account: ""}, function() {
		console.log('user paypal username set as: ');
	});

	chrome.storage.sync.set({developer_paypal: "lulu_guo1123"}, function() {
		console.log('developer paypal username set as: lulu_guo1123');
	});

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
	chrome.webRequest.onBeforeRequest.addListener(
  		function(details){
  			// if ('requestBody' in details) {
  			// 	console.log("good");
  			// 	console.log(details.url);
  			// 	console.log(details.requestBody.raw);
  			// 	parseRawData(details.requestBody.raw);
  			// }
  			if ('requestBody' in details) {
  				if ('formData' in details.requestBody) {
  					console.log("Form data: ")
					var possibleSwears = details.requestBody.formData
					console.log(possibleSwears);
  				} else if ('raw' in details.requestBody) {
  					var possibleSwears = parseRawData(details.requestBody.raw);
  					console.log("Form data: ")
  					console.log(possibleSwears);
  				}
  			}
  			if ('url' in details) {
  				console.log("URL params: ")
  				var possibleSwears = new URLSearchParams(details.url);
  				console.log(possibleSwears);
  			}
  		},
	  	{urls: ["<all_urls>"]},
	  	["requestBody"]
	);
});