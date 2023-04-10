console.log("ContentScript exec");

chrome.runtime.sendMessage({action:"submit"}, (response)=>{
    alert(response)
})