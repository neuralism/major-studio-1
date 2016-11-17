var data;
var dataset = 'wgiMean';

d3.selectAll('img#indicator')
  .style('opacity', 1);

// LOAD DATA
d3.json('data/data.json', function(d) {
    data = d;
    data = _.sortBy(data, ['wgiMean']).reverse();
    createTable(data);
});

function createTable(d) {
    
    //console.log(d)
    // CREATE ROWS
    d3.select('body')
        .data(data)
        .enter()
        .select('div#container')
        .append('div')
            .attr('class', 'row');
            // .on('mouseover', mouseOverHandler)
            // .on('mouseout', mouseOutHandler);

    // CREATE CELLS
    var row = d3.selectAll('div#container').selectAll('.row');
        
    row.append('div').attr('class', 'cell index');
    row.append('div').attr('class', 'cell country');
    row.append('div').attr('class', 'cell indicator');
    
    // CREATE INDICATOR BARS
    d3.selectAll('.cell.indicator')
        .append('div')
            .attr('class', 'y-axis-indicator')
        .append('div')
            .attr('class', 'bar-indicator-bg')
        .append('div')
            .attr('class', 'bar-indicator-negative');    
    
    d3.selectAll('.cell.indicator')
        .append('div')
            .attr('class', 'bar-indicator-bg')
        .append('div')
            .attr('class', 'bar-indicator-positive')

    // CREATE INDICATOR FIELD
    row.append('div')
        .attr('class', 'cell indicator-value')
        .html('0.00');
      
    // CREATE GINI BAR 
    row.append('div')
        .attr('class', 'cell gini')
        .append('div')
          .attr('class', 'y-axis-gini')
        .append('div')
          .attr('class', 'bar-gini-bg')
        .append('div')
          .attr('class', 'bar-gini');
      
    // CREATE GINI FIELD
    row.append('div')
        .attr('class', 'cell gini-value')
        .style('color', 'green')
        .html('0.00');
    
    // CREATE PERIOD FIELD
    row.append('div')
        .attr('class', 'cell info')
        .append('div')
            .attr('class', 'hint--top  hint--rounded')
            .attr('aria-label', d['giniAggregatedYears'])            
            .html('Aggregated');
    
    // CREATE REGION FIELD
    row.append('div')
            .attr('class', 'cell region')
        .append('div')
            .attr('class', 'region-name')
            .style('background-color', '#ccc')
            .html('temp');
    
    update();
}

function update() {
    
    // UPDATE INDEX
    d3.selectAll('.index')
        .data(data)
        .html(function (d, i) {
            return i + 1 + '.'; 
    });
    
    // UPDATE COUNTRY
    d3.selectAll('.country')
        .data(data)
        .html(function (d, i) {
            return d['country']; 
        });
    
    // UPDATE INDICATOR BARS
    d3.selectAll('.bar-indicator-positive')
        .data(data)
        .each(function (d, i) {
            d3.select(this)
                .style('width', '0px')
                .style('opacity', 0)
            .transition()
                .duration(500)            
                .style('width', d[dataset] / 2.5 * 120 + 'px')
                .style('opacity', 0.25 + d[dataset] / 2.5 * 0.75);
        });
    
    d3.selectAll('.bar-indicator-negative')
        .data(data)
        .each(function (d, i) {
            d3.select(this)
                .style('width', '0px')
                .style('opacity', 0)
            .transition()
                .duration(500)            
                .style('width', d[dataset] / -2.5 * 120 + 'px')
                .style('opacity', 0.25 + d[dataset] / -2.5 * 0.75);

    });
    
    // UPDATE INDICATOR VALUE
    d3.selectAll('.cell.indicator-value')
        .data(data)
        .each(function (d, i) {
            if (d['wgiMean'] >= 0) {
                var valueColour = '#6464c8';
                var value = 2.5;
                var spacing = '&nbsp';                
            } else {
                var valueColour = '#ff4646';
                var value = -2.5;
                var spacing = '';                
            }
                        
            d3.select(this)
                .style('color', valueColour)
                .style('opacity', 0.5 + d[dataset] / value * 0.5)
                .html(spacing + (d[dataset] * 1).toFixed(2));                
        });
    
    // UPDATE GINI BAR
    d3.selectAll('.bar-gini')
        .data(data)
        .each(function (d, i) { 
            d3.select(this)
                .style('opacity', 0)
                .style('width', '0px')
            .transition()
                .duration(500)
                .style('opacity', 0 + (d['giniMean'] / 50 * 0.5))
                .style('width', d['giniMean'] / 100 * 190 + 'px');  
        });
            
    // UPDATE GINI FIELD
    d3.selectAll('.cell.gini-value') 
        .data(data)
        .each(function (d, i) {
            d3.select(this)
                .style('opacity', (d['giniMean'] / 100))
                .style('color', 'green')
                .html('&nbsp' + (d['giniMean'] / 100).toFixed(2));    
        });
        
    // UPDATE INFO FIELD
    d3.selectAll('.cell.info')
        .data(data)
        .each(function (d, i) {
            d3.select(this)
                .attr('aria-label', d['giniAggregatedYears']);
        });
    
    d3.selectAll('.region-name')
        .data(data)
        .each(function (d, i) {

            if (d['region'] === 'North') var regionColour = '#111';
            if (d['region'] === 'South') var regionColour = '#d92f8a';
            if (d['region'] === 'East') var regionColour = '#00abe9';
            if (d['region'] === 'West') var regionColour = '#666';
            if (d['region'] === 'Central') var regionColour = 'olive';
            
            d3.select(this)
                .style('background-color', regionColour)
                .html(d['region']);
        });

    }

