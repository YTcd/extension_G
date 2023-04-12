let interval = 1000;
let timeoutID: number;
let obj: DateObjectType | undefined = undefined;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message == "submit") {
    submitAction(obj!);
  } else if (message == "stop") {
    clearTimeout(timeoutID);
    return;
  }

})

let submitAction = function (dateDataObj: DateObjectType) {

  const func = function (interval: number) {
    clearTimeout(timeoutID);

    interval = Math.random() * 500;
    const isBodyLoaded = !!document.body;
    if (isBodyLoaded) {
      console.log(dateDataObj.day);
    }
    timeoutID = setTimeout(func, interval);
  }

  timeoutID = setTimeout(func, interval);

  //   var func = function(hollIndex,itemIndex,time){
  //     hollIndex--;
  //     itemIndex--;
  //     var hallCont_contain = document.getElementsByClassName("hollcont_contain")
  //     var row_list = hollCont_contain[0].children[0].children[hollIndex].children[0];

  //     var holl_tit = document.getElementsByClassName("holltit_w");
  //     var hollName = holl_tit[0].children[0].children[hollIndex].firstChild;

  //     var engChar = "";
  //     switch(hollIndex){
  //         case 0:
  //             engChar = 'A';
  //             break;
  //         case 1:
  //             engChar = 'B';
  //             break;
  //         case 2:
  //             engChar = 'C';
  //             break;
  //         case 3:
  //             engChar = 'D';
  //             break;
  //     }

  //     fnChoiceCourseTime(row_list.children[itemIndex].firstChild, engChar, hollName,time+"");
  //     window.scrollTo(0,2000);
  //     document.getElementById("golfAgreeN").checked = false;
  //     document.getElementById("golfAgreeY").checked = true;
  // }
}
