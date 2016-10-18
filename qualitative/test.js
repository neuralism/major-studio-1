var array = ['sup', 'dawg', '2000', 4000];

for (var i = 0; i < array.length; i++) {
    var rs = RiString(array[i]);
    var pos = rs.pos();
    console.log(pos.length);
}