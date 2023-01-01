
var ServerUrl = "https://localhost:7098/Mokalamat/";
var ClientUrl = "http://localhost/HwSite";

function requestToServer(url, type, data, onSuccess) {
    data = type.toLowerCase() == 'get' ? '' : JSON.stringify(data);
    let token = getCookie('myToken')
    $.ajax({
        url: ServerUrl + url,
        method: type,
        data: data,
        crossDomain: true,
        contentType: "application/json",
        headers: { myToken: token },
        error: function (result) {
            showMessage(result.Message);
        },
        success: function (result) {
            if (typeof onSuccess == 'function') {
                onSuccess(result)
            }
        }
    });
}


function setCookie(name, value, minutes) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


function showMessage(message) {
    alert(message);
}

function confirmMessage(message, onOk, onCancel) {
    if (confirm(message)) {
        if (typeof onOk != 'undefined') {
            onOk();
        }
    } else {
        if (typeof onCancel != 'undefined') {
            onCancel();
        }
    }
}

function readInput(message, onVal) {
    let value = prompt(message)
    if (value) {
        if (typeof onVal != 'undefined') {
            onVal(value);
        }
    }
}

function logout() {

    requestToServer('Logout', 'get', '', () => {
        setCookie('myToken', null);
        window.location.href = ClientUrl;
    })
}