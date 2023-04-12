let interval = 1000;
    const func = function (interval: number) {
      clearTimeout(timeoutID);
      
      interval = Math.random() * 500;
      const isBodyLoaded = !!document.body;
      console.log(localStorage.getItem("date"));
        console.log(localStorage.getItem("date"));
      if (isBodyLoaded) {
        console.log(localStorage.getItem("date"));
        console.log(localStorage.getItem("date"));
      }
      timeoutID = setTimeout(func, interval);
    }
  
    let timeoutID = setTimeout(func, interval);
  
    //   var func = function(hollIndex,itemIndex,time){
    //     hollIndex--;
    //     itemIndex--;
    //     var hollCont_contain = document.getElementsByClassName("hollcont_contain")
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
    
    chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
      if(request.action == "submitDate"){
      }
    })