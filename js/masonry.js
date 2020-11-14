// configuration
var defaultWidth = 350;
var distance = 10;
var containerLookup = '.container';

// no need to change the code below
var savedWidth = 0;

function findShortestColumn(columnsHeight, numberOfColumns) {
    var shortest = 0;
    var shortestValue = -1;
    for (var i = 0; i < numberOfColumns; i++) {
        if ((shortestValue > columnsHeight[i]) || (shortestValue == -1)) {
            shortest = i;
            shortestValue = columnsHeight[i];
        }
    }
    return shortest;
}

function findLongestColumnHeight(columnsHeight, numberOfColumns) {
    var longest = 0;
    var longestValue = 0;
    for (var i = 0; i < numberOfColumns; i++) {
        if (longestValue < columnsHeight[i]) {
            longest = i;
            longestValue = columnsHeight[i];
        }
    }
    return columnsHeight[longest];
}

function positionGridImages() {
    var columnsHeight = [];
    var containerWidth = $(containerLookup).width();
    var numberOfColumns = Math.max(Math.round(containerWidth / defaultWidth), 1);
    var elementWidth = Math.round((containerWidth - ((numberOfColumns + 1) * distance)) / numberOfColumns);
    
    for (var i = 0; i < numberOfColumns; i++) {
        columnsHeight[i] = 0;
    }

    // set widths of all items to elementWidth
    $('.masonry-item').width(elementWidth + 'px');

    // set individual heights - for each item
    $('.masonry-item').each(function () {
        heightToSet = $(this).find('img').first().height();
        $(this).height(heightToSet + 'px');
    })

    // set positions - calculate left and top for each item
    $('.masonry-item').each(function () {
        columnToFill = findShortestColumn(columnsHeight, numberOfColumns);

        leftToSet = ((columnToFill * (distance + elementWidth)) + distance);
        topToSet = columnsHeight[columnToFill] + distance;

        $(this).css('left', leftToSet + 'px').css('top', topToSet + 'px');

        // save column height for the column that was filled with this item
        columnsHeight[columnToFill] += distance + $(this).height();
    })

    // set the size of the whole masonry
    $('.masonry').height(
        (findLongestColumnHeight(columnsHeight, numberOfColumns) + distance) + 'px'
    );

    savedWidth = containerWidth;
}

function checkMasonrySize() {
    if (savedWidth != $(containerLookup).width()) {
        positionGridImages();
    };
}

$(function () {
    setInterval(checkMasonrySize, 500);
});