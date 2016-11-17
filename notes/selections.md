# D3 Notes
___
## .select()

## .style()

Adding/changing one style to a `<div>` element.
```js
d3.select('div').style('color', 'orange')
```

Adding/changing styles in a class `<div class=‘house’>`

```js
d3.selectAll('div.house')
  .style('color', '#fff')
  .style('background-color', '#000')
```

Adding/changing multiple styles to a `<div>` element. Gotta use put them in an object {}

```js
d3.select('div').style({ 'color': 'blue', 'font-size': '40px' })
```

## .attr()
.attr changes the attribute of the element

```js
d3.selectAll('div')
  .style('background-color', 'grey')
  .attr('anExampleAttribute', 'someValue')
```

`anexampleattribute=‘someValue’` gets added to `<div>`

```html
<div style='color: blue; font-size: 40px; background-color: grey;' anexampleattribute='someValue'>I'm a lonely div.</div>
```


## .classed()

Check if class = house in the div

```js
d3.selectAll('.house')
	.classed('house')
	
> returns true
```

…
this:

```js
d3.selectAll('.house').classed('frog', true)
```

changes this:

```html
<div class='house'></div>
```

to this:

```html
<div class='house frog'></div>
```
and this:

```js
d3.selectAll('.house').classed('frog', false)
```
changes it back to this:
```html
<div class='house frog'></div>
```