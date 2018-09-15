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

var rawFile = new XMLHttpRequest();
rawFile.open("GET", "bad-boys.txt", true);
var allSwears = [];
rawFile.onreadystatechange = function() {
	if (rawFile.readyState === 4) {
	  	allSwears = rawFile.responseText.split(",");
	  	if (allSwears[allSwears.length - 1].length === 0) {
	  		allSwears.splice(allSwears.length - 1, 1);
		}
	}
}
rawFile.send();

var countNumSwears = function(targetString) {
	console.log("countNumSwears: " + targetString);
	var count = 0;

	for (i in allSwears) {
		var pos = 0;
		var swear = allSwears[i];
		while (pos < targetString.length) {
			var index = targetString.indexOf(swear, pos);
			// pos = targetString.length;
			if (index >= 0) {
				count++;
				pos = index + swear.length;
			} else {
				pos = targetString.length;
			}
		}
	}
	return count;
}

var searchForSwears = function(targetObj) {
	var tot = 0;
	var keys = Object.keys(targetObj);
	for (i in keys) {
		var targetText = targetObj[keys[i]];
		if (typeof targetText === typeof "foo") {
			tot = Math.max(tot, countNumSwears(targetText));
		} else if (typeof targetText === "object") {
			tot = Math.max(tot, searchForSwears(targetText));
		}
	}
	// for (i in keys) {
	// 	var targetText = targetObj[keys[i]];
	// 	console.log(targetText);
	// 	console.log(typeof targetText);
	// 	if (typeof targetText === typeof "foo") {
	// 		tot += countNumSwears(targetText);
	// 	}
	// }
	return tot;
}

var parseQueryString = function(targetText) {
	var index = targetText.lastIndexOf("?");
	if (index === -1) {
		return {};
	}
	var queries = targetText.substring(index + 1);
	queries = queries.split("&");
	var body_dict = {};
	for (i in queries) {
		str_split = queries[i].split('=');
		body_dict[str_split[0]] = str_split[1];
	}
	return body_dict;
}

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
  			var tot = 0;
  			if ('requestBody' in details) {
  				if ('formData' in details.requestBody) {
					var possibleSwears = details.requestBody.formData
					tot = Math.max(tot, searchForSwears(possibleSwears));
  				} else if ('raw' in details.requestBody) {
  					var possibleSwears = parseRawData(details.requestBody.raw);
					tot = Math.max(tot, searchForSwears(possibleSwears));
  				}
  			}
			if ('url' in details && details.type === "main_frame") {
               // console.log("URL params: ")
               var possibleSwears = parseQueryString(details.url);
               // console.log(possibleSwears.entries());
               tot = Math.max(tot, searchForSwears(possibleSwears));
	        }
            if (tot > 0) {
                console.log(tot + " swears detected!");
                swears = chrome.storage.sync.get(['num_swears'], function(result) {
	                var newValue = result.num_swears + tot;
	                chrome.storage.sync.set({'num_swears': newValue}, function(){});
	            });
            }
  		},
	  	{urls: ["<all_urls>"]},
	  	["requestBody"]
	);
});