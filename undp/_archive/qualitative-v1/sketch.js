var hash = [];
var sorted = [];
var textX = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);
    loadStrings('speech.txt', callback);
}

function callback(poem) {
//    console.log(poem);
    
    for (var i in poem) {
        //console.log(i + ' : ' + poem[i])
    }
    
    for (var i in poem) {
        var li = poem[i].split(' ');
        for (var k in li) {
            var clean = li[k].replace(/[.,-?!@#$%^&*()_~{}]/g, '');
        
            if (hash[clean] >= 1)
                hash[clean] += 1;
            else 
                hash[clean] = 1;
        }
    }
    
    console.log('HASH -----------');
    
    for (i in hash)
        console.log(i + ' : ' + hash[i])
        // console.log(hash[0]); // this numbered index will return 'undefined'

    console.log('HASH SORTTED -----------')
    
    // Sort by frequency
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    
    for (var key in hash)
        sorted.push([key, hash[key]]);   
    
    sorted.sort(function(a, b) {
        a = a[1];
        b = b[1];
        
        return a < b ? 1 : (a > b ? -1 : 0);
    });
    
    for (var i = 0; i < sorted.length; i++)
        console.log(sorted[i][0] + ' : ' + sorted[i][1]);
}

function draw() {
    background(255);
    translate(textX, height/2);

    for (var i = 0; i < sorted.length; i++) {
        var txtSize = sorted[i][1] * 1;
        textSize(txtSize);
        text(sorted[i][0], 0, 0);
        
        var txtWidth = textWidth(sorted[i][0]);
        translate(txtWidth, 0);
        
        if (mouseIsPressed) {
            line(0, txtSize * .25, 0, -txtSize * .75);
        }
    }
}

function mouseDragged() {
    textX += mouseX - pmouseX;
}