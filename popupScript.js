function waitForLoad(id, callback) {
    var timer = setInterval(function () {

        if (document.getElementById(id)) {
            clearInterval(timer);
            callback();
        }
    }, 100);
}



// Start swiping
waitForLoad("startSwiping", function () {
    document.getElementById("startSwiping").onclick = function () {
        startSwiping()
    }
});


function startSwiping(){
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, gotTabs)
    console.log("startSwiping message sent");
}


function gotTabs(tabs) {
    console.log(tabs[0].id)
    let currentTab = tabs[0].id
    let message = {
        txt : "start_swiping"
    }
    chrome.tabs.sendMessage(currentTab, message)
}


// End swiping
waitForLoad("stopSwiping", function () {
    document.getElementById("stopSwiping").onclick = function () {
        endSwiping()
    }
});


function endSwiping() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, gotEndTabs)
    console.log("stopSwiping message sent");
}


function gotEndTabs(tabs) {
    console.log(tabs[0].id)
    let currentTab = tabs[0].id
    let message = {
        txt: "stop_swiping"
    }
    chrome.tabs.sendMessage(currentTab, message)
}
