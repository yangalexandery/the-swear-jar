console.log("Emptiness.js active");
var updateState = function(isFull){
    var jarMessage = document.getElementById("jar-message");
    var jarImage = document.getElementById("jar-image");
    var soapMessage1 = document.getElementById("soap-message-1");
    var soapMessage2 = document.getElementById("soap-message-2");
    var soapMessage3 = document.getElementById("soap-message-3");
    console.log(jarMessage);
    console.log(jarImage);
    if(isFull) {
        jarMessage.innerHTML = "Uh oh! Your swear jar is full!";
        jarImage.src = "images/jar-full.jpg";
        soapMessage1.innerHTML = "You've been saying way too many naughty words.";
        soapMessage2.innerHTML = "Luckily, the money in the swear jar is just enough to pay for a";
        soapMessage3.innerHTML = "bar of (virtual) soap, to wash out that filthy mouth of yours.";
    }
}

var changeState = function() {
    chrome.storage.sync.get(['sworeTooManyTimes'], function(result) {
        var isFull = result.sworeTooManyTimes;
        updateState(isFull);
    });
};
changeState();