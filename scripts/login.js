
$(document).ready(function () {
    requestToServer('IsAdmin', 'get', '', (isAdmin) => {
        if (isAdmin) {
            window.location.href += '../admin'
        } else {
            requestToServer('IsLogin', 'get', '', (userFullName) => {
                if (userFullName) {
                    window.location.href += '../user'
                }
            })
        }
    })
});

function login() {
    let username = $('#txt_username').val();
    let password = $('#txt_password').val();
    if (!username) {
        showMessage('please enter your username.'); return;
    }
    if (!password) {
        showMessage('please enter your password.'); return;
    }
    requestToServer('Login?username=' + username + '&password=' + password, 'get', '', (result) => {
        if (result) {
            setCookie('myToken', result);
            document.location.reload();
        } else {
            showMessage('Bad username or password.'); return;
        }
    })
}
