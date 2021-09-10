// Constants 

/* The event focus is displayed when a random event occurs or a scene starts and is interrupted somehow.
there is an npc array and a thread array that may or may not be empty depending on user input
event focus [5-7] are linked with npc array. event focus [8-10] are linked with the thread array.*/

const eventFocus = ['Remote event','Introduce a new NPC','PC negative','PC positive','Ambiguous event','NPC negative','NPC positive', 'NPC action', 
  'Move toward a thread','Move away from a thread','Close a thread'];

// Event generation arrays. 
// A random event is generated by taking one word from the event action array and one word from the event subject array.

//event meaning: action array
const eventAction = ["Attainment","Starting","Neglect","Fight","Recruit","Triumph","Violate","Oppose","Malice","Communicate",
  "Persecute","Increase","Decrease","Abandon","Gratify","Inquire","Antagonise","Move","Waste","Truce","Release","Befriend",
  "Judge","Desert","Dominate","Procrastinate","Praise","Separate","Take","Break","Heal",
  "Delay","Stop","Lie","Return","Immitate","Struggle","Inform","Bestow","Postpone","Expose","Haggle","Imprison","Release","Celebrate","Develop",
  "Travel","Block","Harm","Debase","Overindulge","Adjourn","Adversity","Kill","Disrupt","Usurp","Create","Betray","Agree","Abuse",
  "Oppress","Inspect","Ambush","Spy","Attach","Carry","Open","Carelessness","Ruin","Extravagance","Trick","Arrive","Propose","Divide",
  "Refuse","Mistrust","Deceive","Cruelty","Intolerance","Trust","Excitement","Activity","Assist","Care","Negligence","Passion",
  "Work hard","Control","Attract","Failure","Pursue","Vengeance","Proceedings","Dispute","Punish","Guide","Transform",
  "Overthrow","Oppress","Change"];

//event meaning: Subject array
const eventSubject = ["Goals", "Dreams", "Environment", "Outside", "Inside","Reality",
  "Allies","Enemies","Evil","Good","Emotions","Opposition","War","Peace","The innocent","Love","The spiritual",
  "The intellectual","New ideas","Joy","Messages","Energy","Balance","Tension","Friendship","The physical","A project","Pleasures",
  "Pain","Possessions","Benefits","Plans","Lies","Expectations","Legal matters","Bureaucracy","Business",
  "A path","News","Exterior factors","Advice","A plot","Competition","Prison","Illness","Food","Attention","Success","Failure","Travel",
  "Jealousy","Dispute","Home","Investment","Suffering","Wishes","Tactics","Stalemate","Randomness","Misfortune","Death",
  "Disruption","Power","A burden","Intrigues","Fears","Ambush","Rumor","Wounds","Extravagance","A representative","Adversities",
  "Opulence","Liberty","Military","The mundane","Trials","Masses","Vehicle","Art","Victory","Dispute","Riches","Status quo",
  "Technology","Hope","Magic","Illusions","Portals","Danger","Weapons","Animals","Weather","Elements","Nature","The public","Leadership","Fame",
  "Anger","Information"];

//Opening and closing the "How to use Mythic" Modal - lots of help from this tutorial 
//https://www.w3schools.com/howto/howto_css_modals.asp

// get how to section modal elements
let howToModal = document.getElementById('how-to-modal');
let howToBtn = document.getElementById('how-to-btn');
let closeHowTo = document.getElementById('close-how-to');


//open how to modal
howToBtn.onclick = function() {
  howToModal.style.display = "initial";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
};

//close how to modal
closeHowTo.onclick = function() {
  howToModal.style.display = "none";
  document.body.style.backgroundColor = "initial";
};

// Tabs

// declare variables - tab buttons and content of the tabs
// each tab uses the same black window to display text in the 'display box'.
let tablinks = document.getElementsByClassName('tablink');
let tabcontent = document.getElementsByClassName("tabcontent");
let journalContent = document.getElementById('journal');
let listsContent = document.getElementById('list');
let displayBox = document.getElementById('text-display');

// set initial display - oracle tab open and journal and lists are closed
journalContent.style.display = "none";
listsContent.style.display = "none";

