let th = [  'Expected value(Moment`s method)', 'Variance value(Moment`s method)', 'Deviation value(Moment`s method)', 
            'Expected value(Likelihood`s method)', 'Variance value(Likelihood`s method)', 'Deviation value(Likelihood`s method)']

function createTable(data) {
    $('.result-block').empty()
    $('.result-block').append('<table></table><tr>')
    for (i of th) {
        $('.result-block table').append(`<th>${i}</th>`)
    }
    $('.result-block table').append(`</tr>`)

    for (let j = 0; j < 2; j++) {

        $('.result-block table').append(`<tr>`)
        for (i in data)
            $('.result-block table').append(`<td>${Number(data[i][j]).toFixed(3)}</td>`)
        for (i in data)
            $('.result-block table').append(`<td>${Number(data[i][j]).toFixed(3)}</td>`)
        $('.result-block table').append('</tr>')
    }
}   


$(document).ready(function() {

    $('form').submit((e) => {

        e.preventDefault()

        let request = {
            type: 'task04',
            data: {
                A: $('#sample-1').val(),
                B: $('#sample-2').val()
            }         
        }

        post('http://127.0.0.1:5000/api/solving', request)
        .then(data => {

            if (data.type != 'result') 
                return 0
            console.log(data)
            createTable(data.data)    
        })
    })
})


