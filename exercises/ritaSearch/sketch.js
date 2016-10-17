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

function gotJson(data) {
    
    var articles = data.response.docs;
    console.log(articles);
    
    if (firstSearch) {
        
        for (var i = 0; i < articles.length; i++) {
            // put this into a function            
            var headline = RiString(articles[i].headline.main);
            var headlinePOS = headline.pos();
            var headlineWords = headline.words();
            
            var p = createElement('p');

            // headline stuff
            for (var j = 0; j < headlineWords.length; j++) {
                var headlineSpan = createElement('span', headlineWords[j]);
                headlineSpan.style('font-size', '36px');
                
                if (headlinePOS[j] === 'nnp') {
                    headlineSpan.style('background', 'orange');
                }
                
                if (headlinePOS[i] === 'jj') {
                    headlineSpan.style('background', 'grey');
                }
            }
            
            // paragraph stuff
            var para = RiString(articles[i].snippet);
            var paraPOS = para.pos();
            var paraWords = para.words();
            
            var p = createElement('p');
            
            for (var k = 0; k < paraWords.length; k++) {
                var paraSpan = createElement('span', paraWords[k]);
                paraSpan.style('font-size', '18px');
                
                if (paraPOS[k] === 'nnp') {
                    paraSpan.style('background', 'orange');
                }
                
                if (paraPOS[k] === 'jj') {
                    paraSpan.style('background', 'grey');
                }
            }
        }
        
    firstSearch = false;
    
    } else {
        // to do: add code 
                
    }
}

function styleThis(ele, p){
    ele.style('color', 'blue');
    ele.style('font-family', 'sans-serif');
    ele.style('text-align', 'center');
    p.style('text-align', 'center');
}
