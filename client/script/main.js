$(document).ready(function () {
if (localStorage.getItem('token')) {
    $('#loginDiv').hide()
} else {
    $('#mainPage').hide()
}

    $('#signForm').hide()
    $('#registerForm').hide()
})

function seeMain() {
    $('#loginDiv').removeClass('fadeInUp')
    $('#loginDiv').addClass('fadeOutUp')
    $('#mainPage').removeClass('fadeOut')
    setTimeout(function(){ $('#loginDiv').hide(); $('#mainPage').show() }, 500)
}

function seeLogin() {
    $('#mainPage').addClass('fadeOut')
    $('#loginDiv').removeClass('fadeOutUp')
    $('#loginDiv').addClass('fadeInUp')
    $('#signForm').hide()
    $('#registerForm').hide()
    setTimeout(function(){ $('#loginDiv').show(); $('#mainPage').hide() }, 500)
}

$(document).on('click', '#slotButton', function(e) {
    e.preventDefault()
    let random = Math.round(Math.random())
    $('#slotSpot').removeClass('flipInX')
    $('#slotSpot').addClass('flipOutX')
    $('#favRest').removeClass('slideInUp')
    $('#favRest').addClass('slideOutUp')
    $('#favRec').removeClass('slideInDown')
    $('#favRec').addClass('slideOutDown')
    setTimeout(function(){ 
        $('#slotSpot').hide(); 
        $('#favRest').hide();
        $('#favRec').hide(); 
    }, 1000)
    
    if (2 == 1) {
        // restaurant function
        $('#viewZomato').show()
    } else {
        //recipe function
        $('#viewRecipe').show()
    }
})
