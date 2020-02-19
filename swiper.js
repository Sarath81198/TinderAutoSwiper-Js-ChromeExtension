chrome.runtime.onMessage.addListener(startSwipe);

function getElementByXpath(path) {
    result = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return result;
}


function like() {
    var likeBtnXpath = '//*[@id="content"]/div/div[1]/div/main/div[1]/div/div/div[1]/div/div[2]/button[3]';
    var likeBtn = getElementByXpath(likeBtnXpath)
    likeBtn.click()

    console.log("liked")
}

function closePopup(){
    var closePopupBtnXpath = '//*[@id="modal-manager"]/div/div/div[2]/button[2]';
    var closePopupBtn = getElementByXpath(closePopupBtnXpath)
    closePopupBtn.click()
}


function closeMatch() {
    var closeMatchBtnXpath = '//*[@id="modal-manager-canvas"]/div/div/div[1]/div/div[3]/a';
    var closeMatchBtn = getElementByXpath(closeMatchBtnXpath)
    closeMatchBtn.click()
}


function stopSwipe(){
    try {
        clearInterval(autoLike)
        console.log('stopped swiping');  
    } catch (error) {
        console.log(error)
    }
    
}


function startSwipe(message, sender, sendResponse) {
    if(message.txt == "start_swiping"){
        autoLike = setInterval(() => {
            try {
                like()
            } catch (error) {
                try {
                    closePopup();
                } catch (error) {
                    closeMatch();
                }
            }
        }, 1000);
    }
    else if(message.txt === "stop_swiping"){
        stopSwipe()
    }
}