// closing display when another button is clicked
function cancel(){
  displayBox.innerHTML = "";
}

//Open tab - close other tab and remove active class. add active class to new tab
function openTab(evt, tabName) {
  cancel(); //close displaybox text
  for(let i = 0; i < tabcontent.length; i++){
    tabcontent[i].style.display = "none"; // close all tabs display
  }
  for (i = 0; i < tablinks.length; i++) {
  tablinks[i].className = tablinks[i].className.replace("active", ""); //remove active class 
  } 
  document.getElementById(tabName).style.display = "block";//open tab with active class name
  evt.currentTarget.className += " active";
}

/*Chaos Number 
the chaos number can go from 1 to 9. a higher chaos number influences answers to yes/no questions and to the 
likelyhood of random events occuring. At level 9 there is an animation to highlight the danger of the chaos being this high.*/
let chaosNumberDisplay = parseInt(document.getElementById("chaos-number").textContent);
let chaosPrev = document.getElementById('chaos-prev');
let chaosNext = document.getElementById('chaos-next');

//previous button
chaosPrev.onclick = function() {
  if(chaosNumberDisplay > 1){
    chaosNumberDisplay -= 1;
  document.getElementById("chaos-number").innerHTML = `${chaosNumberDisplay}`;
  }
  if(chaosNumberDisplay < 9){
    document.getElementById("chaos-number").classList.remove("chaos-red");
    document.getElementById("chaos-txt").classList.remove("chaos-red");
  }
};

//next button
chaosNext.onclick = function() {
  if(chaosNumberDisplay < 9){
    chaosNumberDisplay += 1;
  document.getElementById("chaos-number").innerHTML = `${chaosNumberDisplay}`;
  }
  if(chaosNumberDisplay == 9){
    document.getElementById("chaos-number").classList.add("chaos-red");
    document.getElementById("chaos-txt").classList.add("chaos-red");
  }
};

/*scene button 
 the scene button is used at the start of a scene to see if anything is altered or interrupted.
it will generate a number and compare against the chaos number. below is fine. above will change the
scene depending on the number being odd or even. odd is altered. even is interrupted and will include a variable from the eventFocus array.*/
let sceneGenerateButton = document.getElementById("scene-btn");

sceneGenerateButton.onclick = function() {
  cancel(); // closes display of any other text in the window
  let randomInt = Math.floor(Math.random() * 10); // a number to compare against chaos number. 
  
  if (randomInt > chaosNumberDisplay){
    displayBox.innerHTML = "<h3 class='word'>unmodified</h3>"; //below means no change
  } else if(randomInt % 2 == 0){
    let randomIntFocus= (Math.floor(Math.random() * 11)); // this number is to pick a random variable from the event focus array.
    let eventFocusValue = eventFocus[randomIntFocus];
    let npcFocus = npcArray[Math.floor(Math.random() * npcArray.length)]; //if there are any variables in this array it will choose one at random
    let threadFocus = threadArray[Math.floor(Math.random() * threadArray.length)]; //if there are any variables in this array it will choose one at random
    if(randomIntFocus < 5 || npcArray.length === 0 || threadArray.length === 0) {
      displayBox.innerHTML = `<h3 class='word'>Scene interrupted</h3><h3 class='word'>${eventFocusValue}</h3>`;
    } else if (randomIntFocus < 8){
      displayBox.innerHTML = `<h3 class='word'>Scene interrupted</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${npcFocus}</h3>`;
    } else {
      displayBox.innerHTML = `<h3 class='word'>Scene interrupted</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${threadFocus}</h3>`;
    }
  } else {
      displayBox.innerHTML = "<h3 class='word'>Scene Altered</h3>";
  }
};

// question fate button
// form a yes/no question. Set the odds of the answer being yes.
// variables
let questionButton = document.getElementById('question-btn');
let oddsBox = document.getElementById('odds-modal');
let oddsButton = document.getElementById('set-odds-button');
let chaosNumber = parseInt(document.getElementById("chaos-number").textContent) - 1; 

