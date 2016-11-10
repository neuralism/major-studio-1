var y_margin = 49;
var x_margin = 50;
var y_padding = 100;
var row_height = 40;
var bar_height = 10
var bar_width = 300;
var table_width = 1100 * 2;

var data;
var header;
var body;

var loadStatus = 0;

var buttonGov;
var buttonRegion;
var buttonGini;
var buttonName;

var dataRegion;
var dataGini;
var dataGov;
var dataName;

function setup() {
    noCanvas();
    loadTable('data/data-by-region.csv', 'csv', 'header', regionLoaded);
    loadTable('data/data-by-gini.csv', 'csv', 'header', giniLoaded);
    loadTable('data/data-by-gov.csv', 'csv', 'header', govLoaded);
    loadTable('data/data-by-name.csv', 'csv', 'header', nameLoaded);
      header = new p5(headerCanvas);
}

function regionLoaded(d) {
    loadStatus += 1;
    dataRegion = d;
    checkLoadStatus(loadStatus);
}

function giniLoaded(d) {
    loadStatus += 1;
    dataGini = d;
    checkLoadStatus(loadStatus);    
}

function govLoaded(d) {
    loadStatus += 1;
    dataGov = d;
    checkLoadStatus(loadStatus);    
}

function nameLoaded(d) {
    loadStatus += 1;
    dataName = d;
    checkLoadStatus(loadStatus);    
}

function checkLoadStatus() {
    if (loadStatus >= 4) {
        showData(dataGini);
    }
}

function showData(d) {
    data = d;
    body = new p5(bodyCanvas);
}

// canvas c1
var headerCanvas = function(p) {
    p.setup = function() {
        p.createCanvas(2000, 198);
        //p.background('lightblue');
        // title
        p.fill(0, 0, 0);
        p.textSize(24);
        p.text('Does Good Governance Reduce Inequality in Sub-Saharan Africa?', x_margin + 5, 15, table_width, 100);
        
        // headers
        p.fill(0, 0, 0);
        p.textSize(12);
        p.textStyle(BOLD);
        p.textAlign(LEFT);
    
        p.text('Country', x_margin + 5, 72, 100, 100);
        p.text('Good Governance (Mean) 2004 – 2014', x_margin + 280, 72, 300, 100);
        p.text('Gini (Mean) 1914 – 2011', x_margin + 730, 72, 200, 100);
        p.text('Region', x_margin + 1150, 72, 200, 100);
        
        // annotations
        p.textStyle(NORMAL);
        p.textAlign(LEFT);
        p.fill(0, 0, 0, 150);
        p.text('In order of Good Governance', x_margin + 5, 157, 400, 100);    
        p.text('-2.5', x_margin + 280, 157, 100, 100);
        p.text('0', x_margin + 730, 157, 100, 100);
        p.textAlign(CENTER);
        p.text('0', x_margin + 382, 157, 100, 100);
        p.textAlign(RIGHT);
        p.text('2.5', x_margin + 483, 157, 100, 100);
        p.text('1', x_margin + 935, 157, 100, 100);    
        
        // dividers
        p.stroke(0, 0, 0, 25);
        p.line(x_margin, y_margin + 8, x_margin + table_width, y_margin + 8);
        p.line(x_margin, y_margin + 51 , x_margin + table_width, y_margin + 51);
        p.line(x_margin, y_margin + 94, x_margin + table_width, y_margin + 94);        
         p.line(x_margin, y_margin + 137, x_margin + table_width, y_margin + 137);   
        
        // buttons
        buttonName = p.createButton('Sort by Name');
        buttonName.position(x_margin + 0, 111);
        buttonName.mousePressed(buttonNameHandler);
        
        buttonGov = p.createButton('Sort by Good Governance');
        buttonGov.position(x_margin + 280, 111);
        buttonGov.mousePressed(buttonGovHandler);
        
        buttonGini = p.createButton('Sort by Gini');
        buttonGini.position(x_margin + 730, 111);
        buttonGini.mousePressed(buttonGiniHandler);
        
        buttonRegion = p.createButton('Sort by Region');
        buttonRegion.position(x_margin + 1150, 111);
        buttonRegion.mousePressed(buttonRegionHandler);    
    }
};

