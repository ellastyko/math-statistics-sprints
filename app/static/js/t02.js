
function histogram(a) {

    var graph = {

        x: a[1],
        y: a[2],
        type: 'bar'
    };
    
    var layout = {
        title: 'Graph of variation series'
    }; 
    Plotly.plot( 'histogram', [graph], layout );
}

function emperical(a) {  

    var graph = {

        x: a[1],
        y: a[4],
        type: 'bar'
    };
    
    var layout = {
        title: 'Empirical graph'
    }; 
    Plotly.plot( 'empirical-graph', [graph], layout );
}

function polygon(a) {


    var graph = {

        x: a[1],
        y: a[2],
        type: 'polygon'
    };
    
    var layout = {
        title: 'Graph of variation series'
    }; 
    Plotly.plot( 'polygon', [graph], layout );
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
        
        if (document.querySelector('.graph-block').hidden == false) {
            $('#empirical').empty()
            Plotly.deleteTraces('histogram', [0, 1]);
            Plotly.deleteTraces('polygon', [0, 1]);
            Plotly.deleteTraces('empirical-graph', [0, 1]);
        }
        document.querySelector('.graph-block').hidden = false
        document.querySelector('.graph-block').scrollIntoView(false);

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


