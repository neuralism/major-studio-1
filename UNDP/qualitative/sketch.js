// consider using https://highlightjs.org/
var content;
var keyword;
var tags = ['nn', 'nns', 'nnp', 'vb', 'vbn'];
var topic = ['corruption', 'bribery', 'fraud', 'embezzlement', 'police', 'political', 'judicial'];
var firstRun = true;

function setup() {
    noCanvas();
    RiTa.loadString('data/report.txt', loadComplete);
}

function loadComplete(c) {
    content = c.replace(/[\n\r\t]/g, ' ');
    sentences = RiTa.splitSentences(content);
    $('.button').click(update);
    $('#submit').click(search);
    $('#search').keypress(function(event) { 
        if (event.which === 13) search(); 
    });
    TweenLite.to($('a[name=corruption]'), 0.5, { opacity: 1, ease: Power4.easeOut });
    show('corruption');
}

function show(k) {
    keyword = k.toLowerCase();
    for (var i in sentences) {
        var match = Boolean(String(sentences[i]).toLowerCase().match(keyword));
        if (match) createElement('div', sentences[i]).class('quote');
    }
    $('div.quote').each(function(index) {
        TweenLite.from(this, 0.1, { onStart: splitQuote, onStartParams: [this], ease: Power4.easeOut, delay: index * 0.05 });
        TweenLite.from(this, 0.5, { opacity: 0, y: 15, ease: Power4.easeOut, delay: index * 0.05 + 0.25 });
    });
 }

function splitQuote(quote) {
    var st = new SplitText(quote, { type: 'words', wordsClass: 'word' });
    $(quote).find('.word').each(function(index) {
        var word = new RiString($(this).text().toLowerCase().replace(/[,.%]/g, ''));
        var pos = word.pos();
        var match = Boolean(String(word).match(keyword));
        if (match) {
            $(this).addClass('keyword');
            if (firstRun) TweenLite.from(this, 3, { color: '#3e3e3e', ease: Power4.easeOut, delay: 1  });
        }        
        for (var i in pos) {
            pos[i] = String(pos[i]);
            for (var j in tags) {
                if (pos[i] === tags[j] && !match) {
                    $(this).addClass('pos');
                    if (firstRun) TweenLite.from(this, 3, { color: '#3e3e3e', ease: Power4.easeOut, delay: 2.25 });
                }
            }
        }
    });
}

function update(event) {
    var keyword = event.currentTarget.name;
    firstRun = false;
    $('div').remove();
    TweenLite.to($('a'), 0.5, { opacity: 0.4, ease: Power4.easeOut }); 
    TweenLite.to($('a[name=' + event.currentTarget.name + ']'), 0.5, { opacity: 1, ease: Power4.easeOut }); 
    show(keyword);
}

function search(event) {
    var keyword = String($('#search').val().toLowerCase());
    var match = Boolean(content.toLowerCase().match(keyword));
    firstRun = false;
    $('div').remove();
    TweenLite.to($('a'), 0.5, { opacity: 0.4, ease: Power4.easeOut });
    for (var i in topic) {
        if (keyword === topic[i]) {
            TweenLite.to($('a'), 0.5, { opacity: 0.4, ease: Power4.easeOut }); 
            TweenLite.to($('a.' + topic[i]), 0.01, { opacity: 1, ease: Power4.easeOut }); 
        }
    }        
    if (match && keyword !== '' && keyword !== ' ') {
        createElement('div', 'Results for \"' + keyword + '\"').class('info');
        show(keyword);
    } else { 
        createElement('div', 'No results for \"' + keyword + '\"').class('info'); 
    }
    
}