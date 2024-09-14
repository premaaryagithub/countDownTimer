const TimePage = document.querySelector(".timer-page ");
const  Times = document.querySelector(".times");
const InPage  = document.querySelector(".initial-page ");
const Adtimer = document.querySelector(".addtimer");
const ShowCountPage = document.querySelector(".show-time-page ");
const TextInput = document.getElementById("text-input");
const displaymessage = document.querySelector(".displaymsg");
const seenMsg = document.querySelector(".seemsg");
const STOP = document.querySelector(".stop");
//  selected audios 
const  audioArr = [
    'alarmsound.mp3',
    'alarmsound1.mp3',
    'alarmsound2.wav',
]
//randomly selectng audio for alarm 
const randomAudio  = Math.floor(Math.random() * audioArr.length);
const randomAudiofile = audioArr[randomAudio];
const audio = document.createElement('audio');
audio.src = randomAudiofile;
// for creating seperating  indexes for timers
let  timerArr = [];


//  count down timer display
let timesCount  = 0;
let days = document.getElementById("days");
let hrs = document.getElementById("hours");
let min = document.getElementById("minutes");
let sec = document.getElementById("seconds");

let td  = document.getElementById("td");
let th  = document.getElementById("th");
let tm  = document.getElementById("tm");
let ts  = document.getElementById("ts");

function start()
{  // this will direct to timer set-up page 
    InPage.classList.add("hide");
    TimePage.classList.remove("hide");
    Adtimer.classList.remove("hide");
}
function AddTimer()
{
  // function to create a another div element and operation with it 

    const  another = document.createElement("div");
    another.innerHTML = "time " + timesCount;
    another.className = "times";
    another.id = "time " + timesCount;

   const timerItem  = {
    element: another,
    SetUp : null,
    text: null,
    dateTime: null
   };
   timerItem.SetUp = createInputPage(timerItem );
    TimePage.appendChild(timerItem.element);
    timesCount++;
    timerArr.push(timerItem);
    // Attach event listener to the new timer element
  timerItem.element.addEventListener('click', function() {
    if (timerItem.element.classList.contains('onset')) {
      countDown(timerItem);
    } else {
       timerItem.SetUp.classList.remove("hide");
      //this will direct to time setup page 
      TimePage.classList.add("hide");
      Adtimer.classList.add("hide");
      //ShowCountPage.classList.remove("hide");
      //SetUp.classList.add("hide");
    }
  });
}
function createInputPage(timerItem) {
    const SetUp = document.createElement("div");
    SetUp.classList.add("set-up", "hide"); // Add CSS classes
  
    // Add input elements for text and date/time
    const textInput = document.createElement("input");
    textInput.setAttribute("type", "text");
    textInput.setAttribute("id","text-input");
    textInput.setAttribute("placeholder", "Enter your text");
  
    const dateTimeInput = document.createElement("input");
    dateTimeInput.setAttribute("id","UserInput");
    dateTimeInput.setAttribute("type", "text");
    dateTimeInput.setAttribute("placeholder","mm/dd/yyyy,hh:mm:ss");

  
    const saveButton = document.createElement("button");
    saveButton.setAttribute("id","enter");
    saveButton.textContent = "Save";
  
    // Add event listener to save button
    saveButton.addEventListener("click", function() {
      const text = textInput.value;
      const dateTime = dateTimeInput.value;
  
      // Update timer element with text
      timerItem.element.innerHTML = text;
      // Store text and date/time in the timerItem
      timerItem.text = text;
      timerItem.dateTime = dateTime;
      // Hide the input page
     SetUp.classList.add("hide");
     //add onset to the div who entered all data
     timerItem.element.classList.add("onset");
      // Show the TimePage
      TimePage.classList.remove("hide");
    Adtimer.classList.remove("hide");
      // Trigger the timer setup
      timeTarget(timerItem,saveButton,text,dateTime,SetUp);
    });
  
    // Append elements to the input page
   SetUp.appendChild(textInput);
SetUp.appendChild(dateTimeInput);
    SetUp.appendChild(saveButton);
  
    // Append the input page to the body (or wherever you want)
    document.body.appendChild(SetUp);
  
    return SetUp;
  }
//let enterBtnCount = [] * timesCount;
function timeTarget(timerItem,saveButton,Text,dateTime,SetUp)
{
    
   const element = timerItem.element;
    saveButton.addEventListener("click", function() 
    {
       


            const text = Text;
      const DateTime = dateTime;
    element.innerHTML = text;
    seenMsg.innerHTML =  "Hey Buddy!! your timer for   "+`${text}`+ "   is  out ";
   SetUp.classList.add("hide");
   TimePage.classList.remove("hide");
   Adtimer.classList.remove("hide");
   element.classList.add(`onset`);
      
});
}
Adtimer.setAttribute('onclick','AddTimer()');
function countDown(timerItem)
{
   
  
        //this will direct to countdopwn page 
        TimePage.classList.add("hide");
        Adtimer.classList.add("hide");
        ShowCountPage.classList.remove("hide");
        
   //create count down timer for this div     
   
const x = setInterval(function() {
    let present = new Date(timerItem.dateTime).getTime();
    let countdown = new Date().getTime();
    let timegap = present - countdown;
    // calculate days, hours, minutes, and seconds
    let d = Math.floor(timegap / (1000 * 60 * 60 * 24));
    let h = Math.floor((timegap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((timegap % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((timegap % (1000 * 60)) / (1000));


    // display the countdown timer
    days.textContent = d + "d";
    hrs.textContent = h + "hr";
    min.textContent = m + "min";
    sec.textContent = s + "sec";
    // animate time span with stroke
    td.style.strokeDashoffset = 440 - (440 * d) / 365;
    th.style.strokeDashoffset = 440 - (440 * h) / 24;
    tm.style.strokeDashoffset = 440 - (440 * m) / 60;
    ts.style.strokeDashoffset = 440 - (440 * s) / 60;
    // display message if time's up
    if (timegap<=0) {
      clearInterval(x);
     console.log("timesup");
        //SetUp.classList.add("hide");
        ShowCountPage.classList.add("hide");
        TimePage.classList.add("hide");
        Adtimer.classList.add("hide");
        displaymessage.classList.remove("hide");   
     seenMsg.innerHTML =  `Hey Buddy!! your timer for ${timerItem.text} is out`;
      
        STOP.classList.remove("hide");
 
     
      audio.play();

    }
  }, 1000);   
}

// stop fucntion to stop alarm sound and  get back to home  page 


function stop()
{
    STOP.classList.add("hide");
    displaymessage.classList.add("hide");
    TimePage.classList.remove("hide");
    Adtimer.classList.remove("hide");
    if(audio)
    {
    audio.pause();
    }
}

function Back()
{
    //directs to timer page if user wants to add another countdown timer 
    ShowCountPage.classList.add("hide");
    TimePage.classList.remove("hide");
    Adtimer.classList.remove("hide");
}
