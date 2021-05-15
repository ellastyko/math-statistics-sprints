
async function post(url, data) {
    const response = await fetch(url, { 
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
    )
    const json = await response.json()

    return json
}

let th = ['Sample', 'Frequency', 'Accumulated frequencies', 'Relative frequencies', 'cumulative relative frequencies']

function createTable(data) {

    // $('form').css({'padding-top': '50px'})

    $('.result-block').empty()
    $('.result-block').append('<table></table><tr>')
    for (i of th) {
        $('.result-block table').append(`<th>${i}</th>`)
    }
    for (i in data.sample) {
        $('.result-block table')
        .append(`</tr>
                <tr>
                    <td>${data.sample[i]}</td>
                    <td>${data.freq[i]}</td>
                    <td>${data.acc_freq[i]}</td>
                    <td>${Number(data.rel_freq[i]).toFixed(3)}</td>                  
                    <td>${Number(data.cum_rel_freq[i]).toFixed(3)}</td>
                </tr>`)
    }

}   


$(document).ready(function() {

    $('form').submit((e) => {
        
        e.preventDefault()

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


