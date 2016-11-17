r = radius, cx = circle x position, cy = circle y position, positions starts from the centre of the circle.

```html
<svg height='800' width='500'>
  <circle r='50' cx='200' cy='300'/>
</svg>
```

drawing lines.

```html
<svg height='800' width='500'>
  <line x1='0' y1='0' x2='100' y2='100'/>
  <line x1='0' y1='0' x2='100' y2='100' stroke='purple'/>
  <line x1='10' y1='0' x2='10' y2='100' stroke='red'/>
  <line x1='30' y1='10' x2='130' y2='10' stroke='blue'/>
</svg>
```
```js
// Draw the SVG elements first
function createSVG() {
  mySVG = d3.select('body').append('svg')
                            .attr('height', '800')
                            .attr('width', '500'); 
  mySVG.append('circle')
        .attr('id', 'start')
        .attr('class', 'foobar');
  
  mySVG.append('circle')
        .attr('id', 'end')
        .attr('class', 'foobar');

  mySVG.append('line')
        .attr('class', 'foobar');
};
```

Then use functions to modify, add styles, etc., to them.

```js
function thickenCircles() {
  var circles = d3.selectAll('circle')
                   .attr('r', '20');
};

function moveCircles() {
  d3.select("#start")
      .attr('cx', '100')
      .attr('cy', '100');

  d3.select("#end")
      .attr('cx', '200')
      .attr('cy', '200');
};

function styleLine() {
  d3.select('line')
     .attr('x1', 100)
     .attr('x2', 100)
     .attr('y1', 5)
     .attr('y2', 100)
     .style('stroke', 'cyan');
};

function moveLine() {
  d3.select('line')
      .attr('x1', '100')
      .attr('y1', '100')
      .attr('x2', '200')
      .attr('y2', '200');
};

function thickenLine() {
  d3.select('line')
      .style('stroke-width', '5');
};

function styleCircles() {
  d3.select('#start')
     .style('fill', 'lavender');
  d3.select('#end')
     .style('fill', 'none')
     .style('stroke', 'turquoise');
};
```
You can use a function to run everything.

```js
function runAll() {
  createSVG();
  thickenCircles();
  moveCircles();
  styleLine();
  moveLine();
  thickenLine();
  styleCircles();
};