$(document).ready(function () {
    requestToServer('IsAdmin', 'get', '', (isAdmin) => {
        if (isAdmin) {
            window.location.href = ClientUrl + '/admin'
        } else {
            requestToServer('IsLogin', 'get', '', (userFullName) => {
                if (userFullName) {
                    window.location.href = ClientUrl + '/user'
                }
            })
        }
    })
});

function closePopup() {
    setTimeout(() => {
        $('#popup').addClass('hidden');
    }, 200);
    $('#popup .popup-body').removeClass('fade-in');
}
function openPopup() {
    $('#popup').removeClass('hidden');
    setTimeout(() => {
        $('#popup .popup-body').addClass('fade-in');
    }, 50);
}

function createAccount() {
    let title = $('#select_title').val();
    let firstName = $('#txt_firstName').val();
    let lastName = $('#txt_lastName').val();
    let phoneNumber = $('#txt_phoneNumber').val();
    let email = $('#txt_email').val();
    let gender = $('#select_gender').val();
    let birthday = $('#txt_birthday').val();
    let city = $('#select_city').val();
    let address = $('#txt_address').val();
    let username = $('#txt_username').val();
    let password = $('#txt_password').val();
    let confirmPassword = $('#txt_confirm_password').val();
    let occupation = $('#select_occupation').val();
    let terms = $('#chk_terms').is(':checked');

    if (!title) {
        showMessage('please select your title.'); return;
    }
    if (!firstName) {
        showMessage('please enter your first name.'); return;
    }
    if (!lastName) {
        showMessage('please enter your last name.'); return;
    }
    if (!phoneNumber) {
        showMessage('please enter your phone number.'); return;
    }
    if (!email) {
        showMessage('please enter your email.'); return;
    }
    if (!gender) {
        showMessage('please select your gender.'); return;
    }
    if (!birthday) {
        showMessage('please enter your birthday.'); return;
    }
    if (!city) {
        showMessage('please select your city.'); return;
    }
    if (!address) {
        showMessage('please enter your address.'); return;
    }
    if (!username) {
        showMessage('please enter your username.'); return;
    } else {
        if (username.length < 8 || !/^[a-zA-Z_]+$/.test('username')) {
            showMessage('please enter valid username.'); return;
        }
    }
    if (!password) {
        showMessage('please enter your password.'); return;
    } else {
        if (password.length < 8 || !(/[A-Z]+/.test(password) && /.*\d+.*/.test(password))) {
            showMessage('please enter valid password.'); return;
        }
    }
    if (!confirmPassword) {
        showMessage('please enter password confirm.'); return;
    } else {
        if (confirmPassword != password) {
            showMessage('password and its confirm not match.'); return;
        }
    }
    if (!occupation) {
        showMessage('please enter your occupation.'); return;
    }
    if (!terms) {
        showMessage('please accept our terms and conditions.'); return;
    }

    let obj = {
        username,
        title,
        firstName,
        lastName,
        phoneNumber,
        email,
        gender,
        birthday,
        city,
        address,
        password,
        occupation,
    }

    requestToServer('CreateUser', 'post', obj, (result) => {
        if (result == "ok") {
            showMessage("Account created successfuly, you can now login.")
        } else {
            showMessage("Account created failed.")
        }
    })
}