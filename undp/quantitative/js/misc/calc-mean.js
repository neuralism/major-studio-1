var curCountry = "Angola";
var holder = 0;
var count = 0;
var mean = [];

var gov = [
['Angola', -1.28],
['Angola', -1.42],
['Angola', -1.45],
['Benin', -0.49],
['Benin', -0.67],
['Benin', -0.78],
['Botswana', 0.88],
['Botswana', 0.92],
['Botswana', 0.8],
['Burkina Faso', -0.15],
['Burkina Faso', -0.38],
['Burkina Faso', -0.53],
['Burundi', -0.97],
['Burundi', -1.07],
['Burundi', -1.19],
['Cameroon', -1.07],
['Cameroon', -0.92],
['Cameroon', -1.15],
['Cape Verde', 0.27],
['Cape Verde', 0.77],
['Cape Verde', 0.9],
['Central African Republic', -1.33],
['Central African Republic', -0.91],
['Central African Republic', -1.15],
['Chad', -1.28],
['Chad', -1.36],
['Chad', -1.23],
['Comoros', -0.84],
['Comoros', -0.78],
['Comoros', -0.53],
['Congo, Dem. Rep.', -1.43],
['Congo, Dem. Rep.', -1.36],
['Congo, Dem. Rep.', -1.29],
['Congo, Rep.', -0.84],
['Congo, Rep.', -1.18],
['Congo, Rep.', -1.22],
['Ivory Coast', -1.22],
['Ivory Coast', -1.08],
['Ivory Coast', -0.41],
['Djibouti', -0.51],
['Djibouti', -0.29],
['Djibouti', -0.49],
['Ethiopia', -0.72],
['Ethiopia', -0.72],
['Ethiopia', -0.43],
['Gabon', -0.76],
['Gabon', -0.94],
['Gabon', -0.64],
['Gambia, The', -0.59],
['Gambia, The', -0.56],
['Gambia, The', -0.68],
['Ghana', -0.22],
['Ghana', 0.03],
['Ghana', -0.21],
['Guinea', -0.84],
['Guinea', -1.05],
['Guinea', -1.07],
['Guinea-Bissau', -1.14],
['Guinea-Bissau', -1.1],
['Guinea-Bissau', -1.51],
['Kenya', -0.8],
['Kenya', -1.08],
['Kenya', -0.94],
['Lesotho', -0.19],
['Lesotho', 0.16],
['Lesotho', 0.15],
['Liberia', -1.27],
['Liberia', -0.56],
['Liberia', -0.78],
['Madagascar', -0.12],
['Madagascar', -0.19],
['Madagascar', -0.8],
['Malawi', -0.76],
['Malawi', -0.38],
['Malawi', -0.76],
['Mali', -0.5],
['Mali', -0.64],
['Mali', -0.72],
['Mauritania', -0.37],
['Mauritania', -0.56],
['Mauritania', -0.92],
['Mauritius', 0.34],
['Mauritius', 0.63],
['Mauritius', 0.45],
['Mozambique', -0.59],
['Mozambique', -0.42],
['Mozambique', -0.7],
['Namibia', 0.12],
['Namibia', 0.25],
['Namibia', 0.23],
['Niger', -0.85],
['Niger', -0.61],
['Niger', -0.63],
['Nigeria', -1.3],
['Nigeria', -0.98],
['Nigeria', -1.27],
['Rwanda', -0.48],
['Rwanda', 0.13],
['Rwanda', 0.83],
['São Tomé and Principe', -0.6],
['São Tomé and Principe', -0.39],
['São Tomé and Principe', -0.16],
['Senegal', -0.05],
['Senegal', -0.53],
['Senegal', 0.02],
['Seychelles', 0.2],
['Seychelles', 0.31],
['Seychelles', 0.37],
['Sierra Leone', -0.88],
['Sierra Leone', -0.94],
['Sierra Leone', -0.95],
['Somalia', -1.78],
['Somalia', -1.72],
['Somalia', -1.69],
['South Africa', 0.48],
['South Africa', 0.14],
['South Africa', -0.11],
['South Sudan', -1.61],
['Sudan', -1.28],
['Sudan', -1.21],
['Sudan', -1.45],
['Swaziland', -0.58],
['Swaziland', -0.2],
['Swaziland', -0.36],
['Tanzania', -0.58],
['Tanzania', -0.44],
['Tanzania', -0.8],
['Togo', -0.93],
['Togo', -1.03],
['Togo', -0.92],
['Uganda', -0.75],
['Uganda', -0.89],
['Uganda', -1.1],
['Zambia', -0.68],
['Zambia', -0.51],
['Zambia', -0.41],
['Zimbabwe', -1.31],
['Zimbabwe', -1.32],
['Zimbabwe', -1.39],
];

function calc_mean(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i][0] === curCountry) {
            count++
            holder += data[i][1];
        } else {
            mean.push([curCountry, holder/count]);
            holder = 0;
            count = 0;
            curCountry = data[i][0];
            count++
            holder += data[i][1];
        }
    }
    
    for (var i = 0; i < mean.length; i++) {
        console.log(mean[i][0]);
        // console.log(mean[i][1].toFixed(2));
        // console.log(mean[i][0] + " " + mean[i][1].toFixed(2));
    }
}

calc_mean(gov);