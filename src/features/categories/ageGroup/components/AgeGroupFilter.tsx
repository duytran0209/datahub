import { Box, Grid, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Search } from '@mui/icons-material';
import { ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';

export interface AgeGroupFilterProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function AgeGroupFilter({ filter, onChange, onSearchChange }: AgeGroupFilterProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      searchAgeGrName: e.target.value,
      pageIndex: 1,
    };
    onSearchChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      pageIndex: 1,
      searchAgeGrName: undefined,
    };
    onChange(newFilter);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };
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
              defaultValue={filter.searchAgeGrName}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
