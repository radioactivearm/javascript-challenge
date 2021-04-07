// Double check that file is loaded in html
console.log('loaded app.js');


// grabbing the data from the data.js
var tableData = data;
console.log(tableData);


// I want to start by writing a function that filters by a inputed data
// takes in data and date and returns filtered data works with half a date like '1/5'
function filterByDate(data, date) {
    var filteredData = data.filter(entry => entry.datetime.includes(date));
    return filteredData;
}

// Now to grab the button and form
var button = d3.select('#filter-btn');
var form = d3.select('#form');

// creating events
button.on('click', insertFilteredData);
form.on('submit', insertFilteredData);

function insertFilteredData() {

    // stop from refreshing page
    d3.event.preventDefault();
    
    // selecting the input field
    var input = d3.select('input');

    // grabbing input field's text
    date = input.property('value');

    var filtData = filterByDate(tableData, date);

    console.log(filtData);

}





