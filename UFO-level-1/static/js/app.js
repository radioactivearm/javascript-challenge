// Double check that file is loaded in html
console.log('loaded app.js');


// grabbing the data from the data.js
var tableData = data;
console.log(tableData);


// I want to start by writing a function that filters by a inputed data
// takes in data and date and returns filtered data
function filterByDate(data, date) {
    var filteredData = data.filter(entry => entry.datetime.includes(date));
    return filteredData;
}
console.log('From Function')
console.log(filterByDate(tableData, '1/1/2010'));


var filteredData = tableData.filter(data => data.datetime === '1/1/2010');
console.log('not From Function')
console.log(filteredData);