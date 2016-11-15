draw('indicator');
d3.selectAll('img#indicator')
  .style('opacity', 1);

function draw(category) {

  // load and parse data file into an object
  d3.tsv('data/data-by-' + category + '.tsv', function(data) {
    
    data.forEach(function (d, i) {
      
      // append row
      var row = d3.select('div#container')
        .append('div')
          .attr('class', 'row')
          .attr('width', '960px')
          .on('mouseover', mouseOverHandler)
          .on('mouseout', mouseOutHandler);     
      
      // append index
      row.append('div')
        .attr('class', 'cell index')
        .html(i + 1 + '.')
    
      // append country name
      row.append('div')
        .attr('class', 'cell country')
        .html(d.country);
  
      // append the indicator cell
      var indicatorCell = row.append('div')
        .attr('class', 'cell indicator')
      
      // the indicator bars are split into 2 cells
      // one cell for positive and one for negative
      
      // append indicator cell (negative)
      indicatorCell.append('div')
        .attr('class', 'y-axis-indicator')
      .append('div')
        .attr('class', 'bar-indicator-bg')
      .append('div')
        .attr('class', 'bar-indicator-negative')
      .transition()
        .delay(0 + (i * 0))
        .duration(750)
        .style('width', d.indicator / -2.5 * 120 + 'px')
        .style('opacity', 0.25 + d.indicator / -2.5 * 0.75);
      
      // append indicator cell (positive)
      indicatorCell.append('div')
      .attr('class', 'bar-indicator-bg')
      .append('div')
        .attr('class', 'bar-indicator-positive')
      .transition()
        .delay(0 + (i * 0))
        .duration(750) 
        .style('width', d.indicator / 2.5 * 120 + 'px')
        .style('opacity', 0.5 + d.indicator / 2.5 * 0.5);    
      
      if (d.indicator >= 0) {
        var valueColour = '#6464c8';
        var value = 2.5;
      } else {
        var valueColour = '#ff4646';
        var value = -2.5;
      }
      
      if (d.indicator >= 0) {
        var spacing = '&nbsp';
      } else {
        var spacing = '';
      }
      
      // append indicator value
      row.append('div')
        .attr('class', 'cell indicator-value')
        .style('color', valueColour)
        .style('opacity', 0.5 + d.indicator / value * 0.5)
        .html(spacing + (d.indicator * 1).toFixed(2));
      
      // append gini bar
       row.append('div')
        .attr('class', 'cell gini')
        .append('div')
          .attr('class', 'y-axis-gini')
        .append('div')
          .attr('class', 'bar-gini-bg')
        .append('div')
          .attr('class', 'bar-gini')
        .transition()
          .delay(0 + (i * 0))
          .duration(750)
          .style('opacity', 0 + (d.gini / 50 * 0.5))
          .style('width', d.gini / 100 * 190 + 'px');
  
      // append gini value
      row.append('div')
        .attr('class', 'cell gini-value')
        .style('opacity', (d.gini / 100))
        .style('color', 'green')
        .html('&nbsp' + (d.gini / 100).toFixed(2));
  
      // append info value    
      row.append('div')
        .attr('class', 'cell info')
        .html('1914 – 2011');
  
      // append region value
      if (d.region === 'Northen') var regionColour = '#00abe9';
      if (d.region === 'Southern') var regionColour = '#d92f8a';
      if (d.region === 'Eastern') var regionColour = '#00abe9';
      if (d.region === 'Western') var regionColour = '#666';
      if (d.region === 'Middle') var regionColour = 'olive';

      row.append('div')
        .attr('class', 'cell region')
        .append('div')
        .attr('class', 'region-name')
        .style('background-color', regionColour)
        .html(d.region);

    });
    
    // d3.selectAll('div.row')
    //   .style('opacity', 0)
    //   // .style('top', '100px')
    //   .transition()
    //   .style('opacity', 1)
    //   // .style('top', '0px')
    //   .duration(500)
    //   .delay(function(d, i) { return i * 10; });


    
    d3.select('div.indicator')
      .on('mouseover', tabOverHandler)
      .on('mouseout', tabOutHandler)
      .on('click', tabClickHandler);
      
      
    d3.select('div.gini')
      .on('mouseover', tabOverHandler)
      .on('mouseout', tabOutHandler)
      .on('click', tabClickHandler);      
    
    d3.select('div.region')
      .on('mouseover', tabOverHandler)
      .on('mouseout', tabOutHandler)
      .on('click', tabClickHandler);    
    
    d3.select('div.country')
      .on('mouseover', tabOverHandler)
      .on('mouseout', tabOutHandler)
      .on('click', tabClickHandler);
  
  });
  
}

// var s = d3.select('body')
//   .selectAll('tr')
//   .data(data)
//   .enter
//   .each(function(d) {
//     console.log(d);
//   });


function mouseOverHandler(event) {
  d3.select(this)
    .style('background-color', '#f9f9f9');
    console.log('sup');
}

function mouseOutHandler(event) {
  d3.select(this)
    .style('background-color', 'transparent')
}

function tabOverHandler(event) {
  var selection = d3.select(this).attr('name');
  d3.selectAll('div.' + selection) 
    .style('background-color', '#f9f9f9');
}

function tabOutHandler(event) {
  var selection = d3.select(this).attr('name');
  d3.selectAll('div.' + selection)
    .style('background-color', 'transparent');
}

function tabClickHandler(event) {
  d3.select('#container').remove();
  d3.select('body').append('div')
    .attr('id', 'container');    
  
  var selection = d3.select(this).attr('name');
  draw(selection);
  
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
    
  console.log(selection);

}