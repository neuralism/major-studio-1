var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
var apiKey = "&e1a6d9ac8bfa449f944260e705464165";
var input;
//var query ="hard coded val here"
var firstSearch = true;

function setup() {
    noCanvas(); 
    var button = select('#submit');
    button.mousePressed(searchArticles);
    input = select('#search');
}
function searchArticles(){
    apiUrl = url + input.value() + apiKey;
    loadJSON(apiUrl, gotJson); 
}
function gotJson(data){
    var articles = data.response.docs;
    if(firstSearch){
        for (var i = 0; i<articles.length; i++){
            var h = createElement('h1', articles[i].headline.main);
            h.id('heading'+i);
            var ele = select('#heading'+i);
            var p = createP(articles[i].snippet);
            p.id('description'+i);
            styleThis(ele, p);
        }
    firstSearch = false;
    }else{
        for (var i = 0; i<articles.length; i++){
            var oldHeading = select('#heading'+i);
            var oldDescription = select('#description'+i);
            oldHeading.remove();
            oldDescription.remove();
            
            var h = createElement('h1', articles[i].headline.main);
            h.id('heading'+i);
            var ele = select('#heading'+i);
            var p = createP(articles[i].snippet);
            p.id('description'+i);
            styleThis(ele, p);
        }
    }
}

function styleThis(ele, p){
    ele.style('color', 'blue');
    ele.style('font-family', 'sans-serif');
    ele.style('text-align', 'center');
    p.style('text-align', 'center');
}