function buttonNameHandler() {
    body.remove();
    showData(dataName);
}

function buttonGovHandler() {
    body.remove();
    showData(dataGov);
}

function buttonGiniHandler() {
    body.remove();
    showData(dataGini);
}

function buttonRegionHandler() {
    body.remove();
    showData(dataRegion);
}

var bodyCanvas = function(p) {
    
    p.setup = function() {
        p.createCanvas(2000, 2000);
        //p.background('blue');
        var num_rows = data.getRowCount();
        // loop to display content
        for (var i = 0; i < num_rows; i++) {
            var country = data.getString(i, 0);
            var gov = data.getNum(i, 1).toFixed(2);
            var gini = data.getNum(i, 2).toFixed(2);
            var region = data.getString(i, 3)
            
            // rank and country
            p.noStroke();
            p.fill(0, 0, 0);
            p.textStyle(NORMAL)
            p.textAlign(LEFT);
            p.text(i + 1 + ".", x_margin + 5, multiplier(i) + 4, 20, 20);
            p.textAlign(LEFT);
            p.text(country, x_margin + 36, multiplier(i) + 4, 200, 20);
            
            // gov backbar
            p.fill(0, 0, 0, 15);
            p.rect(x_margin + 280, multiplier(i) + 6, bar_width, bar_height);
            
            // gov frontbar
            if (gov > 0) {
                p.fill(100, 100, 200);
                p.rect(x_margin + 430, multiplier(i) + 6, gov / 2.5 * bar_width / 2, bar_height);
            } else {
                p.fill(255, 70, 70);
                p.rect(x_margin + 430 + (gov / 2.5 * bar_width / 2), multiplier(i) + 6, gov / 2.5 * bar_width / 2, bar_height);
            }
            
            // gov value
            p.textAlign(RIGHT);
            p.text(gov, x_margin + 625, multiplier(i) + 4, 0, 20);
          
            // gini backbar
            p.fill(0, 0, 0, 15);
            p.rect(x_margin + 730, multiplier(i) + 6, bar_width, bar_height);
            
            // gini frontbar
            p.fill(255 - (gini / 100 * 255));
            p.rect(x_margin + 730, multiplier(i) + 6, gini / 100 * bar_width, bar_height);
            
            // gini value
            p.textAlign(RIGHT);
            p.text((gini / 100).toFixed(2), x_margin + 1075, multiplier(i) + 4, 0, 20);
            
            // region
            p.noStroke();
            p.fill(0, 0, 0);
            p.textStyle(NORMAL)
            p.textAlign(LEFT);
            p.text(region, x_margin + 1150, multiplier(i) + 4, 200, 20);   
        
            // lines
            p.stroke(0, 0, 0, 15);
            p.line(x_margin, multiplier(i) - 9, x_margin + table_width, multiplier(i) - 9);
            p.stroke(0, 0, 0, 100);
            p.line(x_margin + 430, multiplier(i), x_margin + 430, multiplier(i) + 24);
            p.line(x_margin + 730, multiplier(i), x_margin + 730, multiplier(i) + 24);
        }
        
        // add last line
        stroke(0, 0, 0, 15); 
        line(x_margin, multiplier(num_rows) - 9, x_margin + table_width, multiplier(i) - 9);        
    }
}

// create second sketch



// function setup() {
//     createCanvas(windowWidth, 2000);
//     loadTable('data/mean-gov-gini.csv', 'csv', 'header', showData);
// }

// function showData(data) {
//     var num_rows = data.getRowCount();
        
//     // title
//     fill(0, 0, 0);
//     textSize(24);
//     text('Does Good Governance Reduce Inequality in Sub-Saharan Africa?', x_margin + 5, 15, table_width, 100);
    
