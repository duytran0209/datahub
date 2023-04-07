import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReportCalculateModel } from 'models';
import ReportForm from '../components/ReportForm';
import { useState } from 'react';
import { ReportCalculateProgress } from '../components/ReportCalculateProgress';

const theme = createTheme({}, viVN);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      padding: 20,
    },
    titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',

      marginBottom: 16,
    },

    loading: {
      position: 'absolute',
      top: -8,
      width: '100%',
    },
    filter: {
      width: '100%',
      display: 'flex',
      justifyItems: 'space-between',
      alignItems: 'center',
    },
  })
);

const now = new Date();
now.setDate(0);

let initialValues: ReportCalculateModel = {
  year: now.getFullYear(),
  period: 2,
  month: now.getMonth() + 1,
  indicatorGroups: [0, 1, 2, 3, 4],
  indicators: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
} as ReportCalculateModel;

export function CalculateReportPage() {
  const classes = useStyles();
  const [step, setStep] = useState<number>(1);
  const [report, setReport] = useState<ReportCalculateModel>();

  const handleSubmit = (formValues: ReportCalculateModel) => {
    setReport(formValues);
    setStep(2);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.page}>
        {step === 1 && <ReportForm initialValues={initialValues} onSubmit={handleSubmit} />}
        {step === 2 && <ReportCalculateProgress report={report} />}
      </div>
    </ThemeProvider>
  );
}
