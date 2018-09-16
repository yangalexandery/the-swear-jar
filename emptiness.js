console.log("Emptiness.js active");
var updateState = function(isFull){
    var jarMessage = document.getElementById("jar-message");
    var jarImage = document.getElementById("jar-image");
    console.log(jarMessage);
    console.log(jarImage);
    if(isFull) {
        jarMessage.innerHTML = "Uh oh! Your swear jar is full!";
        jarImage.src = "images/jar-full.jpg";
    }
}

var changeState = function() {
    chrome.storage.sync.get(['sworeTooManyTimes'], function(result) {
        var isFull = result.sworeTooManyTimes;
        updateState(isFull);
    });
};
changeState();