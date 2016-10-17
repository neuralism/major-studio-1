// pos = part of speech
var rs; // rita string

function setup() {
    noCanvas();
    input = createInput();
    input.changed(rita);
}

function rita() {
    var str = input.value();
    rs = RiString(str);
    var words = rs.words();
    var pos = rs.pos();
    
    // var span = createSpan(words);
    
    for (var i = 0; i < words.length; i++) {
        var span = createElement('span', words[i]);
        if (pos[i] === 'nnp') {
            span.style('background', 'orange');
        }
        
        if (pos[i] === 'fw') {
            span.style('background', 'yellow');
        }
    }
}