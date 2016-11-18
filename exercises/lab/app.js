var stooges = [{name: 'moe', age: -2}, {name: 'moe', age: -1}, {name: 'larry', age: 1}, {name: 'curly', age: 0}, {name: 'larry', age: 2}];
stooges = _.sortBy(stooges, 'age').reverse();



console.log(stooges);