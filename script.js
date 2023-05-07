// CHECKING IF IT WAS CLICKED OR NOT
var titleclicked = false

//1000 = 1 second
var timediff  = 100 //millisecond

//keeping track of how many events and giving them the classname of the variable
var cevents = 0

// toast notif enabled

var toastout = false
var toastnum = 0
// date and time section, set interval function is for constantly updating the date and time
setInterval(function() {
    const date1 = new Date()
    var seconds = 0
    var minutes = 0
    if(date1.getSeconds() < 10){
        seconds = "0" + date1.getSeconds()

    }else{
        seconds = date1.getSeconds()
    }

    if(date1.getMinutes() < 10){
        minutes = "0" + date1.getMinutes()
    }else{
        minutes = date1.getMinutes()
    }
    const timeText = date1.getHours() + ":" + minutes + ":" + seconds
    const dateText = date1.getMonth()+1 + "/" + date1.getDate() + "/" + date1.getFullYear()
    document.querySelector(".currenttime").innerText = timeText
    document.querySelector(".currentdate").innerText = dateText
}, timediff)



var taskname = ""
var tasktime = ""
var taskdate = ""

// set to do function

document.querySelector(".addtask").addEventListener("click",function(){
    taskname = document.querySelector(".taskname")
    tasktime = document.querySelector(".tasktime")
    taskdate = document.querySelector(".taskdate")
    todoelements = document.querySelector(".todoelements")

    if(taskname.value != "" && tasktime.value != "" && taskdate.value != ""){
        const test = document.createElement("div")

        test.style = `
            width: 100%;
            margin: 5px;
            background-color: white;
            padding: 10px 5px;
        `
        test.innerText = taskname.value + "\n" + tasktime.value + "\n" + taskdate.value + "\n"


        todoelements.appendChild(test);

        const deletebutton = document.createElement("button")
        deletebutton.innerText = "Delete"
        deletebutton.classList.add("deletebutton");

        test.appendChild(deletebutton)

        deletebutton.style = `
            width: 50%;
            background-color: red;
            padding: 2px 2px;
            border-radius: 5;
            outline: none;
            border: none;
            margin-left: auto;
            margin-right: auto;


            top: 0;
            right: 50;

            
            
        `

        deletebutton.addEventListener("click",function(){
            todoelements.removeChild(test)
        })
        
        



        taskname.value = ""
        tasktime.value = ""
        taskdate.value = ""
    }
})

var events = []

var eventname = ""
var eventdate = ""
var eventime = ""


document.querySelector(".addevent").addEventListener("click",function(){
    eventname = document.querySelector(".eventname").value
    eventdate = document.querySelector(".eventdate").value
    eventtime = document.querySelector(".eventtime").value


    if(eventname != "" && eventdate != "" && eventtime != "" ){
        const event = document.createElement("div")
        event.setAttribute("class","eventClass")
        event.setAttribute("id","event" + cevents)
        event.style = `
            width: 100%;
            margin: 5px;
            background-color: white;
            padding: 10px 5px;
        `
        event.innerText = eventname + "\n" + eventdate + "\n" + eventtime + "\n"
        document.querySelector(".eventelements").appendChild(event)

        var tag = "event" + cevents
        cevents +=1


        events.push([eventname,eventdate,eventtime,tag])
    }
})