d3.select('div.indicator-header')
    // .on('mouseover', tabOverHandler)
    // .on('mouseout', tabOutHandler)
    .on('click', tabClickHandler);
  
  
d3.select('div.gini-header')
    // .on('mouseover', tabOverHandler)
    // .on('mouseout', tabOutHandler)
    .on('click', tabClickHandler);      

d3.select('div.region-header')
    // .on('mouseover', tabOverHandler)
    // .on('mouseout', tabOutHandler)
    .on('click', tabClickHandler);    

d3.select('div.country-header')
    // .on('mouseover', tabOverHandler)
    // .on('mouseout', tabOutHandler)
    .on('click', tabClickHandler);
    
d3.select('#regionList')
    .on('change', listHandler);
    

function mouseOverHandler(event) {
  d3.select(this)
    .style('background-color', '#f9f9f9');
}

function mouseOutHandler(event) {
  d3.select(this)
    .style('background-color', 'transparent')
}

// function tabOverHandler(event) {
//   var selection = d3.select(this).attr('name');
//   d3.selectAll('div.' + selection) 
//     .style('background-color', '#f9f9f9');
// }

// function tabOutHandler(event) {
//   var selection = d3.select(this).attr('name');
//   d3.selectAll('div.' + selection)
//     .style('background-color', 'transparent');
// }



function listHandler() {
    switch (this.selectedIndex) {
        case 1:
            dataset = 'wgiMean';
            break;
        case 2:
            dataset = 'voiceAndAccountability';
            break;
        case 2:
            dataset = 'voiceAndAccountability';
            break;
        case 3:
            dataset = 'politicalStability';
            break;
        case 4:
            dataset = 'govEffectiveness';
            break;
        case 5:
            dataset = 'regQuality';
            break;            
        case 6:
            dataset = 'ruleOfLaw';
            break;   
        case 7:
            dataset = 'controlOfCorruption';
            break;   
    }
    
    console.log(dataset);
    update();
}


function tabClickHandler() {

    var selection = d3.select(this).attr('name');
    
    switch (selection) {
        case 'country':
            data = _.sortBy(data, ['country']);
            break;
        case 'indicator':
            data = _.sortBy(data, ['wgiMean']).reverse();
            break;
        case 'gini':
            data = _.sortBy(data, ['giniMean']).reverse();
            break;
        case 'region':
            data = _.sortBy(data, ['region']);
            break;            
    }

    update();
    
    d3.select('img#country')
    .style('opacity', 0);
    
    d3.select('img#indicator')
    .style('opacity', 0);    
    
    d3.select('img#gini')
    .style('opacity', 0);  
    
    d3.select('img#region')
    .style('opacity', 0);
    
    d3.select('img#' + selection)
    .style('opacity', 1);
}




// draw('indicator');

// d3.selectAll('img#indicator')
//   .style('opacity', 1);

// function draw(category) {

//   // load and parse data file into an object
//   d3.tsv('data/data-by-' + category + '.tsv', function(data) {
    
//     data.forEach(function (d, i) {
      
//       // append row
//       var row = d3.select('div#container')
//         .append('div')
//           .attr('class', 'row')
//           .attr('width', '960px')
//           .on('mouseover', mouseOverHandler)
//           .on('mouseout', mouseOutHandler);     
      
//       // append index
//       row.append('div')
//         .attr('class', 'cell index')
//         .html(i + 1 + '.')
    
