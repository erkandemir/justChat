var socket = io();
sendMsg = function()
{
    var usrMessage = document.getElementById("inputMessage").value;
    if(usrMessage.length > 0) {
        socket.emit('chat_message', usrMessage);
        document.getElementById("inputMessage").value = '';
    }
    return false;
};


socket.on('chat_message', function(msg) {
    var c_count = msg.split("~")[1];
    var text = msg.split("~")[0];
    if(c_count > 2)
        return;
    document.getElementById('messageContentArea').innerHTML += getMessageRow(text);
    window.scrollTo(0, document.body.scrollHeight);
});


getMessageRow = function(userMessage, c_count)
{
    var msg  = '';
    var avatar = '<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" style="width: 45px; height: 100%;">';
    if(c_count % 2 != 0) {
        avatar = '<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" style="width: 45px; height: 100%;">';
    msg += '<div class="d-flex flex-row justify-content-start mb-4">';
    msg += avatar;
    msg += '<div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">';
    msg += '<p class="small mb-0">' + userMessage + '</p>';
    msg += '</div>';
    msg += '</div>';
    }
    else{
        msg += '<div class="d-flex flex-row justify-content-start mb-4">';
        msg += '<div class="p-3 ms-3" style="border-radius: 15px; background-color: #fbfbfb;">';
        msg += '<p class="small mb-0">' + userMessage + '</p>';
        msg += '</div>';
        msg += avatar;
        msg += '</div>';
    }

    return msg;
}