# javascript-challenge
This is my repo for my javascript homework for U of M data science bootcamp.

# Function
The function of this project is to apply filters to a set of data and then return that data in a table on the webpage.

## HTML
I decided to do a rather simple approach the html on this project. I imported some preset stylings from bootstrap that were given in the starter code, and i liked how it looked right off the bat, so I just left it how it was. I works and is easy to read, which is really what matters.


## UFO-1

### Filters
1. Date
    * I was tasked with filtering by a `MM/DD/YYYY` formated date. I noticed that all the data entries where the same year so I made a function where you would only have to put in the `MM/DD`, but there is a possibilty of new data being appended. So, I updated the function to handle either form of `MM/DD` or `MM/DD/YYYY`, meaning you can enter either form date into the filter and it works.

## UFO-2

### Filters
1. Date
    * This is the exact same code as from UFO-1 and functions the same. Meaning it can handle either `NN/DD` or `MM/DD/YYYY` form of date.
1. City
    * This filters by city, and is not case sensitive.
1. State
    * This filters by state abbr, and again is not case sensitive.
1. Country
    * This filters by country abbr, and also is not case sensitive.
1. Shape
    * This filters by the shape ufo, again, is not case sensitive.
1. Comment
    * This is an extra feature I added. This filters by a word or phrase that is included in the comment element of the data object. I made it not case sensitive to handle words at the beginning of sentences. 

### Buttons
1. Filter
    * This just is a way of indicating a change event.
1. Clear Filters
    * This is another extra feature I added. It selects all the filter objects and replaces there values with an empty string.


