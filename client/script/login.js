let startClicked = 0
let registerForm = false

$(document).ready(function () {
    $('#signForm').hide()
    $('#registerForm').hide()
})

$(document).on('click', '#backToLogin', function(e) {
    e.preventDefault()
    $('#signForm').removeClass('slideOutLeft')
    $('#signForm').addClass('slideInLeft')
    $('#registerForm').addClass('slideOutLeft')
    $('#registerForm').removeClass('slideInLeft')
    startClicked = 1
    registerForm = false
    setTimeout(function(){ $('#registerForm').toggle(); setTimeout(function(){ $('#signForm').toggle(); }, 500)}, 500)
})

$(document).on('click', '#toRegister', function(e) {
    e.preventDefault()
    registerForm = true
    $('#signForm').addClass('slideOutLeft')
    $('#signForm').removeClass('slideInLeft')
    $('#registerForm').removeClass('slideOutLeft')
    $('#registerForm').addClass('slideInLeft')
    startClicked = 0
    setTimeout(function(){ $('#signForm').toggle(); setTimeout(function(){ $('#registerForm').toggle(); }, 500)}, 500)
})

$(document).on('click', '#startButton', function(e) {
    e.preventDefault()
    if(registerForm){
        $('#registerForm').addClass('slideOutLeft')
        $('#registerForm').removeClass('slideInLeft')
        registerForm = false
        setTimeout(function(){ $('#registerForm').toggle(); }, 500)
    } else {
    if (startClicked%2==0) {
        $('#signForm').removeClass('slideOutLeft')
        $('#signForm').addClass('slideInLeft')
    } else {
        $('#signForm').addClass('slideOutLeft')
        $('#signForm').removeClass('slideInLeft')
    }
    startClicked++
    setTimeout(function(){ $('#signForm').toggle(); }, 500)
}
})

$(document).on('click', '#signInButton', function(e) {
    e.preventDefault()
    let data = {
        email: $('#loginEmail').val(),
        password: $('#loginPass').val()
    }
    // alert(data.password)
    login(data)
})

$(document).on('click', '#registerButton', function(e) {
    e.preventDefault()
    let data = {
        email: $('#registerEmail').val(),
        password: $('#registerPass').val()
    }
    register(data)
})

function login(data) {
    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: data,
        success: function (result) {
            localStorage.setItem('token', result)
        },
        fail: function(err) {
            console.log(err)
        }
    })
}

function register(data) {
    $.ajax({
        url: 'http://localhost:3000/',
        method: 'post',
        data: data,
        success: function (result) {
            localStorage.setItem('token', result)
        },
        fail: function(err) {
            console.log(err)
        }
    })
}

function googleSignIn(data) {
    $.ajax({
        url: 'http://localhost:3000/googleSignIn',
        method: 'post',
        data: data,
        success: function (result) {
            localStorage.setItem('token', result)
        },
        fail: function(err) {
            console.log(err)
        }
    })
}