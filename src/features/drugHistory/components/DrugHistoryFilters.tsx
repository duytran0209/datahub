import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
} from '@mui/material';
import { t } from 'i18next';
import { ListParams } from 'models/common';
import { ChangeEvent, useEffect, useState } from 'react';

export interface IDrugHistoryFitlersProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
}

export default function DrugHistoryFitlers({ filter, onChange }: IDrugHistoryFitlersProps) {
  const [reportingPeriod, setReportingPeriod] = useState(filter.reportingPeriod);
  const [year, setYear] = useState(filter.year ?? '');
  const [quarter, setQuarter] = useState(filter.quarter ?? '');
  const [month, setMonth] = useState(filter.month ?? '');
  const [monthList, setMonthList] = useState<number[]>();
  const [facility, setFacility] = useState(filter.facility ?? '');

  const handleReportingPeriodChange = (e: SelectChangeEvent) => {
    setReportingPeriod(e.target.value);
  };

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

  const handleFacilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFacility(e.target.value);
  };

  const handleOnFilterChange = () => {
    if (!onChange) return;
    const newFilter = { ...filter, pageIndex: 0, reportingPeriod, year, quarter, month, facility };
    onChange(newFilter);
  };

  const handleOnReset = () => {
    setReportingPeriod(1);
    setYear('');
    setQuarter('');
    setMonth('');
    setFacility('');
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
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="reporting-period">{t('Reporting period')}</InputLabel>
            <Select
              labelId={t('Reporting period')}
              id={t('Reporting period')}
              value={reportingPeriod}
              label={t('Reporting period')}
              onChange={handleReportingPeriodChange}
              size="small"
            >
              <MenuItem value={0}>{t('Month')}</MenuItem>
              <MenuItem value={1}>{t('Quarter')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="searchByFacility"
            label={t('Site name')}
            InputLabelProps={{
              shrink: true,
            }}
            value={facility}
            onChange={handleFacilityChange}
            size="small"
            InputProps={{ inputProps: { min: 1, max: 4 } }}
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
