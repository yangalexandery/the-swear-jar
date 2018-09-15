window.addEventListener('load', function load(event){
	chrome.storage.sync.get(['user_venmo_account'], function(result) {
		document.getElementById("current_username").innerHTML = "Your venmo account is set as: "+ result.user_venmo_account;
	});
	var submit = document.getElementById('venmo_submit_button');
	submit.addEventListener('click', function(event) {
		setUserAccount();
	});
});

function setUserAccount(){
	var username = document.getElementById("set_username").elements[0].value;;
	chrome.storage.sync.set({user_venmo_account: username}, function() {
		console.log('venmo username set as: '+ username);
	});
	document.getElementById("current_username").innerHTML = "Your venmo account is set as: "+ username;
}

