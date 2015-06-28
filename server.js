/* LIBRAIRIES */
var express = require('express'), //librairie for make path easier
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Disable HTML caracters (equal htmlentities in PHP)
    fs = require('fs');

/* SERVER CONFIG */
app.use(express.static(__dirname + '/public_html'));//all the client part here


/* WHEN SOMEONE IS CONNECTING TO THE SERVER */
io.sockets.on('connection', function (socket) {
        socket.on("nouveauMsg", function(data){
            if(data == "1"){
                socket.join("salon");
                socket.emit("reponse", "Vous êtes connecté au salon privé");
            }
            else if(data == "0"){
                socket.leave("salon");
                socket.emit("reponse", "Vous êtes déconnecté au salon privé");
            }
            
            socket.broadcast.emit("reponse",data);
            socket.emit("reponse",data);
        });
    
    socket.on("msgPrive", function(data){
        io.to("salon").emit("reponsePrivee", data);
});
});

server.listen(4445);
console.log("Serveur ON (localhost:" + 4445 + ")");