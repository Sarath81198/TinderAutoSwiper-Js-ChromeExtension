chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab){
    let message = {
        txt: "start_swiping"
    }
    chrome.tabs.sendMessage(tab.id, message)
}