$(document).ready(function () {
    requestToServer('IsAdmin', 'get', '', (isAdmin) => {
        if (isAdmin) {
            window.location.href += '/admin'
        } else {
            requestToServer('IsLogin', 'get', '', (userFullName) => {
                if (userFullName) {
                    window.location.href += '/user'
                }
            })
        }
    })
});