toastinterval = setInterval(function(){
    if (new Date().getSeconds() == 0) {
        var arrlength = events.length
        for(var i =0;i<arrlength;i++){
            const currevent = events[i]
            const currname = currevent[0]
            const currdate = currevent[1]
            const currtime = currevent[2]
            const currtag = currevent[3]
    
            console.log(currname,currdate,currtime)
            const date2 = new Date();

            var hours = ""
            var minutes = ""

            var timeText = ""
            if(date2.getHours() < 10){
                hours = "0" + date2.getHours()

            }else{
                 hours = date2.getHours()
            }

            if(date2.getMinutes() < 10){
                minutes = "0" + date2.getMinutes()
            }else{
                minutes = date2.getMinutes()
            }

            timeText = hours + ":" + minutes

             var dateText = ""

             var monthtext = ""
            const currmonth = date2.getMonth() + 1
            var todaydatetext = ""

            if(currmonth < 10){
              monthtext = "0" + currmonth
             }else{
              monthtext = currmonth
            }

            if(date2.getDate() < 10){
                todaydatetext = "0" + date2.getDate()
            }else{
                todaydatetext = date2.getDate()
            }

            dateText = date2.getFullYear() + "-" + monthtext + "-" + todaydatetext

            console.log(timeText,dateText)


             if( currdate == dateText && currtime ==  timeText && toastout == false){
                toastout = true
                const toast = document.createElement("div")
                toast.classList.add("toastclass")
                toast.setAttribute("id","ToastNotifs" + toastnum)
                toastnum += 1

                toast.style = `
                    width: 300px;
                    height: 200px;
                    background-color: blue;
                    z-index: 2;
                    position: fixed;
                    right: -300px;
                    bottom: 10px;
                    color: white;
                    padding: 10px;
                    font-size: 25px;
                    font-weight: 400;
                    font-family: "Roboto Condensed";
                    transition: 0.5s ease;
                    border-radius: 6px;
                `

                toast.innerText = "REMINDER \n" + currname + " starts now!"

                document.body.append(toast)

                setTimeout(() => {
                    toast.style.right = 0;

                    setTimeout(() => {
                        toast.style.right = "-300px";
                        
                        setTimeout(() => {
                            var currtoastname = "ToastNotifs" + (toastnum - 1)
                            document.getElementById(currtoastname).remove()
                        }, 1000)
                    }, 5000)

                    document.getElementById(currtag).remove()
            
                }, 300);
                toastout = false
            }
        }
    }
    
}
,1000)








// STOPWATCH AND TIMER

// Stopwatch

var seconds = 0;
var minutes = 1;

var timerrunning = true

function starttimer() {
    try {clearInterval(testInterval)} catch {}

    timerrunning = true
    if (minutes == 0 && seconds == 0) {
        console.log("Nice try")
    } else {
        testInterval = setInterval(() => {
            if (timerrunning) {
                if (minutes == 0 && seconds == 0) {
                    alert("Your timer has expired!")
                    clearInterval(testInterval)
                } else {
                    seconds -= 1
                    
                }
        
                updatetimertext()
            }
        }, 1000);
    }
    
}

function stoptimer() {
    timerrunning = false
}

function addminutes(n) {
    minutes += n
    if (minutes < 0) {
        minutes = 0
        seconds = 0
        try {clearInterval(testInterval)} catch {}
        
    }
    updatetimertext()
    console.log("Added")
}

function resettimer() {
    minutes = 0
    seconds = 0

    updatetimertext()
    try {clearInterval(testInterval)} catch{}
}

function updatetimertext() {

    if (seconds < 0) {
        minutes -= 1
        seconds = 59
    }
    
    if (seconds < 10) {
        document.querySelector(".timertext").innerText = minutes + ":0" + seconds
    } else {
        document.querySelector(".timertext").innerText = minutes + ":" + seconds
    }
    
}


// Stopwatch

var seconds2 = 0;
var minutes2 = 0;

var stopwatchrunning = true;

function startstopwatch() {
    stopwatchrunning = true
    try {clearInterval(testInterval2)} catch {}

    testInterval2 = setInterval(() => {
        if (stopwatchrunning) {
            seconds2 += 1
            updatestopwatchtext()
        }

    }, 1000);
    
}

function stopstopwatch() {
    stopwatchrunning = false;
}

function resetstopwatch() {
    minutes2 = 0
    seconds2 = 0

    updatestopwatchtext()
    clearInterval(testInterval2)
}

function updatestopwatchtext() {
    if (seconds2 > 59) {
        seconds2 = 0
        minutes2 += 1
    }
    if (seconds2 < 10) {
        document.querySelector(".stopwatchtext").innerText = minutes2 + ":0" + seconds2
    } else {
        document.querySelector(".stopwatchtext").innerText = minutes2 + ":" + seconds2
    }
}

