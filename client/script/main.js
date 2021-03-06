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
    $('#slotSpot').addClass('flipInX')
    $('#slotSpot').removeClass('flipOutX')
    $('#favRest').addClass('slideInUp')
    $('#favRest').removeClass('slideOutUp')
    $('#favRec').addClass('slideInDown')
    $('#favRec').removeClass('slideOutDown')
    setTimeout(function(){ 
        $('#loginDiv').show(); 
        $('#mainPage').hide();
        $('#slotSpot').show(); 
        $('#favRest').show();
        $('#favRec').show(); 
    }, 500)
}

$(document).on('click', '#backHome', function(e) {
    e.preventDefault()
    $('#slotSpot').addClass('flipInX')
    $('#slotSpot').removeClass('flipOutX')
    $('#favRest').addClass('slideInUp')
    $('#favRest').removeClass('slideOutUp')
    $('#favRec').addClass('slideInDown')
    $('#favRec').removeClass('slideOutDown')
    
    setTimeout(function(){ 
        $('#viewZomato').fadeOut();
        $('#slotSpot').show(); 
        $('#favRest').show();
        $('#favRec').show(); 
    }, 500)

})

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
    
    if (1 == 1) {
        // restaurant function
        $('#viewZomato').show()
    } else {
        //recipe function
        $('#viewRecipe').show()
    }
})
