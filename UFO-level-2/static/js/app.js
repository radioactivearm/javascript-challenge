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

// This improved function should be able to handle years now too.
// incase say we added new data into the mix from say 2020.
function filterByDate(data, date) {
    var filteredData = data.filter(entry => {

        // splitting date into and array at '/'
        var dateArr = date.split('/');
        // checking to see how many elements are in the input
        // there are two it does the abbreviated method
        if (dateArr.length === 2) {

            // piecing back together date you entered
            var shortDate = dateArr[0].concat('/', dateArr[1]);

            // splitting part data date and putting back together as partial date
            var entryArr = entry.datetime.split('/');
            var shortEntry = entryArr[0].concat('/', entryArr[1]);
            // returning if they match
            if (shortEntry === shortDate) {
                return true;
            }
        }
        // if there are 3 it does the long form method
        else if (dateArr.length === 3) {
            // checking if long from dates match
            if (entry.datetime === date) {
                return true;
            }
        }
        // and if there is anything that doesn't fit that standard
        // it will return everything
        else {
            return true;
        }
    });
    // returning filtered data
    return filteredData;
}

// put in data first then city
function filterByCity(data, city) {
    var filteredData = data.filter(entry => entry.city.toLowerCase() === city.toLowerCase());
    return filteredData;
}

// functions that filters by state
function filterByState(data, state) {
    var filteredData = data.filter(entry => entry.state.toLowerCase() ===state.toLowerCase());
    return filteredData;
}

// Now to grab the button and form
var button = d3.select('#filter-btn');
var form = d3.select('#form');


// creating events
button.on('click', insertFilteredData);
form.on('submit', insertFilteredData);

// d3.selectAll('li').on('submit', function() {
//     var inputEntry = d3.select(this);
//     inputEntry.on('submit', insertFilteredData);
// });



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

    // selecting state input
    var stateInput = d3.select('#state');
    var state = stateInput.property('value');

    // using my filter functions
    // set up if statements to catch empty inputs

    // making a clone of tableData to filter on
    var filtData = tableData.map(item => item);

    // first we see if there is any thing in the date field
    // if so, we filter by it
    if (date !== '') {
        filtData = filterByDate(filtData, date);
    }
    // Then we do the same for city
    if (city !== '') {
        filtData = filterByCity(filtData, city);
    }
    // and again for state, but if it is empty we do nothing
    if (state !== '') {
        filtData = filterByState(filtData, state);
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





