/*
$(function(){
    var socket = io.connect();
    var $loginForm = $('#loginForm');
    var $joinForm = $('#joinForm');
    var roomId = 0; //원래 값 = 1
    var socketId = "";

    
    $loginForm.submit(function (e) {
        e.preventDefault();
        let id = $("#loginId");
        let pw = $("#loginPw");
        if (id.val() === "" || pw.val() === "") {
            alert("check validation");
            return false;
        } else {
            socket.emit('login user', {
                id: id.val(),
                pw: pw.val()
            }, function (res) {
                if (res.result) {
                    alert(res.data);
                    socketId = socket.id;
                    roomId = 1;
                    id.val("");
                    pw.val("");
                    
                } else {
                    alert(res.data);
                    id.val("");
                    pw.val("");
                }
            });
        }
    });

    $joinForm.submit(function (e) {
        e.preventDefault();
        let id = $("#joinId");
        let pw = $("#joinPw");
        if (id.val() === "" || pw.val() === "") {
            alert("check validation");
            return false;
        } else {
            socket.emit('join user', {
                id: id.val(),
                pw: pw.val()
            }, function (res) {
                if (res.result) {
                    alert(res.data);
                    id.val("");
                    pw.val("");
                    $("#loginBtn").click();
                } else {
                    alert(res.data);
                    return false;
                }
            });
        }
    });

});
*/