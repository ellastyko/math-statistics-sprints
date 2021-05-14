
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

$(document).ready(function() {

    $('form').submit((e) => {
        e.preventDefault()
        console.log($('#sample-1').val())
        console.log($('#sample-2').val())

        let request = {
            type: 'task01',
            data: {
                A: $('#sample-1').val(),
                B: $('#sample-2').val()
            }         
        }
        post('http://127.0.0.1:5000/api/solving', request)
        .then(data => {
            console.log(data)
        })


        
    })
    

})


