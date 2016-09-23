var y_margin = 50;
var x_margin = 50;
var y_padding = 100;
var row_height = 40;
var bar_height = 10
var bar_width = 300;
var table_width = 1100;

function setup() {
    createCanvas(windowWidth, 2000);
    loadTable('data/mean-gov-gini.csv', 'csv', 'header', showData);
}

function showData(data) {
    var num_rows = data.getRowCount();

    // title
    fill(0, 0, 0);
    textSize(24);
    text('Does Good Governance Reduce Inequality in Sub-Saharan Africa?', x_margin + 5, 15, table_width, 100);
    
    // headers
    fill(0, 0, 0);
    textSize(12);
    textStyle(BOLD);
    textAlign(LEFT);    
    text('Country', x_margin + 5, 73, 100, 100);
    text('Good Governance (Mean) 2004 – 2014', x_margin + 280, 73, 300, 100);
    text('Gini (Mean) 1914 – 2011', x_margin + 730, 73, 200, 100);
    
    // annotations
    textStyle(NORMAL);
    textAlign(LEFT);
    fill(0, 0, 0, 150);
    text('In order of Good Governance', x_margin + 5, 115, 400, 100);    
    text('-2.5', x_margin + 280, 115, 100, 100);
    text('0', x_margin + 730, 115, 100, 100);
    textAlign(CENTER);
    text('0', x_margin + 382, 115, 100, 100);
    textAlign(RIGHT);
    text('2.5', x_margin + 483, 115, 100, 100);
    text('1', x_margin + 935, 115, 100, 100);    
    
    // dividers
    stroke(0, 0, 0, 25);
    line(x_margin, y_margin + 51 , x_margin + table_width, y_margin + 51);
    line(x_margin, y_margin + 8, x_margin + table_width, y_margin + 8);
    
    // loop to display content
    for (var i = 0; i < num_rows; i++) {

        var country = data.getString(i, 0);
        var gov = data.getNum(i, 1).toFixed(2);
        var gini = data.getNum(i, 2).toFixed(2);

        // rank and country
        noStroke();
        fill(0, 0, 0);
        textStyle(NORMAL)
        textAlign(LEFT);
        text(i + 1 + ".", x_margin + 5, y_margin + y_padding + multiplier(i) + 4, 20, 20);
        textAlign(LEFT);
        text(country, x_margin + 36, y_margin + y_padding + multiplier(i) + 4, 200, 20);
        
        // gov backbar
        fill(0, 0, 0, 15);
        rect(x_margin + 280, y_margin + y_padding + multiplier(i) + 6, bar_width, bar_height);
        
        // gov frontbar
        if (gov > 0) {
            fill(100, 100, 200);
            rect(x_margin + 430, y_margin + y_padding + multiplier(i) + 6, gov / 2.5 * bar_width / 2, bar_height);
        } else {
            fill(255, 70, 70);
            rect(x_margin + 430 + (gov / 2.5 * bar_width / 2), y_margin + y_padding + multiplier(i) + 6, gov / 2.5 * bar_width / 2, bar_height);
        }
        
        // gov value
        textAlign(RIGHT);
        text(gov, x_margin + 625, y_margin + y_padding + multiplier(i) + 4, 0, 20);
      
        // gini backbar
        fill(0, 0, 0, 15);
        rect(x_margin + 730, y_margin + y_padding + multiplier(i) + 6, bar_width, bar_height);
        
        // gini frontbar
        fill(255 - (gini / 100 * 255));
        rect(x_margin + 730, y_margin + y_padding + multiplier(i) + 6, gini / 100 * bar_width, bar_height);
        
        // gini value
        textAlign(RIGHT);
        text((gini / 100).toFixed(2), x_margin + 1075, y_margin + y_padding + multiplier(i) + 4, 0, 20);
    
        // lines
        stroke(0, 0, 0, 15);
        line(x_margin, y_margin + y_padding + multiplier(i) - 9, x_margin + table_width, y_margin + y_padding + multiplier(i) - 9);
        stroke(0, 0, 0, 100);
        line(x_margin + 430, y_margin + multiplier(i) + 98, x_margin + 430, y_margin + multiplier(i) + 124);
        line(x_margin + 730, y_margin + multiplier(i) + 98, x_margin + 730, y_margin + multiplier(i) + 124);
    }
    
    // add last line
    stroke(0, 0, 0, 15); 
    line(x_margin, y_margin + y_padding + multiplier(num_rows) - 9, x_margin + table_width, y_margin + y_padding + multiplier(i) - 9);
}   

function multiplier(i) {
    return i * row_height;
}