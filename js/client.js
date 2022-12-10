const socket =io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msgipt');
const memberbox = document.querySelector('.showmember') 
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
}


}



form.addEventListener(`submit`, (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, `right`);
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