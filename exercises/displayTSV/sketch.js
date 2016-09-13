var minVal = 10000;
var maxVal = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    noFill();
    textSize(10);
    loadTable("LaborInNonAgricultSector.txt", "tsv", "header", showData);
    colorMode(HSB, 360, 1.0, 1.0);
}

function showData(data) {
    var count = data.getRowCount();
    var rowHeight = 30;
    for (var = 0; row < count; row++) {
        for (col = 3; col < 26; col++) {
            var val = data.getString(row, col);
            val = parseFloat(val);
            if (minVal > val)
                minVal = val;
            if (maxVal < val)
                maxVal = val;
        }
    }
}

console.log("minimum: " + minVal + "| maximum: " + maxVal);

for (row = 0; row < count; row++) {
    beginShape();
    for (var col = 3; col < 26; col++) {
        val = data.getString(row, col);
        val = parseFloat(val);
        vertex(map(col, 3, 25, 0, width), map(val, minVal, maxVal, height, 0));
    }
    endShape();
}