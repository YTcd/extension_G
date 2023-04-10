let submitButton = document.getElementById("submit");
alert(submitButton)
submitButton.onclick =()=>{
  let date = document.getElementById("reservationDate");
  chrome.storage.setItem("date","date");
  localStorage.setItem("date","date");
  chrome.storage.sync.get('defaultnewtab', storage => {
    if (storage.defaultnewtab) {
      storage.setItem("date","date");
    }
});
}
