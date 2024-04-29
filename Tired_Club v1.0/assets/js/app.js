const baseUrl = 'https://reqres.in/api/';

// ~~~~~~~~~~~~~~~~ API ~~~~~~~~~~~~~~~~ //
function profileService(cb) {
    $.ajax({
        url: baseUrl + 'users/8',
        method: 'GET',
        success: function (res) {
            cb(res);
        },
        error: function (err) {
            console.log('ERR');
        }
    });
}

function loginService(email, password, cbSuccess, cbError) {
    const rawJson = {
        "email": email,
        "password": password
    }

    $.ajax({
        url: baseUrl + 'login',
        method: 'POST',
        data: JSON.stringify(rawJson),
        contentType: 'application/json',
        success: function (res) {
            cbSuccess(res);
        },
        error: function (err) {
            cbError();
        }
    });
}
// ~~~~~~~~~~~~~~~~ API ~~~~~~~~~~~~~~~~ //

function profile() {
    checkAuth();
    const fileImage = document.querySelector('#profileFileImage');
    const title = document.querySelector('#profileTitle');
    const email = document.querySelector('#profileEmail');

    profileService(function (response) {
        fileImage.src = response.data.avatar;
        title.innerText = response.data.first_name + ' ' + response.last_name;
        email.innerText = response.data.email;
    });
}

function login() {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    loginService(email.value, password.value, function (response) {
        console.log(response)
        localStorage.setItem('token', response.token);
        window.location = 'profile.html'
    }, function () {
        alert('Email or Password not correct!')
    });
}

function logout() {
    const status = confirm('Are you sure?');
    if (status) {
        localStorage.removeItem('token');
        window.location = 'index.html';
    }
}

function checkAuth() {
    const token = localStorage.getItem('token');
    if (token === null) {
        window.location = 'login.html';
    }
}