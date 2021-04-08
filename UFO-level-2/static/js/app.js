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

// function that filters by state
function filterByState(data, state) {
    var filteredData = data.filter(entry => entry.state.toLowerCase() === state.toLowerCase());
    return filteredData;
}

// function that filters by country
function filterByCountry(data, ctry) {
    var filteredData = data.filter(entry => entry.country.toLowerCase() === ctry.toLowerCase());
    return filteredData;
}

// function that filters by shape
function filterByShape(data, shape) {
    var filteredData = data.filter(entry => entry.shape.toLowerCase() === shape.toLowerCase());
    return filteredData;
}

// this function is designed to filter the data by looking for words included in the string contained
// in the comments element
function filterByComment(data, word) {
    var filteredData = data.filter(entry => entry.comments.toLowerCase().includes(word.toLowerCase()));
    // the toLowerCase is important here because you don't know where in the sentence the word lives
    // the includes is what makes this work the way I want it to 
    return filteredData;
}


// Now to grab the button and form
var button = d3.select('#filter-btn');
var form = d3.select('#form');
var clear = d3.select('#clear-btn');


// creating events
button.on('click', insertFilteredData);
form.on('submit', insertFilteredData);
clear.on('click', clearFilter);


// d3.selectAll('li').on('submit', function() {
//     var inputEntry = d3.select(this);
//     inputEntry.on('submit', insertFilteredData);
// });



function insertFilteredData() {

    // stop from refreshing page
    d3.event.preventDefault();
    
    // selecting the date input field and its value
    var date = d3.select('#datetime').property('value');

    // selecting city 
    var city = d3.select('#city').property('value');

    // selecting state
    var state = d3.select('#state').property('value');

    // selecting country 
    var country = d3.select('#country').property('value');

    // selecting shape input and its value
    var shape = d3.select('#shape').property('value');

    // selecting comment input and its value
    var word = d3.select('#comment').property('value');

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
    // filter once again by country, if empty again nothing happens
    if (country !== '') {
        filtData = filterByCountry(filtData, country);
    }
    if (shape !== '') {
        filtData = filterByShape(filtData, shape);
    }
    if (word !== '') {
        filtData = filterByComment(filtData, word);
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

function clearFilter() {

    // stop from refreshing page
    d3.event.preventDefault();
   
    // getting a hold of handles for filter forms
    filterArr = [d3.select('#datetime'), d3.select('#city'), d3.select('#state'),
            d3.select('#country'), d3.select('#shape'), d3.select('#comment')];

    for (i=0; i < filterArr.length; i++) {
        filterArr[i].property('value', '');
    }

    insertFilteredData()

}