// display the odds selector modal - help from this tutorial - https://www.w3schools.com/howto/howto_js_quotes_slideshow.asp
questionButton.onclick = function() {
  cancel(); //close previous display if any 
  oddsBox.style.display = "flex";
};

// close odds selector value 
window.onclick = function(event) {
  if (event.target == oddsBox) {
    oddsBox.style.display = "none";
  }
};

//text slider for odds div
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

//display odds text
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("odds-slider");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

/*fate chart functions
// the fate chart is a reference from the source material book. Information about it can be found in the readme file. 
it essentially compares a dice roll with an odds table and the chaos number to see the outcome of a yes/no question.*/

//this funciton gets the inner html of the text slider on the odds modal window as a string to be used in the next funciton.
function getOddsValue(n) {
  var slides = document.getElementsByClassName("odds-slider");
  let oddsValues = document.getElementsByClassName("odds-value");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  if (slideIndex === 1) {
    return(oddsValues[n-1].innerHTML);
  } else
  return(oddsValues[n-1].innerHTML);
}

/*this funciton links an array of numbers that represent the odds of the outcome coming out as a yes with the string taken from previous function.
each array has nine numbers that are connected with the current chaos number.*/
let oddIs;
function generatOddsValue() {
  if (getOddsValue(slideIndex) === "50/50"){
    oddIs = [10, 15, 25, 35, 50, 65, 75, 85, 95];
  } else if (getOddsValue(slideIndex) === "Somewhat likely"){
    oddIs = [20, 25, 45, 50, 65, 80, 85, 90, 95];
  }else if (getOddsValue(slideIndex) === "likely"){
    oddIs = [25, 35, 50, 55, 75, 85, 90, 95, 100];
  }else if (getOddsValue(slideIndex) === "Very likely"){
    oddIs = [45, 50, 65, 75, 85, 90, 95, 95, 105];
  }else if (getOddsValue(slideIndex) === "Near sure thing"){
    oddIs = [50, 55, 75, 80, 90, 95, 95, 100, 115];
  }else if (getOddsValue(slideIndex) === "A sure thing"){
    oddIs = [55, 65, 80, 85, 90, 95, 95, 110, 125];
  }else if (getOddsValue(slideIndex) === "Has to be"){
    oddIs = [80, 85, 90, 95, 95, 100, 100, 130, 145];
  }else if (getOddsValue(slideIndex) === "Unlikely"){
    oddIs = [5, 10, 15, 20, 35, 50, 55, 75, 90];
  }else if (getOddsValue(slideIndex) === "Very unlikely"){
    oddIs = [5, 5, 10, 15, 25, 45, 50, 65, 85];
  }else if (getOddsValue(slideIndex) === "Impossible"){
    oddIs = [-20, 0, 0, 5, 5, 10, 15, 25, 50];
  }
}

/*This function imitates the dice roll and generates the answer to the question. 
yes is below and up to the number and no is after the number. 
the lower 1/5 of the number is exceptional yes, the upper 1/5 of the number is exceptional no
you can get the lower 1/5 by dividing by 5. the upper 1/5th by dividing by 5 and adding 81 to the answer.
(first 4/5 of 100 = 0 - 80 & last 1/5th is 81-100)
The higher the chaos number the higher the likelyhood of a yes answer
for the purpose of validating if outcome is correct - the random number is printed to console.
if the number is divisible by 11 then a a different funciton will be called. this funciton will give the answer and also generate
a random event with a focus. */

function generateAnswer(){
  var randomInt = (Math.floor(Math.random() * 100 +1 ));
  if(randomInt % 11 == 0 && (randomInt / 11) < (chaosNumber +1)){
    randomEventAnswer();
  } else {
    if (randomInt <= (oddIs[chaosNumber]) && randomInt < (oddIs[chaosNumber] / 5)){
      displayBox.innerHTML = "<h3 class='word'>yes</h3><h3 class='word'>Exceptional</h3>";
    } else if (randomInt <= (oddIs[chaosNumber])) {
      displayBox.innerHTML = "<h3 class='word'>Yes</h3>";
    } else if (randomInt > (oddIs[chaosNumber]) && randomInt >= (oddIs[chaosNumber] / 5 + 81)){
      displayBox.innerHTML = "<h3 class='word'>No</h3><h3 class='word'>Exceptional</h3>";
    } else {
      displayBox.innerHTML = "<h3 class='word'>No</h3>";
    }
  }
}

