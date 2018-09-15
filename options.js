window.addEventListener('load', function load(event){
	chrome.storage.sync.get(['user_paypal_account'], function(result) {
		document.getElementById("current_username").innerHTML = "Your PayPal account is set as: "+ result.user_paypal_account;
	});
	var submit = document.getElementById('user_submit_button');
	submit.addEventListener('click', function(event) {
		setUserAccount();
	});
});

function setUserAccount(){
	var username = document.getElementById("set_username").elements[0].value;;
	chrome.storage.sync.set({user_paypal_account: username}, function() {
		console.log('PayPal username set as: '+ username);
	});
	document.getElementById("current_username").innerHTML = "Your PayPal account is set as: "+ username;
}

