import React from 'react';
import { Box, Typography } from '@mui/material';

const Loading=() => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="300px"
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      p={3}
      bgcolor="background.paper"
    >
      <Typography variant="h6" mt={2} color="textSecondary">
       Loading....
      </Typography>
     
    </Box>
  );
};

export default Loading;
