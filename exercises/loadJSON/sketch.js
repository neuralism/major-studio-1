function setup() {
    // create a canvas that matches the windowWidth and windowHeight
    createCanvas(windowWidth, windowHeight);
    // load external data source callback
    loadJSON('colors.json', showData);
    textAlign(CENTER);
}

function showData(data) {
    fill(data.yellow);
    text(data.yellow, width / 2, height / 2);
}