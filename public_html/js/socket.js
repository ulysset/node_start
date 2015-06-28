/* CONNECTION TO socket.io */
//var socket = io.connect('http://141.138.157.108:4445');//Online
var socket = io.connect('http://localhost:4445');//Offline

function envoyerMessage(){
    var msg = document.getElementById("input").value;
    document.getElementById('input').value="";
    
    socket.emit("nouveauMsg", msg);
}

socket.on("reponse", function(data){
   document.getElementById('messages').innerHTML += "<p>" + data + "</p>";
});

function envoyerMessagePrive(){
    var msg = document.getElementById("input").value;
    document.getElementById('input').value="";
    
    socket.emit("msgPrive", msg);
}

socket.on("reponsePrivee", function(data){
   document.getElementById('messages').innerHTML += "<p>" + data + "</p>";
});