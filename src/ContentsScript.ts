console.log("ContentScript exec");

chrome.runtime.sendMessage({action:"submitDate"}, (response)=>{
    //alert(response)
    console.log("a");
})