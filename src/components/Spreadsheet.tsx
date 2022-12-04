import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import Cell from 'components/Cell';
import CellHeader from 'components/CellHeader';

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;

const Spreadsheet: React.FC = () => {
  const [cellState, setCellState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );

  const [currentCell, setCurrentCell] = useState([]);
  const handleClick = (event, rowId, columnId) => {
    setCurrentCell([rowId, columnId]);
  }

  const checkDirection = event => {
    switch (event.keyCode) {
      case 37:
        return 'left';
        break;
      case 38:
       return 'up';
        break;
      case 39:
        return 'right';
        break;
      case 40:
        return 'down';
        break;
    }
  }

  const handleMove = event => {
    if (currentCell === 0) {
      return;
    }

    const row = currentCell[0] || 0;
    const column = currentCell[1] || 0;
    const cells = cellState;
    const cellValue = cellState[row][column];

    if (cellValue === '') {
      return;
    }

    const direction = checkDirection(event);

    let newRow = row;
    let newColumn = column;

    if (direction === 'left') {
      newColumn = column !== 0 ? column - 1 : 0;
    } else if (direction === 'up') {
      newRow = row !== 0 ? row - 1 : 0;
    } else if (direction === 'right') {
      newColumn = column < NUM_COLUMNS - 1 ? column + 1 : NUM_COLUMNS - 1;
    } else if (direction === 'down') {
      newRow = row < NUM_ROWS - 1 ? row + 1 : NUM_ROWS - 1;
    }

    // Update cells with new value.
    cells[newRow][newColumn] = cellValue;
    cells[row][column] = '';
    setCellState(cells);
  }

  console.log(cellState);

  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  return (
    <Box width="full">
      {cellState.map((row, rowIdx) => {
        return (
          <>
            {rowIdx === 0 && (
              <Flex key="column-headers">
                <CellHeader value="" isHeader={true} />
                {[...Array(NUM_COLUMNS)].map((e, i) => <CellHeader value={alphabet[i]} isHeader={true} />)}
              </Flex>
            )}
            <Flex key={String(rowIdx)}>
              <CellHeader value={String(rowIdx + 1)} isHeader={true} />
              {row.map((cellValue, columnIdx) => {
                return (
                  <Cell
                    key={`${rowIdx}/${columnIdx}`}
                    value={cellValue}
                    onChange={(newValue: string) => {
                      const newRow = [
                        ...cellState[rowIdx].slice(0, columnIdx),
                        newValue,
                        ...cellState[rowIdx].slice(columnIdx + 1),
                      ];
                      setCellState([
                        ...cellState.slice(0, rowIdx),
                        newRow,
                        ...cellState.slice(rowIdx + 1),
                      ]);
                    }}
                    rowId={rowIdx}
                    columnId={columnIdx}
                    onClick={handleClick}
                    onKeyDown={handleMove}
                  />
                );
              })}
            </Flex>
          </>
        );
      })}
    </Box>
  );
};

export default Spreadsheet;
