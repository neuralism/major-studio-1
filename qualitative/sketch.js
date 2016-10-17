var content;
var bribery = 'brib'
var corruption = 'corruption'

function setup() {
    noCanvas();
    RiTa.loadString('report.txt', onLoadComplete);
}

function onLoadComplete(data) {
    content = RiString(data).toString().replace(/[\n\r\t]/g, ' ');
    sentences = RiTa.splitSentences(content);
    select('.corruptBtn').mousePressed(clickCorrupt);
    select('.bribeBtn').mousePressed(clickBribe);
    show(bribery);
}

function show(keyword) {
        for (var i in sentences) {
            if (sentences[i].toString().match(keyword)) {
                createElement('div', sentences[i]).class('quote');
            }
        }
       
        $('div.quote').each(function(index, value) {
            TweenMax.from(this, 1, { opacity: 0, ease: Expo.easeOut, delay: index * 0.05 + 0.3 });
        });
       
        var splitText = new SplitText('.quote', { type: 'words', wordsClass: 'word' });
        
        $('div.word').each(function(index, value) {
                var word = RiString($(value).text());
                var pos = word.pos();
          
                //noun
                for (var j = 0; j < pos.length; j++) {
                    if (pos[j] === 'nn' || pos[j] === 'nns' || pos[j] === 'nnp' || pos[j] === 'nnps' || pos[j] === 'jj') {
                        $(value).addClass('noun');
                    }
                }
                
                //verb
                for (var k = 0; k < pos.length; k++) {
                    if (pos[k] === 'vb' || pos[k] === 'vbd' || pos[k] === 'vbg' || pos[k] === 'vbn' || pos[k] === 'vbp' || pos[k] === 'vbz') {
                        $(value).addClass('verb');
                    }
                }
            
                if (word.toString().match(keyword)) {
                    $(value).removeClass('noun');       
                    $(value).addClass('highlight');
                }
        });
        
        $('div.highlight').each(function(index, value) {
            TweenMax.from(this, 2, { color: '#666', ease: Expo.easeOut, delay: 1, overwrite: true });
        });
        
        $('div.noun').each(function(index, value) {
            TweenMax.from(this, 1, { color: '#666', ease: Expo.easeOut, delay: 2, overwrite: true });
        });
        
        $('div.verb').each(function(index, value) {
            TweenMax.from(this, 1, { color: '#666', ease: Expo.easeOut, delay: 2, overwrite: true });
        });
}

function clearScreen() {
    $('div.quote').each(function(index, value) { this.remove(); });
}

function clickCorrupt() {
    TweenMax.killAll();
    clearScreen();
    show('corrupt')
}

function clickBribe() {
    TweenMax.killAll();    
    clearScreen();
    show('brib')    
}

// ============

// var text = RiString(data).toString().replace(/[\n\r\t]/g, ' ');
//     var sentences = RiTa.splitSentences(text);

//     for (var i in sentences) {
//         if (sentences[i].toString().match(keyword)) {
            
//             var line = createElement('div', sentences[i]).class('quote');
//             createElement('br');
//             createElement('hr');
            
//         }
//     }
    
//     var st = new SplitText('.quote', { type: 'words', wordsClass: 'word' });
    
//     $('div.word').each(function(index, value) {
//         var word = RiString($(value).text());
//         var pos = word.pos();
        
//         // noun
//         for (var j = 0; j < pos.length; j++) {
//             if (pos[j] === 'nn' || pos[j] === 'nns' || pos[j] === 'nnp' || pos[j] === 'nnps') {
//                 $(value).addClass('noun');
//             }
//         }
        
//         // verb
//         for (var k = 0; k < pos.length; k++) {
//             if (pos[k] === 'vb' || pos[k] === 'vbd' || pos[k] === 'vbg' || pos[k] === 'vbn' || pos[k] === 'vbp' || pos[k] === 'vbz') {
//                 $(value).addClass('verb');
//             }
//         }

//         if (word.toString().match(keyword)) {
//             $(value).removeClass('noun');       
//             $(value).addClass('highlight');
//         }

//         TweenMax.from(this, 0.6, { opacity: 0, scale: 1, ease: Expo.easeOut, delay: index * 0.005, overwrite: true });
//         //TweenMax.from(this, 5, { scrambleText: { text:"faascascasc", chars:"lowerCase", ease: Expo.easeOut }})
//     });

    //select('.corruptionBtn').mousePressed(click);