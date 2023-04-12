type DateObjectType = {
  year: string,
  month: string,
  day: string,
}
//예약 시작 버튼
let submitButton = document.getElementById("submit") as HTMLElement & { value: any };
let isClicked = false;
let hollCont_contain;
let row_list;
let holl_tit;
let agree;

submitButton!.onclick =

  async function onClicked() {
    if (submitButton && submitButton.value) {
      if (!isClicked) {
        isClicked = true;
        submitButton.value = "멈추기";
        //로컬 스토리지에 들어온 데이터들 저장
        //데이터는 "yyyy-mm-dd" 식으로 저장된다.
        let dateData = document.getElementById("reservationDate") as any;
        dateData = dateData.value;
        let dateArray = dateData.split("-");
        let dateDataObj = {
          year: dateArray[0],
          month: dateArray[1],
          day: dateArray[2],
        }
        chrome.tabs.executeScript({
          code: 'document.querySelector("body")?.innerText;'
        }, (result) => {
          alert(result);
        })
      } else {
        isClicked = false;
        submitButton.value = "예약 시작";
      }
    }
  }

function loadDOMElement(): Promise<void> {
  let waiter = [false, false, false, false];
  const isAllLoaded = (curVal: boolean) => curVal != false;

  if (waiter.every(isAllLoaded) == true) {

  }
  return new Promise((resolve) => { });
}
