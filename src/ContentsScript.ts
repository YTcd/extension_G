let hollCont_contain;
let row_list;
let holl_tit;
let agree;
let hollIndex = 1;


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "click") {
        console.log("asd");
    }
})

function loadDOMElement() {
    let promiseResolve: any;
    const loadPromise = new Promise((resolve, reject) => {
        promiseResolve = resolve;
    });
    chrome.tabs.executeScript({
        code: 'document.getElementsByClassName("hollcont_contain")'
    }, (result) => {
        hollCont_contain = result;
        row_list = hollCont_contain[0].children[0].children[hollIndex].children[0];
        chrome.tabs.executeScript({
            code: 'document.getElementsByClassName("holltit_w")'
        }, (result) => {
            holl_tit = result;
            chrome.tabs.executeScript({
                code: 'document.getElementById("golfAgreeN")'
            }, (result) => {
                agree = result;
                promiseResolve.resolve();
            })
        })
    })


    return loadPromise;
}