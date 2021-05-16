

let th = ['Sample', 'Frequency', 'Accumulated frequencies', 'Relative frequencies', 'Cumulative relative frequencies']

function createTable(data) {

    $('.result').empty()
    
    for (let j = 0; j < 2; j++) {
        $('.result').append(`<table id='${j}'></table><tr>`)

        for (n of th) 
            $(`.result #${j}`).append(`<th>${n}</th>`)
        
        for (i in data.sample[j]) {
            $(`.result #${j}`)
            .append(`</tr>
                    <tr>
                        <td>${data.sample[j][i]}</td>
                        <td>${data.freq[j][i]}</td>
                        <td>${data.acc_freq[j][i]}</td>
                        <td>${Number(data.rel_freq[j][i]).toFixed(3)}</td>                  
                        <td>${Number(data.cum_rel_freq[j][i]).toFixed(3)}</td>
                    </tr>`)
        }
    }
    // Scrolling to result
    var offset = $(".result").offset();
    $('html, body').animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
    }, 1000);
}   


$(document).ready(function() {


    $('form').submit((e) => {

        e.preventDefault()
        $('.result').show()
        
        let request = {
            type: 'task01',
            data: {
                A: $('#sample-1').val(),
                B: $('#sample-2').val()
            }         
        }
        post('http://127.0.0.1:5000/api/solving', request)
        .then(data => {

            if (data.type != 'result') 
                return 0
            createTable(data.data)    
        })
    })
    

})


