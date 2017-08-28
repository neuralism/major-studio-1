var data;
var descending = false;

// DEFAULT DATA SET
var dataset = 'voiceAndAccountability';

// LOAD DATA
d3.json('data/data.json', function(d) {
    data = d;
    data = _.sortBy(data, dataset).reverse();
    createTable(data);
});

// MOUSE EVENTS
d3.selectAll('li a.wgi-selector').on('click', wgiHandler);
d3.select('#rank-sort').on('click', tabClickHandler);
d3.select('#country-sort').on('click', tabClickHandler);
d3.select('#wgi-sort').on('click', tabClickHandler);
d3.select('#gini-sort').on('click', tabClickHandler);
d3.select('#year-sort').on('click', tabClickHandler);
d3.select('#region-sort').on('click', tabClickHandler);

// $('.button').click(test);
// function test(event) {
//     $('.wgi-plot-holder').collapse('hide');
//     $('.gini-plot-holder').collapse('hide');
// }

function createTable(d) {

    // CREATE EMPTY ROW
    d3.select('body')
        .data(data)
        .enter()
        .select('div.container#table')
        .append('div')
            .attr('class', 'row')
            .attr('id', function (d, i) { return 'row-' + i })
            // .attr('style', 'cursor: pointer')
            .attr('data-toggle', 'collapse');
            // .attr('data-target', function (d, i) { return '#row-' + i + ' .wgi-plot-holder, #row-' + i + ' .gini-plot-holder' });


    // SELECT ALL PREVIOUSLY CREATED ROWS
    var row = d3.selectAll('div.container#table').selectAll('.row');

    /*
    * -----------------------------------
    *  CREATE COLS IN THE ROW
    * -----------------------------------
    */
    
    // CREATE RANK
    // row.append('div').attr('class', 'rank col-xs-1');
    
    // CREATE COUNTRY
    row.append('div').attr('class', 'country col-xs-2')

    // CREATE WGI
    row.append('div').attr('class', 'wgi-graphs col-xs-3');
    row.append('div').attr('class', 'wgi-value col-xs-1');
    
    // CREATE GINI
    row.append('div').attr('class', 'gini-graphs col-xs-3');
    row.append('div').attr('class', 'gini-value col-xs-1');
    
    row.append('div').attr('class', 'gini-year col-xs-1');    
    row.append('div').attr('class', 'region col-xs-1').style('color', '#fff');
     
    
    d3.selectAll('.country')
        .append('div')
            .attr('class', 'rank')
            .style('width', '15%');
            
    d3.selectAll('.country')
        .append('div')
            .attr('class', 'name')
            .style('width', '85%');
     
    // WGI Bar stuff
    d3.selectAll('.wgi-graphs')
        .append('div')
            .attr('class', 'wgi-bar-holder');
            
    // WGI NEG BAR
    d3.selectAll('.wgi-bar-holder')
        .append('div')
            .attr('class', 'wgi-neg-bar-holder')
        .append('div')
            .attr('class', 'wgi-neg-bar-bg')
        .append('div')
            .attr('class', 'wgi-neg-bar');
            
    // WGI POS BAR
    d3.selectAll('.wgi-bar-holder')
        .append('div')
            .attr('class', 'wgi-pos-bar-holder')
        .append('div')
            .attr('class', 'wgi-pos-bar-bg')
        .append('div')
            .attr('class', 'wgi-pos-bar');
     
    // WGI GRAPH
    d3.selectAll('.wgi-graphs')
        .append('div')
        .attr('class', 'wgi-plot-holder collapse')
        .append('svg')
        .attr('height', 100)
        .attr('width', '100%')
        .style('background-color', '#eee');
        
    // GINI BAR
    d3.selectAll('.gini-graphs')
        .append('div')
        .attr('class', 'gini-bar-holder')
        .append('div')
            .attr('class', 'gini-bar-bg')
            .style('width', '100%')
        .append('div')
            .attr('class', 'gini-bar')
            .style('width', 100);
        
    // GINI GRAPH
    d3.selectAll('.gini-graphs')
        .append('div')
        .attr('class', 'gini-plot-holder collapse')
        .append('svg')
        .attr('height', 100)
        .attr('width', '100%')
        .style('background-color', '#eee');
    
    update();
}

