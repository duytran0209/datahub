import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { ListParams, ReportCalculateModel, RequestStatus } from 'models';
import * as React from 'react';
import { t } from 'i18next';
import LinearProgressWithLabel from 'components/Common/LinearProgressWithLabel';
import { useEffect, useState } from 'react';
import reportApi from 'api/reportApi';

const indicators = [
  'Số KH HIV dương tính',
  'Số KH có kết luận nhiễm mới',
  'Số KH HIV dương tính được chuyển gửi điều trị thành công',
  'Số KH nhận ít nhất 1 dịch vụ trong kỳ',
  'Số KH mới điều trị lần đầu',
  'Tỷ lệ KH điều trị liên tục ≥ 3 tháng',
  'Số BN đang điều trị ARV',
  'Số BN mới điều trị ARV',
  'Số BN được cấp thuốc nhiều tháng',
  'Tỷ lệ BN có TLVR ≥ 50 bản sao/ml',
  'Số BN trễ hẹn điều trị',
  'Số BN điều trị dự phòng lao',
  'Tỉ lệ cảnh báo số lượng thuốc đủ cấp phát trong kỳ tiếp theo',
  'Tỉ lệ đánh giá hiệu quả dự trù và quản lý kho',
  'Số BN hiện nhận thuốc ARV qua BHYT',
  'Số BN điều trị ARV không được chi trả qua nguồn BHYT',
  'Số BN được cấp thuốc qua BHYT ≥ 3 tháng (84 ngày)',
  'Số BN XN TLVR do BHYT chi trả',
];

export interface ReportCalculateProgressProps {
  report?: ReportCalculateModel;
}

export const ReportCalculateProgress = ({ report }: ReportCalculateProgressProps) => {
  const [progress, setProgress] = useState(0);
  const total = report?.indicators.length;
  const [requests, setRequests] = useState<RequestStatus[]>([]);

  const handleRequestStatus = (index: number, status: number) => {
    if (requests) {
      let clone = [...requests];
      clone[index].status = status;
      setRequests(clone);
    }
  };

  const triggerRequests = async () => {
    console.log('trigger request', requests);
    for (let index = 0; index < requests.length; index++) {
      const request = requests[index];
      const params = {
        indicator: request.index,
        year: report?.year,
        quarter: report?.period == 2 ? null : report?.quarter,
        month: report?.period == 1 ? null : report?.month,
      };
      const response = await reportApi.calculateReport(params);
      if (response.succeed) {
        handleRequestStatus(index, 2);
      } else {
        handleRequestStatus(index, 3);
      }
    }
  };

  useEffect(() => {
    const calculateProgress = () => {
      setProgress(requests.filter((_) => _.status === 2 || _.status === 3).length);
    };
    calculateProgress();
    if (requests.filter((_) => _.status === 1).length === total) {
      triggerRequests();
    }
  }, [requests]);

  useEffect(() => {
    if (report && report.indicators) {
      const requests = report?.indicators.map((_) => ({
        index: _,
        status: 1,
      }));
      setRequests(requests);
    }
  }, [report, setRequests]);

  const getRequestStatus = (index: number) => {
    const request = requests.find((_) => _.index === index);
    if (request) {
      return request.status;
    }
    return -1;
  };

  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Kỳ báo cáo
            </Typography>
            <Grid container spacing={1.5}>
              <Grid item md={4}>
                <TextField
                  label={t('Chu kỳ')}
                  variant="outlined"
                  disabled
                  value={report?.period == 1 ? t('Quarter') : t('Month')}
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label={t('Năm')}
                  variant="outlined"
                  disabled
                  value={report?.year}
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label={report?.period == 1 ? t('Quarter') : t('Month')}
                  variant="outlined"
                  disabled
                  value={report?.period == 1 ? report.quarter : report?.month}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={12}>
        <LinearProgressWithLabel value={progress ?? 0} total={total} />
      </Grid>
      {/*
        Calculate report progress panel
      */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nhóm chỉ số xét nghiệm
                </Typography>
                <List
                  style={{
                    padding: 0,
                  }}
                >
                  {indicators.map(
                    (indicator, index) =>
                      index < 3 && (
                        <ListItem
                          key={indicator}
                          secondaryAction={
                            getRequestStatus(index) === 1 ? (
                              <CircularProgress size={15} />
                            ) : getRequestStatus(index) == 2 ? (
                              'success'
                            ) : getRequestStatus(index) == 3 ? (
                              'error'
                            ) : (
                              ''
                            )
                          }
                          style={{
                            padding: 0,
                          }}
                        >
                          <ListItemText primary={indicator} />
                        </ListItem>
                      )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nhóm chỉ số PrEP
                </Typography>
                <List
                  style={{
                    padding: 0,
                  }}
                >
                  {indicators.map(
                    (indicator, index) =>
                      2 < index &&
                      index < 6 && (
                        <ListItem
                          key={indicator}
                          secondaryAction={
                            getRequestStatus(index) === 1 ? (
                              <CircularProgress size={15} />
                            ) : getRequestStatus(index) == 2 ? (
                              'success'
                            ) : getRequestStatus(index) == 3 ? (
                              'error'
                            ) : (
                              ''
                            )
                          }
                          style={{
                            padding: 0,
                          }}
                        >
                          <ListItemText primary={indicator} />
                        </ListItem>
                      )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nhóm chỉ số Dược
                </Typography>
                <List
                  style={{
                    padding: 0,
                  }}
                >
                  {indicators.map(
                    (indicator, index) =>
                      11 < index &&
                      index < 14 && (
                        <ListItem
                          key={indicator}
                          secondaryAction={
                            getRequestStatus(index) === 1 ? (
                              <CircularProgress size={15} />
                            ) : getRequestStatus(index) == 2 ? (
                              'success'
                            ) : getRequestStatus(index) == 3 ? (
                              'error'
                            ) : (
                              ''
                            )
                          }
                          style={{
                            padding: 0,
                          }}
                        >
                          <ListItemText primary={indicator} />
                        </ListItem>
                      )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nhóm chỉ số ART
                </Typography>
                <List
                  style={{
                    padding: 0,
                  }}
                >
                  {indicators.map(
                    (indicator, index) =>
                      5 < index &&
                      index < 12 && (
                        <ListItem
                          key={indicator}
                          secondaryAction={
                            getRequestStatus(index) === 1 ? (
                              <CircularProgress size={15} />
                            ) : getRequestStatus(index) == 2 ? (
                              'success'
                            ) : getRequestStatus(index) == 3 ? (
                              'error'
                            ) : (
                              ''
                            )
                          }
                          style={{
                            padding: 0,
                          }}
                        >
                          <ListItemText primary={indicator} />
                        </ListItem>
                      )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nhóm chỉ số BHYT
                </Typography>
                <List
                  style={{
                    padding: 0,
                  }}
                >
                  {indicators.map(
                    (indicator, index) =>
                      13 < index &&
                      index < 18 && (
                        <ListItem
                          key={indicator}
                          secondaryAction={
                            getRequestStatus(index) === 1 ? (
                              <CircularProgress size={15} />
                            ) : getRequestStatus(index) == 2 ? (
                              'success'
                            ) : getRequestStatus(index) == 3 ? (
                              'error'
                            ) : (
                              ''
                            )
                          }
                          style={{
                            padding: 0,
                          }}
                        >
                          <ListItemText primary={indicator} />
                        </ListItem>
                      )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