//       // append country name
//       row.append('div')
//         .attr('class', 'cell country')
//         .html(d.country);
  
//       // append the indicator cell
//       var indicatorCell = row.append('div')
//         .attr('class', 'cell indicator')
      
//       // the indicator bars are split into 2 cells
//       // one cell for positive and one for negative
      
//       // append indicator cell (negative)
//       indicatorCell.append('div')
//         .attr('class', 'y-axis-indicator')
//       .append('div')
//         .attr('class', 'bar-indicator-bg')
//       .append('div')
//         .attr('class', 'bar-indicator-negative')
//       .transition()
//         .delay(0 + (i * 0))
//         .duration(500)
//         .style('width', d.indicator / -2.5 * 120 + 'px')
//         .style('opacity', 0.25 + d.indicator / -2.5 * 0.75);
      
//       // append indicator cell (positive)
//       indicatorCell.append('div')
//       .attr('class', 'bar-indicator-bg')
//       .append('div')
//         .attr('class', 'bar-indicator-positive')
//       .transition()
//         .delay(0 + (i * 0))
//         .duration(500) 
//         .style('width', d.indicator / 2.5 * 120 + 'px')
//         .style('opacity', 0.5 + d.indicator / 2.5 * 0.5);    
      
//       if (d.indicator >= 0) {
//         var valueColour = '#6464c8';
//         var value = 2.5;
//       } else {
//         var valueColour = '#ff4646';
//         var value = -2.5;
//       }
      
//       if (d.indicator >= 0) {
//         var spacing = '&nbsp';
//       } else {
//         var spacing = '';
//       }
      
//       // append indicator value
//       row.append('div')
//         .attr('class', 'cell indicator-value')
//         .style('color', valueColour)
//         .style('opacity', 0.5 + d.indicator / value * 0.5)
//         .html(spacing + (d.indicator * 1).toFixed(2));
      
//       // append gini bar
//       row.append('div')
//         .attr('class', 'cell gini')
//         .append('div')
//           .attr('class', 'y-axis-gini')
//         .append('div')
//           .attr('class', 'bar-gini-bg')
//         .append('div')
//           .attr('class', 'bar-gini')
//         .transition()
//           .delay(0 + (i * 0))
//           .duration(500)
//           .style('opacity', 0 + (d.gini / 50 * 0.5))
//           .style('width', d.gini / 100 * 190 + 'px');
  
//       // append gini value
//       row.append('div')
//         .attr('class', 'cell gini-value')
//         .style('opacity', (d.gini / 100))
//         .style('color', 'green')
//         .html('&nbsp' + (d.gini / 100).toFixed(2));
  
//       // append info value    
//       row.append('div')
//         .attr('class', 'cell info')
//         .html('1914 – 2011');
  
//       // append region value
//       if (d.region === 'Northen') var regionColour = '#00abe9';
//       if (d.region === 'Southern') var regionColour = '#d92f8a';
//       if (d.region === 'Eastern') var regionColour = '#00abe9';
//       if (d.region === 'Western') var regionColour = '#666';
//       if (d.region === 'Middle') var regionColour = 'olive';

//       row.append('div')
//         .attr('class', 'cell region')
//         .append('div')
//         .attr('class', 'region-name')
//         .style('background-color', regionColour)
//         .html(d.region);

//     });
    
//     // d3.selectAll('div.row')
//     //   .style('opacity', 0)
//     //   // .style('top', '100px')
//     //   .transition()
//     //   .style('opacity', 1)
//     //   // .style('top', '0px')
//     //   .duration(500)
//     //   .delay(function(d, i) { return i * 10; });

//     d3.select('div.indicator')
//       .on('mouseover', tabOverHandler)
//       .on('mouseout', tabOutHandler)
//       .on('click', tabClickHandler);
      
      
//     d3.select('div.gini')
//       .on('mouseover', tabOverHandler)
//       .on('mouseout', tabOutHandler)
//       .on('click', tabClickHandler);      
    
//     d3.select('div.region')
//       .on('mouseover', tabOverHandler)
//       .on('mouseout', tabOutHandler)
//       .on('click', tabClickHandler);    
    
//     d3.select('div.country')
//       .on('mouseover', tabOverHandler)
//       .on('mouseout', tabOutHandler)
//       .on('click', tabClickHandler);
  
//   });
  

// }

// // var s = d3.select('body')
// //   .selectAll('tr')
// //   .data(data)
// //   .enter
// //   .each(function(d) {
// //     console.log(d);
// //   });