//     // headers
//     fill(0, 0, 0);
//     textSize(12);
//     textStyle(BOLD);
//     textAlign(LEFT);
    

//     text('Country', x_margin + 5, 73, 100, 100);
//     text('Good Governance (Mean) 2004 – 2014', x_margin + 280, 73, 300, 100);
//     text('Gini (Mean) 1914 – 2011', x_margin + 730, 73, 200, 100);
    
//     // annotations
//     textStyle(NORMAL);
//     textAlign(LEFT);
//     fill(0, 0, 0, 150);
//     text('In order of Good Governance', x_margin + 5, 115, 400, 100);    
//     text('-2.5', x_margin + 280, 115, 100, 100);
//     text('0', x_margin + 730, 115, 100, 100);
//     textAlign(CENTER);
//     text('0', x_margin + 382, 115, 100, 100);
//     textAlign(RIGHT);
//     text('2.5', x_margin + 483, 115, 100, 100);
//     text('1', x_margin + 935, 115, 100, 100);    
    
//     // dividers
//     stroke(0, 0, 0, 25);
//     line(x_margin, y_margin + 51 , x_margin + table_width, y_margin + 51);
//     line(x_margin, y_margin + 8, x_margin + table_width, y_margin + 8);
    
//     // loop to display content
//     for (var i = 0; i < num_rows; i++) {

//         var country = data.getString(i, 0);
//         var gov = data.getNum(i, 1).toFixed(2);
//         var gini = data.getNum(i, 2).toFixed(2);

//         // rank and country
//         noStroke();
//         fill(0, 0, 0);
//         textStyle(NORMAL)
//         textAlign(LEFT);
//         text(i + 1 + ".", x_margin + 5, multiplier(i) + 4, 20, 20);
//         textAlign(LEFT);
//         text(country, x_margin + 36, multiplier(i) + 4, 200, 20);
        
//         // gov backbar
//         fill(0, 0, 0, 15);
//         rect(x_margin + 280, multiplier(i) + 6, bar_width, bar_height);
        
//         // gov frontbar
//         if (gov > 0) {
//             fill(100, 100, 200);
//             rect(x_margin + 430, multiplier(i) + 6, gov / 2.5 * bar_width / 2, bar_height);
//         } else {
//             fill(255, 70, 70);
//             rect(x_margin + 430 + (gov / 2.5 * bar_width / 2), multiplier(i) + 6, gov / 2.5 * bar_width / 2, bar_height);
//         }
        
//         // gov value
//         textAlign(RIGHT);
//         text(gov, x_margin + 625, multiplier(i) + 4, 0, 20);
      
//         // gini backbar
//         fill(0, 0, 0, 15);
//         rect(x_margin + 730, multiplier(i) + 6, bar_width, bar_height);
        
//         // gini frontbar
//         fill(255 - (gini / 100 * 255));
//         rect(x_margin + 730, multiplier(i) + 6, gini / 100 * bar_width, bar_height);
        
//         // gini value
//         textAlign(RIGHT);
//         text((gini / 100).toFixed(2), x_margin + 1075, multiplier(i) + 4, 0, 20);
    
//         // lines
//         stroke(0, 0, 0, 15);
//         line(x_margin, multiplier(i) - 9, x_margin + table_width, multiplier(i) - 9);
//         stroke(0, 0, 0, 100);
//         line(x_margin + 430, y_margin + multiplier(i) + 98, x_margin + 430, y_margin + multiplier(i) + 124);
//         line(x_margin + 730, y_margin + multiplier(i) + 98, x_margin + 730, y_margin + multiplier(i) + 124);
//     }
    
//     // add last line
//     stroke(0, 0, 0, 15); 
//     line(x_margin, multiplier(num_rows) - 9, x_margin + table_width, multiplier(i) - 9);
// }   

function multiplier(i) {
    return i * row_height;
}




// start canvases
//var header = new p5(headerCanvas);
//var body = new p5(bodyCanvas);
