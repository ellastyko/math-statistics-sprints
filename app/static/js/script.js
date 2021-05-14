'use strict';

$(document).ready(function() {

    $(function(){
        $('.main').ripples();
    });
    $('#t01').click(() => {
        document.location.href = 'http://127.0.0.1:5000/t01'
    })
    $('#t02').click(() => {
        document.location.href = 'http://127.0.0.1:5000/t02'
    })
    $('#t03').click(() => {
        document.location.href = 'http://127.0.0.1:5000/t03'
    })
    $('#t04').click(() => {
        document.location.href = 'http://127.0.0.1:5000/t04'
    })
    $('#t05').click(() => {
        document.location.href = 'http://127.0.0.1:5000/t05'
    })

    
});