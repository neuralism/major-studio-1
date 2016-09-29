var id;
var slider;

function setup() {
    // select is a only able to give back one element
    id = select('#kafka');
    id.mousePressed(click);
    id.mouseReleased(release);
    
    // p5 slider
    slider = createSlider(0, windowWidth/2, 128);
    slider.position(windowWidth/2, windowHeight/2);
    slider.changed(change);
    noCanvas();
}

function click() {
    console.log('click');
    
    // attaching a css element to the id element
    id.style('color', 'orange');
};

function release() {
    id.style('color', 'blue');
    id.style('font-size', '90pt');
}

function change() {
    id.position(slider.value(), windowHeight/2);
}