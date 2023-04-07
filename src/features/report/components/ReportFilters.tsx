import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { t } from 'i18next';
import { ListParams } from 'models';
import { ChangeEvent, useEffect, useState } from 'react';
import { indicatorUtils } from 'utils/Common';

export interface ReportFilterrops {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

const indicatorOptions = (indicatorUtils.indicators ?? []).map((_: string, i: number) => ({
  label: _,
  id: i,
}));

export default function ReportFilters({ filter, onChange, onSearchChange }: ReportFilterrops) {
  const [year, setYear] = useState(filter.year ?? '');
  const [quarter, setQuarter] = useState(filter.quarter ?? '');
  const [month, setMonth] = useState(filter.month ?? '');
  const [monthList, setMonthList] = useState<number[]>();
  const [indicator, setIndicator] = useState(filter.indicator ?? '');
  const [indicatorOption, setIndicatorOption] = useState<any>();

  useEffect(() => {
    const f = indicatorOptions?.find((s) => s.id == indicator);
    if (f) {
      setIndicatorOption({
        label: f.label,
        id: f.id,
      });
    } else {
      setIndicatorOption('');
    }
  }, [indicator, indicatorOptions]);

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleQuarterChange = (e: SelectChangeEvent) => {
    setQuarter(e.target.value);
  };

  useEffect(() => {
    let monthInQuarter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(
      (_) => Math.trunc((_ - 1) / 3) === quarter - 1
    );
    setMonthList(monthInQuarter);
  }, [quarter]);

  const handleMonthChange = (e: SelectChangeEvent) => {
    setMonth(e.target.value);
  };

  const handleIndicatorChange = (event: any, newValue: any | null) => {
    console.log(newValue);
    if (newValue) {
      setIndicator(newValue.id);
    } else {
      setIndicator('');
    }
  };

  const handleOnFilterChange = () => {
    if (!onChange) return;

    let from;
    let to;
    if (year) {
      if (quarter) {
        from = new Date(year, quarter * 3 - 3, 1).toLocaleDateString();
        to = new Date(year, quarter * 3, 0).toLocaleDateString();
      }
      if (month) {
        from = new Date(year, month - 1, 1).toLocaleDateString();
        to = new Date(year, month, 0).toLocaleDateString();
      }
    }
    const newFilter = { ...filter, pageIndex: 0, year, quarter, month, indicator, from, to };
    onChange(newFilter);
  };

  const handleOnReset = () => {
    setYear('');
    setQuarter('');
    setMonth('');
    setIndicator('');
    if (!onChange) return;
    const newFilter = {
      ...filter,
      pageIndex: 0,
      reportingPeriod: 0,
      year: '',
      quarter: '',
      month: '',
      facility: '',
    };
    onChange(newFilter);
  };

  return (
    <Toolbar style={{ backgroundColor: 'white', minHeight: 120 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Autocomplete
            fullWidth
            value={indicatorOption}
            onChange={handleIndicatorChange}
            getOptionLabel={(option) => option.label}
            options={indicatorOptions}
            size="small"
            renderInput={(params) => <TextField {...params} label="Chỉ số" />}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            id="searchByYear"
            label={t('Year')}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={year}
            size="small"
            onChange={handleYearChange}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="outlined-quarter-always-notched" shrink>
              {t('Quarter')}
            </InputLabel>
            <Select
              value={quarter}
              onChange={handleQuarterChange}
              input={
                <OutlinedInput
                  label={t('Quarter')}
                  notched
                  name="quarter"
                  id="outlined-quarter-always-notched"
                />
              }
              size="small"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="outlined-month-always-notched" shrink>
              {t('Month')}
            </InputLabel>
            <Select
              value={month}
              onChange={handleMonthChange}
              input={
                <OutlinedInput
                  label={t('Month')}
                  notched
                  name="month"
                  id="outlined-month-always-notched"
                />
              }
              size="small"
            >
              {monthList?.map((m) => (
                <MenuItem value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
            <Grid item>
              <Button
                variant="outlined"
                color="error"
                endIcon={<ReplayIcon />}
                onClick={handleOnReset}
              >
                {t('Clear Filter')}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" endIcon={<FilterAltIcon />} onClick={handleOnFilterChange}>
                {t('Apply')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
