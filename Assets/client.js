var socket = io();
sendMsg = function()
{
    var usrMessage = document.getElementById("inputMessage").value;
    socket.emit('chat_message', usrMessage);
    document.getElementById("inputMessage").value = '';
    return false;
};


socket.on('chat_message', function(msg) {
    document.getElementById('messageContentArea').innerHTML += getMessageRow(msg);
});


getMessageRow = function(userMessage)
{
    var msg = '<div class="d-flex flex-row justify-content-start mb-4">';
    msg += '<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"';
    msg += 'alt="avatar 1" style="width: 45px; height: 100%;">';
    msg += '<div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">';
    msg += '<p class="small mb-0">' + userMessage + '</p>';
    msg += '</div>';
    msg += '</div>';

    return msg;
}