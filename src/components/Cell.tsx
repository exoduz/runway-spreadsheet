import React, { useCallback, useEffect, useState } from 'react';
import { Input, Box } from '@chakra-ui/react';

interface Props {
  value: string;
  rowId: number;
  columnId: number;
  onChange: (newValue: string) => void;
  onClick: (newValue: string) => void;
  onKeyDown: (newValue: string) => void;
}

const Cell: React.FC<Props> = ({ value, rowId, columnId, onChange, onClick, onKeyDown }) => {
  // Should be put in utility functions file.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const [outputValue, setOutputValue] = useState('')
  useEffect(() => {
    const debounce = setTimeout(() => {
      Number(outputValue)
        ? setOutputValue(formatter.format(outputValue))
        : setOutputValue(outputValue);
    }, 300)

    return () => clearTimeout(debounce)
  }, [outputValue])

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      const value = ev.target.value;
      onChange(value);
      setOutputValue(value);
    },
    [onChange],
  );

  return (
    <Box>
      <Input
        value={outputValue}
        borderRadius={0}
        width="full"
        onChange={onChangeHandler}
        onClick={event => onClick(event, rowId, columnId)}
        onKeyDown={onKeyDown}
      />
    </Box>
  );
};

export default Cell;
