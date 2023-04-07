import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { Button, LinearProgress, Typography } from '@mui/material';
import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import drugHistoryApi from 'api/drugHistoryApi';
import { t } from 'i18next';
import { DrugHistory, ResponseMessage } from 'models';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReportTable from '../components/ReportTable';

const theme = createTheme({}, viVN);

export default function DetailPage() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [report, setReport] = useState<DrugHistory>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data: ResponseMessage<DrugHistory> = await drugHistoryApi.getById(id);
        setLoading(false);
        setReport(data.data);
      } catch (error) {
        toast.error(t('Get data failed'));
      }
    })();
  }, [id]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 20 }}>
        <Button
          startIcon={<ChevronLeft />}
          onClick={() => {
            history.push('/drug-histories');
          }}
        >
          {t('Back to report list')}
        </Button>
        {loading && <LinearProgress />}
        {report && (
          <>
            <Typography variant="h6" align="center">
              {t('BÁO CÁO TÌNH HÌNH SỬ DỤNG VÀ TỒN KHO THUỐC ARV TẠI CƠ SỞ ĐIỀU TRỊ')}
            </Typography>
            <Typography align="center">
              {t('NĂM')} {report?.year} ({report?.from.toString().split('T')[0]} -{' '}
              {report?.to.toString().split('T')[0]})
            </Typography>
            <Typography align="center">
              {t('Cơ sở điều trị')}: {report?.siteName}
            </Typography>
            <br />
            <ReportTable data={report?.details ?? []} />
          </>
        )}
        {!report && <p>{t('No data')}</p>}
      </div>
    </ThemeProvider>
  );
}
