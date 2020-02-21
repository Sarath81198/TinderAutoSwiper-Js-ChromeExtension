chrome.browserAction.onClicked.addListener(buttonClicked)

var urls = [];

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        urls[tabId] = changeInfo.url;
        console.log(urls[tabId]);
        if (urls[tabId] == "https://tinder.com/app/recs"){
            chrome.storage.local.set({ 'likeBtn': 'enabled' }, function () {
                console.log("Like button state is enabled");
            });
            console.log("This is tinder")
        }
    }
});
function buttonClicked(tab){
    let message = {
        txt: "start_swiping"
    }
    chrome.tabs.sendMessage(tab.id, message)
    console.log(tab.id)
}