let dateData: DateObjectType;
let timeoutId: number;
let interval = 950;
let count = 0;
let isSuccess = false;
let dictionary = [];

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
                setHollAndTime().then(() => {
                    clearTimeout(timeoutId);
                    finalizeTheReservation();
                }, () => {
                    console.error("지정한 시간 " + dateData.startTime + "과 " + dateData.endTime + "의 사이에 가능한 예약이 없거나 아직 로드되지 않았습니다.");
                    runWithRandomDelay();
                })
            }, () => {
                console.error("지정한 날짜 " + dateData.day + "일에 가능한 예약이 없거나 아직 로드되지 않았습니다.");
                runWithRandomDelay();
            });
        }, () => {
            console.error(dateData.month + "월은 가능한 예약 내역이 없거나 아직 로드되지 않았습니다.");
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
        for (let i = 0; i < day.length; i++) {
            if (day[i].innerHTML == dateData.day) {
                if (day[i].className == "golfResvDate end" || day[i].className == "golfResvDate imposs") {
                    alert("해당 일자는 예약이 불가능 합니다.");
                    clearTimeout(timeoutId);
                } else {
                    if (isSuccess == false) {
                        day[i].click();
                        isSuccess = true;
                        resolve(undefined);
                    }
                }
            }
        }
        reject();
    })
    return promise;
}

function setHollAndTime() {
    let promise = new Promise((resolve, reject) => {
        let hollList = document.getElementsByClassName("htlist") as HTMLCollection;
        let isHollChecked = [false, false, false, false];
        for (let i = 0; i < hollList.length; i++) {
            if (dateData.hollArr[i] == true) {
                isHollChecked[i] = true;
            }
        }

        // "HH:MM" 양식으로 저장되어있다.
        let startTimeArr = dateData.startTime.split(":");
        let endTimeArr = dateData.endTime.split(":");

        let hollContainer = document.getElementById("divGolfCourseTime2") as any;

        let checkedHoll = [];
        for (let i = 0; i < 4; i++) {
            if (isHollChecked[i] == true) {
                checkedHoll.push(hollContainer.children[i]);
            }
        }

        for (let i = 0; i < checkedHoll.length; i++) {
            let timeList = checkedHoll[i].children[0];
            if (timeList.childElementCount == 0) {
                continue;
            }

            for (let j = 0; j < timeList.childElementCount; j++) {
                let timeButton = timeList.children[j].children[0];
                let time = timeList.children[j].children[0].innerText;
                let splitedTime = time.split(":");
                if (isOutOfTime(startTimeArr, endTimeArr, splitedTime) == false) {
                    timeButton.click();
                    resolve(undefined);
                }
            }
        }
    })
    return promise;
}

function isOutOfTime(startTime: string[], endTime: string[], resTime: string[]): boolean {
    let sHour = Number(startTime[0]);
    let sMinute = Number(startTime[1]);
    let eHour = Number(endTime[0]);
    let eMinute = Number(endTime[1]);
    let rHour = Number(resTime[0]);
    let rMinute = Number(resTime[1]);

    if (Number.isNaN(sHour + sMinute + eHour + eMinute + rHour + rMinute)) {
        return true;
    }

    if (sHour > rHour || eHour < rHour) {
        return true;
    }

    if (sHour == rHour && sMinute > rMinute) {
        return true;
    }

    if (eHour == rHour && eMinute < rMinute) {
        return true;
    }

    return false;
}

function finalizeTheReservation() {
    let radioButtonY = document.getElementById("golfAgreeN") as any;
    let radioButtonN = document.getElementById("golfAgreeN") as any;
    window.scrollTo(0, 2000);
    radioButtonN.checked = false;
    radioButtonY.checked = true;

    let finishReserveButton = document.getElementById("finish_reserve") as any;
    finishReserveButton.click();
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