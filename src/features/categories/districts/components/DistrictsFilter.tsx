import { Box, Grid, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Search } from '@mui/icons-material';
import { ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';

export default function DistrictsFilter() {
 

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Tìm kiếm</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Tìm kiếm"
              endAdornment={<Search />}          
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
