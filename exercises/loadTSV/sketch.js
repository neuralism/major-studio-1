function setup() {
    // create a canvas that matches the windowWidth and windowHeight
    createCanvas(windowWidth, windowHeight);
    // load external data source callback
    loadTable('groceries.tsv', 'tsv', 'header', showData);
    textAlign(CENTER);
}

function showData(data) {
    var count = data.getRowCount();
    /* height is uses the height of the canvas */
    var rowHeight = height / count;
    
    for (var i = 0; i < count; i++) {
        var amount = data.getString(i, 0);
        var unit = data.getString(i, 1);
        var item = data.getString(i, 2);
        var source = data.getString(i, 3);
        
        if (source === 'market')
            fill(0, 255, 0);
        else {
            fill(128);
            // if we had two lines of code
        }
        
        text(amount + ' ' + unit + ' ' + item + ' ' + source, width / 2, rowHeight * (i + 1));
    }
}