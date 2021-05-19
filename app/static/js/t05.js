let th = [  'Expected value(Central interval)', 'Expected value(Lower interval)', 'Expected value(Upper interval)', 
            'Standart deviation(Central interval)', 'Standart deviation(Lower interval)', 'Standart deviation(Upper interval)']

function createTable(data) {
    $('.result-block').empty()
    $('.result-block').append('<table></table><tr>')
    for (i of th) {
        $('.result-block table').append(`<th>${i}</th>`)
    }
    $('.result-block table').append(`</tr>`)

    console.log(data)

    for (let j = 0; j < 2; j++) {

        $('.result-block table').append(`<tr>`)
        for (i in data['expected-value'][j])
            $('.result-block table').append(`<td>${Number(data['expected-value'][j][i]).toFixed(3)}</td>`)
        for (i in data['standart-deviation'][j])
            $('.result-block table').append(`<td>${Number(data['standart-deviation'][j][i]).toFixed(3)}</td>`)
        $('.result-block table').append('</tr>')
    }
}   



$(document).ready(function() {

    $('form').submit((e) => {

        e.preventDefault()

        let request = {
            type: 'task05',
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




