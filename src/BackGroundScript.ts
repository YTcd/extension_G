//메세지 리스너 세팅
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type == "click!") {
    // ContentsScript에 메시지 보내기
    chrome.tabs.query({ active: true }, function (tabs: any) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
});