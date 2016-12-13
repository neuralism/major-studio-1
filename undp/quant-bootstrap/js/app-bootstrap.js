var data;
var dataset = 'voiceAndAccountability';

// LOAD DATA
d3.json('data/data.json', function(d) {
    data = d;
    data = _.sortBy(data, dataset).reverse();
    createTable(data);
});

// Mouse events
$('.button').click(test);
d3.selectAll('li a.wgi-selector').on('click', wgiHandler);
d3.select('#wgi-sort').on('click', tabClickHandler);


function test(event) {
    $('.wgi-chart-holder').collapse('hide');
    $('.gini-chart-holder').collapse('hide');
    
}

function createTable(d) {

    // CREATE EMPTY ROW
    d3.select('body')
        .data(data)
        .enter()
        .select('div.container#table')
        .append('div')
            .attr('class', 'row')
            .attr('id', function (d, i) { return 'row-' + i })
            .attr('style', 'cursor: pointer')
            .attr('data-toggle', 'collapse')
            .attr('data-target', function (d, i) { return '#row-' + i + ' .wgi-chart-holder, #row-' + i + ' .gini-chart-holder' });


    // SELECT ALL PREVIOUSLY CREATED ROWS
    var row = d3.selectAll('div.container#table').selectAll('.row');

    /*
    * -----------------------------------
    *  CREATE COLS IN THE ROW
    * -----------------------------------
    */
    
    row.append('div').attr('class', 'rank col-lg-1').html('rank')
    row.append('div').attr('class', 'country col-lg-2').html('country');
    
    row.append('div').attr('class', 'wgi-graphs col-lg-3');
    row.append('div').attr('class', 'wgi-value col-lg-1').html('wgi-val');
    
    row.append('div').attr('class', 'gini-graphs col-lg-3');
    row.append('div').attr('class', 'gini-value col-lg-1');
    
    // row.append('div').attr('class', 'info col-lg-1').html('info');    
    row.append('div').attr('class', 'region col-lg-1').html('reg');
     
    // WGI Bar stuff
    d3.selectAll('.wgi-graphs')
        .append('div')
        .attr('class', 'wgi-bar-holder')
        .html('wgi-bar-holder');
     
    // WGI Graph Stuff
    d3.selectAll('.wgi-graphs')
        .append('div')
        .attr('class', 'wgi-chart-holder collapse')
        .append('div')
        .style('height', 100)
        .style('background-color', 'blue')
     
    // Gini Bar Stuff
    d3.selectAll('.gini-graphs')
        .append('div')
        .attr('class', 'gini-bar-holder')
        .style('width', '100%')
        .html('gini-bar-holder');
    
    // Gini Graph Stuff
    d3.selectAll('.gini-graphs')
        .append('div')
        .attr('class', 'gini-chart-holder collapse');

    d3.selectAll('.gini-chart-holder')
        .append('div')
        .style('height', 100)
        .style('background-color', 'blue')

    update();
    
}

function wgiHandler() {

    // switch (d3.select(this).attr('value')) {
    //     case 'voiceAndAccountability':
    //         dataset = 'voiceAndAccountability';
    //         d3.select('span.dropdown-menu-text').html('Voice and Accountability');
    //         break;

    //     case 'politicalStability':
    //         dataset = 'politicalStability';
    //         d3.select('span.dropdown-menu-text').html('Political Stability');            
    //         break;
            
    //     case 'govEffectiveness':
    //         dataset = 'govEffectiveness';
    //         d3.select('span.dropdown-menu-text').html('Government Effectiveness');                  
    //         break;
            
    //     case 'regQuality':
    //         dataset = 'regQuality';
    //         d3.select('span.dropdown-menu-text').html('Regulatory Quality');                     
    //         break;
            
    //     case 'ruleOfLaw':
    //         dataset = 'ruleOfLaw';
    //         d3.select('span.dropdown-menu-text').html('Rule of Law');                
    //         break;   
            
    //     case 'controlOfCorruption':
    //         dataset = 'controlOfCorruption';
    //         d3.select('span.dropdown-menu-text').html('Control of Corruption');            
    //         break;
    // }
    
    // update();
}



function update() {
    
    // console.log('update');
    // // RELOAD RANK
    // d3.selectAll('.rank')
    //     .data(data)
    //     .html(function (d, i) {
    //         return i + 1 + '.'; 
    // });
    
    // // RELOAD COUNTRY
    // d3.selectAll('.country')
    //     .data(data)
    //     .html(function (d, i) {
    //         return d['country']; 
    //     });
    
    // // RELOAD INDICATOR VALUE
    // d3.selectAll('.wgi-value')
    //     .data(data)
    //     .each(function (d, i) {
    //         if (d[dataset] >= 0) {
    //             var valueColour = '#6464c8';
    //             var value = 2.5;
    //             var spacing = '&nbsp';                
    //         } else {
    //             var valueColour = '#ff4646';
    //             var value = -2.5;
    //             var spacing = '';                
    //         }
                        
    //         d3.select(this)
    //             .style('color', valueColour)
    //             .style('opacity', 0.5 + d[dataset] / value * 0.5)
    //             .html(spacing + (d[dataset] * 1).toFixed(2));                
    //     });        

    // // RELOAD GINI BAR
    // d3.selectAll('.gini-bar')
    //     .data(data)
    //     .each(function (d, i) { 
    //         d3.select(this)
    //             // .style('opacity', 0)
    //             // .style('width', '0px')
    //         .transition()
    //             .duration(500)
    //             .style('opacity', 0 + (d['giniMean'] / 50 * 0.5))
    //             .style('width', d['giniMean'] + '%');
    //     });

    // // RELOAD GINI VALUE
    // d3.selectAll('.gini-value') 
    //     .data(data)
    //     .each(function (d, i) {
    //         d3.select(this)
    //             .style('opacity', (d['giniMean'] / 100))
    //             .style('color', 'green')
    //             .html('&nbsp' + (d['giniMean'] / 100).toFixed(2));    
    //     });

    // // RELOAD REGION NAME
    // d3.selectAll('.region')
    //     .data(data)
    //     .each(function (d, i) {

    //         if (d['region'] === 'North') var regionColour = '#111';
    //         if (d['region'] === 'South') var regionColour = '#d92f8a';
    //         if (d['region'] === 'East') var regionColour = '#00abe9';
    //         if (d['region'] === 'West') var regionColour = '#666';
    //         if (d['region'] === 'Central') var regionColour = 'olive';
            
    //         d3.select(this)
    //             .style('background-color', regionColour)
    //             .html(d['region']);
    //     });        

}

function tabClickHandler() {


    // var selection = d3.select(this).attr('id')

    // switch (selection) {
    //     case 'country':
    //         data = _.sortBy(data, 'country');
    //         break;
    //     case 'wgi-sort':
    //         data = _.sortBy(data, dataset).reverse();
    //         break;
    //     case 'gini':
    //         data = _.sortBy(data, 'giniMean').reverse();
    //         break;
    //     case 'region':
    //         data = _.sortBy(data, 'region');
    //         break;            
    // }

    // update();
    
    // // d3.select('img#country')
    // // .style('opacity', 0);
    
    // d3.select('img#wgi-sort')
    // .style('opacity', 0);    
    
    // // d3.select('img#gini')
    // // .style('opacity', 0);  
    
    // // d3.select('img#region')
    // // .style('opacity', 0);
    
    // // d3.select('img#' + selection)
    // // .style('opacity', 1);
}
