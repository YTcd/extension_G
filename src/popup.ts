type DateObjectType = {
  year: string,
  month: string,
  day: string,
  hollArr: boolean[],
  startTime: string,
  endTime: string,
}
//예약 시작 버튼
let submitButton = document.getElementById("submit") as HTMLElement & { value: any };
let isClicked = false;

submitButton!.onclick = () => {
  if (submitButton && submitButton.value) {
    if (!isClicked) {
      isClicked = true;
      submitButton.value = "멈추기";
      //로컬 스토리지에 들어온 데이터들 저장
      //데이터는 "yyyy-mm-dd" 식으로 저장된다.
      let dateData = document.getElementById("reservationDate") as any;
      dateData = dateData.value;
      let dateArray = dateData.split("-");

      let checkedArr = [];
      for (let i = 0; i < 4; i++) {
        let holl = document.getElementById("hollName" + (i + 1)) as any;
        checkedArr.push(holl.checked);
      }

      //24시간 기준으로 XX:XX 형식으로 string 데이터가 저장된다.
      let startTime = document.getElementById("startTime") as HTMLElement & { value: string };
      let endTime = document.getElementById("endTime") as HTMLElement & { value: string };

      if (!startTime
        || !endTime
        || !Array.isArray(dateArray)
        || checkedArr.length == 0) {
        alert(dateArray);
        isClicked = false;
        alert("작성이 완료되지 않은 항목이 있습니다.");
        return;
      }

      let dateDataObj = {
        year: dateArray[0],
        month: dateArray[1],
        day: dateArray[2].replace(/(^0+)/, ""),
        hollArr: checkedArr,
        startTime: startTime.value,
        endTime: endTime.value,
      }

      sendMessageToBackgroundScript(dateDataObj);
    } else {
      isClicked = false;
      submitButton.value = "예약 시작";
    }
  }
}

function sendMessageToBackgroundScript(dataObj: DateObjectType) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: any) {
    let message = {
      type: "click!",
      data: dataObj,
    }
    chrome.runtime.sendMessage(message);
  });
}