function update() {

    /*
    * -----------------------------------
    *  UPDATE BARS AND VALUES
    * -----------------------------------
    */
    
    // UPDATE RANK
    d3.selectAll('.rank')
        .data(data)
        .html(function (d, i) {
            return i + 1 + '.'; 
    });
    
    // UPDATE COUNTRY
    d3.selectAll('.name')
        .data(data)
        .html(function (d, i) {
            return d['country']; 
        });
        
    // UPDATE WGI NEG BAR    
    d3.selectAll('.wgi-neg-bar')
        .data(data)
        .each(function (d, i) {
            d3.select(this)
            .transition()
                .duration(400)
                .style('opacity', 0.25 + d[dataset] / -2.5 * 0.75)
                .style('width', function() {
                    // console.log(d[dataset])
                    if (d[dataset] >= 0) {
                        return 0 + 'px';
                    } else {
                        return d[dataset] / -2.5 * d3.select('.wgi-neg-bar-bg').style('width').split('px')[0] + 'px';
                    }
            });
    });
    
    // UPDATE WGI POS BAR   
    d3.selectAll('.wgi-pos-bar')
        .data(data)
        .each(function (d, i) {
            d3.select(this)
            .transition()
                .duration(400)
                .style('opacity', 0.25 + d[dataset] / 2.5 * 0.75)
                .style('width', function() {
                    if (d[dataset] <= 0) {
                        return 0 + 'px';
                    } else {
                        return d[dataset] / 2.5 * d3.select('.wgi-pos-bar-bg').style('width').split('px')[0] + 'px';
                    }
            });
    });
    
    // UPDATE WGI VALUE
    d3.selectAll('.wgi-value')
        .data(data)
        .each(function (d, i) {
            if (d[dataset] >= 0) {
                var valueColour = '#6464c8';
                var value = 2.5;
                var spacing = '&nbsp;&nbsp; ';                
            } else {
                var valueColour = '#ff4646';
                var value = -2.5;
                var spacing = '&nbsp; ';                
            }
                        
            d3.select(this)
                .style('color', valueColour)
                .style('opacity', 0.5 + d[dataset] / value * 0.5)
                .html(spacing + (d[dataset] * 1).toFixed(2));                
        });        


    // UPDATE GINI BAR
    d3.selectAll('.gini-bar')
        .data(data)
        .each(function (d, i) {
            d3.select(this)
            .transition()
                .duration(400)
                .style('opacity', 0 + (d['latestGini'] / 50 * 0.5))
                .style('width', function() {
                    return d['latestGini'] + '%';
                })
        });
            
    // UPDATE GINI VALUE
    d3.selectAll('.gini-value') 
        .data(data)
        .each(function (d, i) {
            d3.select(this)
                .style('opacity', (d['latestGini'] / 100))
                .style('color', 'green')
                .html('&nbsp; &nbsp;' + (d['latestGini'] / 100).toFixed(2));    
        });
        
    // UPDATE GINI YEAR    
    d3.selectAll('.gini-year') 
        .data(data)
        .each(function (d, i) {
            d3.select(this)
                .style('color', 'gray')
                .html(d['giniYear']);    
        });
    
    // UPDATE REGION NAME
    d3.selectAll('.region')
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

function tabClickHandler() {

    var selection = d3.select(this).attr('id')

    switch (selection) {
        case 'country-sort':
            
            if (descending) {
                data = _.sortBy(data, 'country');
                descending = false;
            } else {
                data = _.sortBy(data, 'country').reverse();
                descending = true;
            }
            break;
            
        case 'wgi-sort':
            
            if (descending) {
                data = _.sortBy(data, dataset).reverse();
                descending = false;
            } else {
                data = _.sortBy(data, dataset);
                descending = true;
            }
            break;
            
        case 'gini-sort':
            
            if (descending) {
                data = _.sortBy(data, 'latestGini').reverse();
                descending = false;
            } else {
                data = _.sortBy(data, 'latestGini');
                descending = true;
            }
            break;
            
        case 'year-sort':
            
            if (descending) {
                data = _.sortBy(data, 'giniYear');
                descending = false;
            } else {
                data = _.sortBy(data, 'giniYear').reverse();
                descending = true;
            }
            break;                
        
        case 'region-sort':
            
            if (descending) {
                data = _.sortBy(data, 'region');
                descending = false;
            } else {
                data = _.sortBy(data, 'region').reverse();
                descending = true;
            }
            break;            
    }

    update();
    
    // d3.select('img#country')
    // .style('opacity', 0);
    
    d3.select('img#wgi-sort')
    .style('opacity', 0);    
    
    // d3.select('img#gini')
    // .style('opacity', 0);  
    
    // d3.select('img#region')
    // .style('opacity', 0);
    
    // d3.select('img#' + selection)
    // .style('opacity', 1);=
}

function wgiHandler() {

    switch (d3.select(this).attr('value')) {
        case 'voiceAndAccountability':
            dataset = 'voiceAndAccountability';
            d3.select('span.dropdown-menu-text').html('WGI 2015: Voice and Accountability');
            break;

        case 'politicalStability':
            dataset = 'politicalStability';
            d3.select('span.dropdown-menu-text').html('WGI 2015: Political Stability');            
            break;
            
        case 'govEffectiveness':
            dataset = 'govEffectiveness';
            d3.select('span.dropdown-menu-text').html('WGI 2015: Government Effectiveness');                  
            break;
            
        case 'regQuality':
            dataset = 'regQuality';
            d3.select('span.dropdown-menu-text').html('WGI 2015: Regulatory Quality');                     
            break;
            
        case 'ruleOfLaw':
            dataset = 'ruleOfLaw';
            d3.select('span.dropdown-menu-text').html('WGI 2015: Rule of Law');                
            break;   
            
        case 'controlOfCorruption':
            dataset = 'controlOfCorruption';
            d3.select('span.dropdown-menu-text').html('WGI 2015: Control of Corruption');            
            break;
    }
    
    update();
}