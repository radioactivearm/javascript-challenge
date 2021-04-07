// Double check that file is loaded in html
console.log('loaded app.js');


// grabbing the data from the data.js
var tableData = data;
console.log(tableData);

//------------------------------
// original population of table
var tbody = d3.select('tbody');

// populating table
tableData.forEach(entry => {
    var row = tbody.append('tr');
    Object.entries(entry).forEach(([key, ufo]) => {
        console.log(key, ufo);
        var cell = row.append('td');
        cell.text(ufo);
    });
});
//---------------------------------


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

    // using my filter function
    var filtData = filterByDate(tableData, date);

    // console.log(filtData);
    
    // testing forEach loop
    // filtData.forEach(entry => console.log(entry));

    // get tbody 
    var tbody = d3.select('tbody');

    //to clear out old data
    tbody.html('');

    // populating table with filterd data
    filtData.forEach(entry => {
        var row = tbody.append('tr');
        Object.entries(entry).forEach(([key, ufo]) => {
            console.log(key, ufo);
            var cell = row.append('td');
            cell.text(ufo);
        });
    });
}





