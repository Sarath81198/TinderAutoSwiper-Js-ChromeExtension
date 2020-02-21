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
    setBtnUse()
    document.getElementById("startSwiping").onclick = function () {
        document.getElementById("startSwiping").disabled = true;
        startSwiping()
        sendSpeedRate()
        addBtnState("disabled")
        setBtnUse()
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
        txt : "start_swiping",
        speed : sendSpeedRate()
    }
    console.log(message)
    chrome.tabs.sendMessage(currentTab, message)
}


// End swiping
waitForLoad("stopSwiping", function () {
    document.getElementById("stopSwiping").onclick = function () {
        endSwiping()
        addBtnState("enabled")
        setBtnUse()
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


function sendSpeedRate() {
    var ele = document.getElementsByName('switch');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked){
            console.log(ele[i].value);
            return ele[i].value;
        }

    }
}


function addBtnState(buttonState) {
    chrome.storage.local.set({'likeBtn': buttonState}, function(){
        console.log("like button state is "+ buttonState);
    });
}

function setBtnUse(){
    chrome.storage.local.get(['likeBtn'], function a(result){
        if(result.likeBtn == "disabled"){
            document.getElementById("startSwiping").disabled = true;
            document.getElementById("stopSwiping").disabled = false;
            console.log("Like btn disable, stop button enable")
        }
        else if (result.likeBtn == "enabled") {
            document.getElementById("startSwiping").disabled = false;
            document.getElementById("stopSwiping").disabled = true;
            console.log("Like btn enable, stop button disable")
        }
    })
}