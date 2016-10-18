var content;
var tags = ['nn', 'nns', 'nnp', 'vb', 'vbn'];

function setup() {
    noCanvas();
    RiTa.loadString('report.txt', onLoadComplete);
}

function onLoadComplete(data) {
    content = data.replace(/[\n\r\t]/g, ' ');
    sentences = RiTa.splitSentences(content);
    $('.button').click(update);
    $('#submit').click(search);
    $('#search').keypress(function(event) { if (event.which === 13) search(); });
    TweenLite.to($('a[name=corruption]'), 0.5, { opacity: 1, ease: Power4.easeOut });
    show('corruption');
}

function show(keyword) {
    for (var i in sentences) {
        var match = Boolean(String(sentences[i]).match(keyword));
        if (match) createElement('div', sentences[i]).class('quote');
    }
    var splitText = new SplitText('.quote', { type: 'words', wordsClass: 'word' });
    $('div.quote').each(function(index, value) {
        TweenLite.from(this, 1, { opacity: 0, y: 50, ease: Power4.easeOut, delay: index * 0.05 + 0.25 });
    });
    $('div.word').each(function(index) {
        var word = new RiString($(this).text().replace(/[,.%]/g, ''));
        var pos = word.pos();
        var match = Boolean(String(word).match(keyword));
        for (var i in pos) {
            pos[i] = String(pos[i]);
            for (var j in tags) {
                if (pos[i] === tags[j] && !match) $(this).addClass('pos');
            }
        }
        if (match) $(this).addClass('highlight');
    });
    $('div.highlight').each(function(index, value) {
        TweenLite.from(this, 2, { color: '#3e3e3e', ease: Power4.easeOut, delay: 1.1 });
    });
    $('div.pos').each(function(index, value) {
        TweenLite.from(this, 3, { color: '#3e3e3e', ease: Power4.easeOut, delay: 2 });
    });
}

function update(event) {
    $('div').remove();
    TweenLite.to($('a'), 0.5, { opacity: 0.4, ease: Power4.easeOut }); 
    TweenLite.to($('a[name=' + event.currentTarget.name + ']'), 0.5, { opacity: 1, ease: Power4.easeOut }); 
    show(event.currentTarget.name);
}

function search() {
    var keyword = $('#search').val();
    $('div').remove();
    TweenLite.to($('a'), 0.5, { opacity: 0.4, ease: Power4.easeOut });
    content.match(keyword) ? createElement('div', 'Results for \"' + keyword + '\"').class('info') : createElement('div', 'No results for \"' + keyword + '\"').class('info');
    show(keyword);
}