/*this funciton is quite verbose as it needs to account for what value is selected from the eventFocus array.
It has to account for having an additional npc focus or an additional thread focus or having no additional focus beyond the eventFocus array.*/

function randomEventAnswer() {
  let randomIntFocus= (Math.floor(Math.random() * 11));
  let eventFocusValue = eventFocus[randomIntFocus];
  let npcFocus = npcArray[Math.floor(Math.random() * npcArray.length)];
  let threadFocus = threadArray[Math.floor(Math.random() * threadArray.length)];
  let randomInt = (Math.floor(Math.random() * 100 +1 ));
  // no additional variables
  if(randomIntFocus < 5 || npcArray.length === 0 || threadArray.length === 0) {
    if (randomInt <= (oddIs[chaosNumber]) && randomInt < (oddIs[chaosNumber] / 5)){
      displayBox.innerHTML = `<h3 class='word'>yes</h3><h3 class='word'>Exceptional</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3>`;
    }else if (randomInt <= (oddIs[chaosNumber])) {
      displayBox.innerHTML = `<h3 class='word'>Yes</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3>`;
    }else if (randomInt > (oddIs[chaosNumber]) && randomInt >= (oddIs[chaosNumber] / 5 + 81)){
    displayBox.innerHTML = `<h3 class='word'>No</h3><h3 class='word'>Exceptional</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3>`;
    }else {
    displayBox.innerHTML = `<h3 class='word'>No</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3>`;
    }
    // with additional npcArray variable 
  }else if (randomIntFocus < 8) {
    if (randomInt <= (oddIs[chaosNumber]) && randomInt < (oddIs[chaosNumber] / 5)){
      displayBox.innerHTML = `<h3 class='word'>yes</h3><h3 class='word'>Exceptional</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${npcFocus}</h3>`;
    }else if (randomInt <= (oddIs[chaosNumber])) {
      displayBox.innerHTML = `<h3 class='word'>Yes</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${npcFocus}</h3>`;
    }else if (randomInt > (oddIs[chaosNumber]) && randomInt >= (oddIs[chaosNumber] / 5 + 81)){
    displayBox.innerHTML = `<h3 class='word'>No</h3><h3 class='word'>Exceptional</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${npcFocus}</h3>`;
    }else {
    displayBox.innerHTML = `<h3 class='word'>No</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${npcFocus}</h3>`;
    }
    //with an additional threadArray variable
  }else {
    if (randomInt <= (oddIs[chaosNumber]) && randomInt < (oddIs[chaosNumber] / 5)){
      displayBox.innerHTML = `<h3 class='word'>yes</h3><h3 class='word'>Exceptional</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${threadFocus}</h3>`;
    }else if (randomInt <= (oddIs[chaosNumber])) {
      displayBox.innerHTML = `<h3 class='word'>Yes</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${threadFocus}</h3>`;
    }else if (randomInt > (oddIs[chaosNumber]) && randomInt >= (oddIs[chaosNumber] / 5 + 81)){
    displayBox.innerHTML = `<h3 class='word'>No</h3><h3 class='word'>Exceptional</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${threadFocus}</h3>`;
    }else {
    displayBox.innerHTML = `<h3 class='word'>No</h3><h3 class='word'>Random Event</h3><h3 class='word'>${eventFocusValue}</h3><h3 class='word'>${threadFocus}</h3>`;
    }
  }
}
  
// to display the output text in emulator window
oddsButton.onclick = function() {
  generatOddsValue();
  generateAnswer();
  oddsBox.style.display = "none";
}; 

// generating events
//event button 

let eventButton = document.getElementById('event-btn');

//event meaning: Action array

  /*this funciton will take a random word from eventMeaning and EventSubject array, and display them on the display box when
  event button is clicked*/
