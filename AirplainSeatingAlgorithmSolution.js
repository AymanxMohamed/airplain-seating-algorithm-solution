/// {author}: Ayman kheireldeen
/// {date} : 2023-04-13 - 10:00 AM
/// {duration} : 2Hrs 30 min Approximatily
/// {Time Complixity} : O(n) * MAX Number of Rows * total number of blocks

var getPassengerSeats = (seatsBlocks, numberOfPassengers) => {
    let windowSeats = [],
        middleSeats = [],
        aisleSeats = [],
        numberOfblocks = seatsBlocks.length,
        currentPassengerNumber = 1;
    const MAX_PASSENGER_NUMBER = numberOfPassengers,
        MAX_ROW_NUMBER = getMaxRowNumber(seatsBlocks);

    // First Block
    let currentRow = 0;
    for (let j = 0; j < MAX_ROW_NUMBER; j++) {
        // n = 4
        for (let i = 0; i < numberOfblocks; i++) {
            // n = 4
            // O (n) * 4 (max_Row_number) * 4 (number of blocks)
            fillSeatsFromBlock(seatsBlocks[i], i, numberOfblocks, windowSeats, middleSeats, aisleSeats, currentRow);
        }
        currentRow++;
    }
    let seats = [...aisleSeats, ...windowSeats, ...middleSeats];
    for (let i = 0; i < aisleSeats.length; i++) {
        aisleSeats[i].passengerNumber = currentPassengerNumber;
        currentPassengerNumber++;
        if (currentPassengerNumber > MAX_PASSENGER_NUMBER) return seats;
    }
    for (let i = 0; i < windowSeats.length; i++) {
        windowSeats[i].passengerNumber = currentPassengerNumber;
        currentPassengerNumber++;
        if (currentPassengerNumber > MAX_PASSENGER_NUMBER) return seats;
    }
    for (let i = 0; i < middleSeats.length; i++) {
        middleSeats[i].passengerNumber = currentPassengerNumber;
        currentPassengerNumber++;
        if (currentPassengerNumber > MAX_PASSENGER_NUMBER) return seats;
    }
};

var fillSeatsFromBlock = (block, blockIndex, numberOfblocks, windowSeats, middleSeats, aisleSeats, rowIndex) => {
    let numberOfColumns = block[0];
    let numberOfRows = block[1];

    if (!isValidRow(rowIndex, numberOfRows)) return;

    for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
        let seat = {
            blockNumber: blockIndex + 1,
            columnNumber: colIndex + 1,
            rowNumber: rowIndex + 1,
            passengerNumber: undefined
        };
        if (isWindowSeat(blockIndex, colIndex, numberOfblocks, numberOfColumns)) {
            // we are dealing with window seals
            seat.type = 'window';
            windowSeats.push(seat);
        } else if (isMiddleSeat(colIndex, numberOfColumns)) {
            seat.type = 'middle';
            middleSeats.push(seat);
        } else {
            seat.type = 'aisle';
            aisleSeats.push(seat);
        }
    }
};

let seatsBlocks = [
    [3, 2],
    [4, 3],
    [2, 3],
    [3, 4]
];

let seats = getPassengerSeats(seatsBlocks, numberOfPassengers);

//#region Helper Methods
var isFirstBlock = blockIndex => blockIndex == 0;
var isLastBlock = (blockIndex, numberOfblocks) => blockIndex == numberOfblocks - 1;
var isFirstColumn = columnIndex => columnIndex == 0;
var isLastColumn = (columnIndex, numberOfColumns) => columnIndex == numberOfColumns - 1;

var isWindowSeat = (blockIndex, columnIndex, numberOfblocks, numberOfColumns) =>
    (isFirstBlock(blockIndex) && isFirstColumn(columnIndex)) ||
    (isLastBlock(blockIndex, numberOfblocks) && isLastColumn(columnIndex, numberOfColumns));

var isMiddleSeat = (columnIndex, numberOfColumns) =>
    !isFirstColumn(columnIndex) && !isLastColumn(columnIndex, numberOfColumns);

var isValidRow = (rowIndex, numberOfRows) => rowIndex < numberOfRows;
var getMaxRowNumber = seatsBlocks => {
    let max = -1;
    for (let i = 0; i < seatsBlocks.length; i++) {
        let currentMax = seatsBlocks[i][1];
        if (currentMax > max) max = currentMax;
    }
    return max;
};
//#endregion
