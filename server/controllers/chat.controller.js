const db = require("../models");
const Message = db.messages;

module.exports.respond = async function(endpoint,socket){
    console.log("A user connected");
    await Message.find().sort({'_id': -1}).limit(10)
        .then(data => {
            socket.emit('history', data);
        })

    await socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    // registering a new event
    await socket.on('SEND_MESSAGE', (msg) => {
        console.log('Server Received: ' + JSON.stringify(msg));
        const message = new Message ({
            user: msg.user,
            message: msg.message
        });
        message
            .save()
            .then(data => {
                console.log("Message saved to database" + data);
            })
        endpoint.emit('MESSAGE',  msg);
    });
}