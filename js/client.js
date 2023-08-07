const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = '<div class="loading-text">Connecting...</div>';
document.body.appendChild(loadingScreen);

const socket =io('https://webchat-backend-dt52.onrender.com');

socket.on('connect', () => {
    loadingScreen.remove();
});

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msgipt');
const memberbox = document.querySelector('.showmember') 
const memberbox1 = document.querySelector('.sideb') 

const messageContainer = document.querySelector('.container') 
var audio = new Audio('chattone.mp3');
var audio0 = new Audio('sentmessage.mp3');

function delay(){
    var popup = document.getElementById("myPopup");
  popup.classList.remove("show");
}

function myFunction() {
    // Get the text field
    var copyText = "https://aniket0332.github.io/webchat/";
  
    // Select the text field
     // For mobile devices
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
    
    // Alert the copied text
    var popup = document.getElementById("myPopup");
  popup.classList.add("show");
  setTimeout(delay, 2000);
  }

const append = (message, position, users)=>{

    if(position!='member')
   {const messageElement = document.createElement('div');
   messageElement.innerText = message;
   messageElement.classList.add('message');
   messageElement.classList.add(position);
   messageContainer.append(messageElement);
   if(position=='left')
   {audio.play();}
   else if(position=='right')
   {audio0.play();}
}



if(position=='member')
{  while (memberbox.hasChildNodes()) {
    memberbox.removeChild(memberbox.firstChild);
  } 
    for(let i in users)
    {
        const messageElement0 = document.createElement('div');
    messageElement0.innerText = `• `+users[i];
        messageElement0.classList.add('mem');

        memberbox.append(messageElement0);
}

while (memberbox1.hasChildNodes()) {
  memberbox1.removeChild(memberbox1.firstChild);
} 
  for(let i in users)
  {
      const messageElement1 = document.createElement('div');
  messageElement1.innerText = `• `+users[i];
      messageElement1.classList.add('sideb');

      memberbox1.append(messageElement1);
}
}

const el = document.getElementById('00');
if (el) {
  el.scrollTop = el.scrollHeight;
}
}



form.addEventListener(`submit`, (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${ message}`, `right`);
    socket.emit(`send`, message);
    messageInput.value = '';
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);
socket.emit('member-update', '');


socket.on('user-joined', name  =>{
    append(`${name} joined the chat`, 'center')
    socket.emit('member-update', '');
});
socket.on('memberslist', users  =>{
    append(`${name} joined the chat`, 'member',users);
});

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left',`${data.name}`);
});

socket.on('left', name =>{
    append(`${name} left the chat`, 'center')
    socket.emit('member-update', '');
    
})
var state=0;
function toggleNav() {
if(state==0)
{state=1;openNav();}
else {state=0;closeNav();}
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.display = "initial";
  document.getElementById("mySidebar").style.border = "2px solid black";
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "25px";

  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.border = "0";
    document.getElementById("main").style.marginLeft = "0";
    // document.getElementById("mySidebar").style.display = "none";
  }
