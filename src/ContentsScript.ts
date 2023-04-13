let dateData: DateObjectType;
let timeoutId: number;
let interval = 950;
let count = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == "click!") {
        dateData = message.data;
        count = 0;
        runWithRandomDelay();
    }
})

function runWithRandomDelay() {
    const delay = Math.random() * 1000;
    if (count > 3) {
        return;
    }
    count++;
    timeoutId = setTimeout(() => {
        setMonth().then(() => {
            setDay().then(() => {

            }, () => {
                runWithRandomDelay();
            });
        }, () => {
            runWithRandomDelay();
        });
    }, delay);
}

function setMonth() {
    let promise = new Promise((resolve, reject) => {
        let month = dateData.month;
        let monthElement = document.getElementsByClassName("calendar_date") as (HTMLCollectionOf<Element> & { innerText: string }[]);
        let elementValue = monthElement[0]?.innerText;
        let resultArr = elementValue?.split("-");
        if (!elementValue && typeof elementValue != "string" && !Array.isArray(resultArr)) {
            reject();
        } else {
            if ((resultArr[1] == month) == true) {
                resolve(undefined);
            } else {
                const link = document.querySelector('a[href="javascript:fnGetMonth(\'+\');"]') as Element & { click: Function };
                if (link) {
                    link.click();
                }
                reject();
            }

        }
    });
    return promise;
};

function setDay() {
    let promise = new Promise((resolve, reject) => {
        const day: any = document.querySelectorAll('a[href="javascript:void(0);"]');
        console.log(day);
        for (let i = 0; i < day.length; i++) {
            if (day[i].innerHTML == dateData.day) {
                if (day[i].className == "golfResvDate end" && day[i].className == "golfResvDate imposs") {
                    alert("해당 일자는 예약이 불가능 합니다.");
                    clearTimeout(timeoutId);
                } else {
                    console.log(day[i].className);
                    day[i].click();
                    resolve(undefined);
                }
            }
        }
        reject();
    })
    return promise;
}

function setHoll() {

}

function setItemIndex() {

}
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