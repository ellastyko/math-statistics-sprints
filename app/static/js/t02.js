
function histogram(a) {

    Plotly.plot('histogram', [{

        x: a[1],
        y: a[2],
        type: 'bar'
    }], {
        title: 'Graph of variation series'
    });
}

function emperical(a) {  
    
    Plotly.plot( 'empirical-graph', [{

        x: a[1],
        y: a[4],
        type: 'bar'
    }], {
        title: 'Empirical graph'
    });
}

function polygon(a) {

    Plotly.plot('polygon', [{

        x: a[1],
        y: a[2],
        type: 'polygon'
    }], {
        title: 'Graph of variation series'
    });
}


function result(data) {

    histogram(data.a)
    histogram(data.b)
    
    $('#empirical').append(data.a[3])
    $('#empirical').append(data.b[3])

    polygon(data.a)
    polygon(data.b)

    emperical(data.a)
    emperical(data.b)
}   


$(document).ready(function() {

    $('form').submit((e) => {

        e.preventDefault()
        // To clear graphs and tables
        if ($('.graph-block').is(":visible") == true) {

            $('#empirical').empty()
            Plotly.deleteTraces('histogram', [0, 1]);
            Plotly.deleteTraces('polygon', [0, 1]);
            Plotly.deleteTraces('empirical-graph', [0, 1]);
        }

        $('.graph-block').show()
        // Scrolling to result
        var offset = $(".graph-block").offset();
        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        }, 1000);

        let request = {
            type: 'task02',
            data: {
                A: $('#sample-1').val(),
                B: $('#sample-2').val()
            }         
        }
        post('http://127.0.0.1:5000/api/solving', request)
        .then(data => {

            if (data.type != 'result') 
                return 0
            result(data.data)    
        })
    })
})


