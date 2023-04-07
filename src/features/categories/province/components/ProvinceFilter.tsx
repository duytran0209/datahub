import { Search } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ListParams } from 'models';
import { ChangeEvent, useRef } from 'react';

export interface ProvinceFiltersProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function ProvinceFilters({
  filter,
  onChange,
  onSearchChange,
}: ProvinceFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name: e.target.value,
      pageIndex: 1,
    };
    onSearchChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      pageIndex: 1,
      searchName: undefined,
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
          <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: '15px' }}>
            <InputLabel htmlFor="searchByName">Tìm kiếm</InputLabel>
            <OutlinedInput
              style={{ borderRadius: '5px', backgroundColor: '#FFFF' }}
              id="searchByName"
              label="Tìm kiếm"
              endAdornment={<Search />}
              defaultValue={filter.name}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
