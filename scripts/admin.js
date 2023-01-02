$(document).ready(function () {
    requestToServer('IsAdmin', 'get', '', (isAdmin) => {
        if (isAdmin) {
            requestToServer('IsLogin', 'get', '', (userFullName) => {
                $('#username').text(userFullName);
                RefreshTable();
            })
        } else {
            window.location.href = ClientUrl;
        }

    })
});

function RefreshTable() {
    $('#tableBody').empty();
    requestToServer('GetAllUsers', 'get', '', (allUsers) => {
        if (allUsers && allUsers.length) {
            let html = '';
            for (let index = 0; index < allUsers.length; index++) {
                const element = allUsers[index];
                html += '<tr>'
                html += '<td>' + element.id + '</td>';
                html += '<td>' + element.username + '</td>';
                html += '<td>' + element.fullName + '</td>';
                html += '<td>' + element.phone + '</td>';
                html += '<td>' + element.birthday + '</td>';
                html += '<td>' + element.bill + '</td>';
                html += '<td><input type="button" value="Set bill" ' + (element.isAdmin ? 'disabled' : 'onclick=\'setUserBill("' + element.phone + '", "' + element.fullName + '")\'') + '></td>';
                html += '</tr>';
            }
            $('#tableBody').append(html);
        }
    })
}

function setUserBill(phone, name) {
    readInput("Enter " + name + ' bill:', (bill) => {
        requestToServer('SetUserBill?phoneNumber=' + phone + '&bill=' + bill, 'get', '', (date) => {
            if(date){
                showMessage('bill updated successfully');
            }
        })
    });
}