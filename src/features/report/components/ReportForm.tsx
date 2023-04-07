import { yupResolver } from '@hookform/resolvers/yup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';

import { InputField, SelectField } from 'components/FormFields';
import { CheckboxesField } from 'components/FormFields/CheckboxesGroupField';
import { t } from 'i18next';
import { ReportCalculateModel } from 'models';
import { useForm } from 'react-hook-form';
import { indicatorUtils } from 'utils/Common';
import * as yup from 'yup';

export interface ReportFormProps {
  initialValues?: ReportCalculateModel;
  onSubmit: (formValues: ReportCalculateModel) => void;
}

const schema = yup.object().shape({});

const indicators = indicatorUtils.getAll();

export default function ReportForm({ initialValues, onSubmit }: ReportFormProps): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<ReportCalculateModel>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleReportFormSubmit = async (formValues: any) => {
    onSubmit?.(formValues);
  };

  const data = watch();

  return (
    <Box
      style={{
        backgroundColor: '#FFFFFF',
        padding: 15,
      }}
    >
      <form onSubmit={handleSubmit(handleReportFormSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Chọn kỳ báo cáo:</Typography>
          </Grid>
          <Grid item xs={4}>
            <InputField label="Năm" name="year" control={control} />
          </Grid>
          <Grid item xs={4}>
            <SelectField
              label="Chu kỳ"
              name="period"
              control={control}
              options={[
                {
                  label: t('Quarter'),
                  value: 1,
                },
                {
                  label: t('Month'),
                  value: 2,
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            {data.period == 1 && (
              <SelectField
                label="Quý"
                name="quarter"
                control={control}
                options={[1, 2, 3, 4].map((_) => ({
                  label: `${t('Quarter')} ` + _,
                  value: _,
                }))}
              />
            )}
            {data.period == 2 && (
              <SelectField
                label="Tháng"
                name="month"
                control={control}
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_) => ({
                  label: 'Tháng ' + _,
                  value: _,
                }))}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Chọn chỉ số:</Typography>
            <br />
            <Accordion style={{ width: '100%' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Nhóm chỉ số xét nghiệm (Đã chọn {data.indicators.filter((_) => _ < 3).length}/3)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CheckboxesField
                  name="indicators"
                  control={control}
                  label=""
                  options={indicators
                    .filter((_, i) => i < 3)
                    .map((_, i) => ({
                      label: _,
                      value: i,
                    }))}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Nhóm chỉ số PrEP (Đã chọn {data.indicators.filter((_) => 2 < _ && _ < 6).length}
                  /3)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CheckboxesField
                  name="indicators"
                  control={control}
                  label=""
                  options={indicators
                    .filter((_, i) => 2 < i && i < 6)
                    .map((_, i) => ({
                      label: _,
                      value: 3 + i,
                    }))}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Nhóm chỉ số ARV (Đã chọn {data.indicators.filter((_) => 5 < _ && _ < 12).length}
                  /6)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CheckboxesField
                  name="indicators"
                  control={control}
                  label=""
                  options={indicators
                    .filter((_, i) => 5 < i && i < 12)
                    .map((_, i) => ({
                      label: _,
                      value: 6 + i,
                    }))}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Nhóm chỉ số Dược (Đã chọn {data.indicators.filter((_) => 11 < _ && _ < 14).length}
                  /2)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CheckboxesField
                  name="indicators"
                  control={control}
                  label=""
                  options={indicators
                    .filter((_, i) => 11 < i && i < 14)
                    .map((_, i) => ({
                      label: _,
                      value: 12 + i,
                    }))}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Nhóm chỉ số BHYT (Đã chọn {data.indicators.filter((_) => 13 < _ && _ < 18).length}
                  /4)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CheckboxesField
                  name="indicators"
                  control={control}
                  label=""
                  options={indicators
                    .filter((_, i) => 13 < i && i < 18)
                    .map((_, i) => ({
                      label: _,
                      value: 14 + i,
                    }))}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
            >
              <Grid
                item
                style={{
                  paddingTop: '25px',
                }}
              >
                <Button type="submit" variant="contained">
                  {t('Apply')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