eventButton.onclick = function(){
  cancel();
  var randomIntAction = (Math.floor(Math.random() * 100 +1 ));
  var action = eventAction[randomIntAction];
  var randomIntSubject = (Math.floor(Math.random() * 100 +1 ));
  var subject = eventSubject[randomIntSubject];
  displayBox.innerHTML = `<h3 class = 'word'>${action}</h3><h3 class = 'word'>${subject}</h3>`;
};

//scene tab script 

let addSceneButton = document.getElementById('add-scene-btn');
let sceneWindow = document.getElementById('scene-window');

//create new scene div
addSceneButton.onclick = function() {
  addScene();
};

// this function creates a simple div that the user can input text into. It is scrollable as is the display window to accomadate for many divs being added.
function addScene() {
  var inputOne = document.createElement('input'); // for the title of the div
  inputOne.setAttribute("type", "text");
  inputOne.setAttribute("placeholder", "scene#" );
  inputOne.setAttribute("maxlength", "15");
  inputOne.setAttribute("size", "5");
  var inputTwo = document.createElement('textarea'); // for the main text body of the div
  inputTwo.setAttribute("placeholder", "scene text ..." );
  var scene = document.createElement('div');
  scene.className = ('scene-box');
  scene.appendChild(inputOne);
  scene.appendChild(inputTwo);
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "scene-close";
  span.appendChild(txt);
  scene.appendChild(span);
  sceneWindow.appendChild(scene);
  // to delete the div
  for (i = 0; i < sceneCloseBtn.length; i++) {
    sceneCloseBtn[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
// close the scene div
let sceneCloseBtn = document.getElementsByClassName('scene-close');
var i;
for (i = 0; i < sceneCloseBtn.length; i++) {
  sceneCloseBtn[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

/*list tab script - help from this tutorial - https://www.w3schools.com/howto/howto_js_todolist.asp
list tab essentially contains two "to do" style lists. one for characters and one for threads.*/

// close button for list items
let closeList = document.getElementsByClassName("close");
var i;
for (i = 0; i < closeList.length; i++) {
  closeList[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// add to the character list
//click
let charAddBtn = document.getElementById("character-btn");
charAddBtn.addEventListener("click", addChar);
//on enter
document.getElementById("char-input").addEventListener("keydown", function(event){
  if(event.key === "Enter"){
    addChar();
  }
});

let npcArray = []; //values typed in by user get stored in an array to be used by oracle tab
// this will add the input from the user to the character/group list
function addChar() {
  var li = document.createElement("LI");
  var inputValue = document.getElementById("char-input").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue.match(/[0-9a-zA-z]/g)) { // input validation
    npcArray.push(inputValue);
    document.getElementById("char-ul").appendChild(li);
  } else {
    alert("You must write something!");
  }
  document.getElementById("char-input").value = "";
  // add close button to input 
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  // delete list and from array 
  for (i = 0; i < closeList.length; i++) {
    closeList[i].onclick = function() {
      var div = this.parentElement;
      var value = this.parentElement.firstChild.textContent; 
      var index = npcArray.indexOf(value);
      npcArray.splice(index, 1);
      div.style.display = "none";
    };
  }
}



// add to the thread list 
//click
let threadAddBtn = document.getElementById("thread-btn");
threadAddBtn.addEventListener("click", addThread);
// on enter 
document.getElementById("thread-input").addEventListener("keydown", function(event){
  if(event.key === "Enter"){
    addThread();
  }
});

//user input stored in array to be used in oracle tab
let threadArray = [];
//this function will add the user input to a list to be displayed in emulator window
function addThread() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("thread-input").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t); 
  if (inputValue.match(/[0-9a-zA-z]/g)) { //input validation
    threadArray.push(inputValue); //add to array
    document.getElementById("thread-ul").appendChild(li);
  } else {
    alert("You must write something!");
  }
  document.getElementById("thread-input").value = "";
  // close button
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  // delete list and remove value from array 
  for (i = 0; i < closeList.length; i++) {
    closeList[i].onclick = function() {
      var div = this.parentElement;
      var value = this.parentElement.firstChild.textContent;
      var index = threadArray.indexOf(value);
      threadArray.splice(index, 1);
      div.style.display = "none";
    };
  }
}




