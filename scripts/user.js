$(document).ready(function () {
    requestToServer('IsLogin', 'get', '', (userFullName) => {
        if (userFullName) {
            $('#username').text(userFullName);
        } else {
            window.location.href = ClientUrl;
        }
    })
});

function checkMyBill() {
    let phoneNumber = $('#txt_phoneNumber').val();
    if (!phoneNumber) {
        showMessage('please enter your phone number.'); return;
    }
    requestToServer('GetMyBill?phoneNumber=' + phoneNumber, 'get', '', (date) => {
        showMessage(date);
    })
}