import { Input, Box } from '@chakra-ui/react';
import React, { useCallback } from 'react';

interface Props {
  value: string;
}

const CellHeader: React.FC<Props> = ({ value }) => {
  return (
    <Box>
      <Input
        className="cell-header"
        value={value}
        borderRadius={0}
        width="full"
        readOnly={true}
      />
    </Box>
  );
};

export default CellHeader;