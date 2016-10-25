var hash = [];
var sorted = [];
var tags = ['nn','nns', 'nnp', 'nnps'];
var count = 0;

function setup() {
    RiTa.loadString('data-2016.txt', loadComplete);
}

function loadComplete(d) {
// 
    var data = RiString(d.replace(/[.,?!@#$%^&*()_~{}–;:“”‘-。]/g, ''))
    var words = data.words();
    
    for (var i = 0; i < words.length; i++) {
        var word = String(words[i]).toLowerCase();
        if (hash[word] >= 1) {
            hash[word] += 1;
        } else { 
            hash[word] = 1;
        }
    }
    
    for (var i in hash) {
        //push into sorted array the word and the count
        // console.log(i + ' / ' + hash[i])
        sorted.push([i, hash[i], String(RiString(i).pos())]);
    }
    
    sorted.sort(function(a, b) {
        a = a[1];
        b = b[1];
        return a < b ? 1 : (a > b ? -1 : 0);
    });
    
    for (var i in sorted) {
        for (var k in tags) {
            if (sorted[i][2] === tags[k] && sorted[i][1] >= 0) {
                console.log(sorted[i][0] + ' / ' + sorted[i][1]);
                count++;
            }
        }
    }
    console.log(count);
}