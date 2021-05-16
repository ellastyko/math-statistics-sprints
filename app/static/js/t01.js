

let th = ['Sample', 'Frequency', 'Accumulated frequencies', 'Relative frequencies', 'Cumulative relative frequencies']

function createTable(data) {

    console.log(data)
    $('.result').empty()
    
    
    for (let j = 0; j < 2; j++) {
        $('.result').append(`<table id='t${j}'></table><tr>`)

        for (n of th) {
            $(`.result #t${j}`).append(`<th>${n}</th>`)
        }


        for (i in data.sample[j]) {
            $(`.result #t${j}`)
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
    document.querySelector('.result').scrollIntoView(false);
}   


$(document).ready(function() {


    $('form').submit((e) => {

        e.preventDefault()
        document.querySelector('.result').hidden = false
        
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


