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


// This takes in a abbreviated date and data and filters the data to return
// only data with that date
// I wrote it this way because I didn't like typing in 2010
// BUT! function should handle both abbreviated and long form dates.
function filterByDate(data, date) {
    var filteredData = data.filter(entry => {
        var entryArr = entry.datetime.split('/');
        var shortEntry = entryArr[0].concat('/', entryArr[1]);
        var dateArr = date.split('/');
        var shortDate = dateArr[0].concat('/', dateArr[1]);
        if (shortEntry === shortDate) {
            return true;
        }
    });
    return filteredData;
}

// put in data first then city
function filterByCity(data, city) {
    var filteredData = data.filter(entry => entry.city.toLowerCase() === city.toLowerCase());
    return filteredData;
}

// Now to grab the button and form
var button = d3.select('#filter-btn');
var form = d3.selectAll('#form');


// creating events
button.on('click', insertFilteredData);
form.on('submit', insertFilteredData);





function insertFilteredData() {

    // stop from refreshing page
    d3.event.preventDefault();
    
    // selecting the date input field
    var dateInput = d3.select('#datetime');
    // grabbing input field's text
    var date = dateInput.property('value');

    // selecting city input
    var cityInput = d3.select('#city');
    var city = cityInput.property('value');


    // using my filter functions
    // set up if statements to catch empty inputs

    // making a clone of tableData to filter on
    var filtData = tableData.map(item => item);

    if (date !== '') {
        var filtData = filterByDate(filtData, date);
    }

    if (city !== '') {
        filtData = filterByCity(filtData, city);
    }
    

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





