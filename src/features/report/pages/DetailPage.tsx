import {
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import reportApi from 'api/reportApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectAgeGroupFilter } from 'features/categories/ageGroup/ageGroupSlice';
import { t } from 'i18next';
import { Report, ReportDetail } from 'models';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { dateUtils } from 'utils';
import { indicatorUtils } from 'utils/Common';
import { reportActions } from '../reportSlice';

// Accepts the array and key
const groupBy = (array: any[], key: string) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};

export function DetailPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [site, setSite] = useState<any>();
  const [keyPopulation, setKeyPopulation] = useState<any>();
  const [gender, setGender] = useState<any>();
  const [ageGroup, setAgeGroup] = useState<any>();
  const [total, setTotal] = useState<number>(0);

  const report = useAppSelector((s) => s.report.selectedReport);
  const loading = useAppSelector((s) => s.report.loading);

  useEffect(() => {
    dispatch(reportActions.fetchReport(id));
  }, [id]);

  useEffect(() => {
    if (report?.reportDetails) {
      const process = (array: ReportDetail[], key: string): any[] => {
        const total = array.reduce((sum, current) => sum + current.total, 0);
        const group = groupBy(report?.reportDetails, key);
        const keys = Object.keys(group);
        let result: any[] = [];
        keys.forEach((s) => {
          let element_total = group[s].reduce(
            (sum: number, current: any) => sum + current.total,
            0
          );
          result.push({
            name: s,
            total: element_total,
            percent: element_total / total,
          });
        });
        return result;
      };
      setSite(process(report?.reportDetails, 'site'));
      setGender(process(report?.reportDetails, 'gender'));
      setKeyPopulation(process(report?.reportDetails, 'keyPopulation'));
      setAgeGroup(process(report?.reportDetails, 'ageGroup'));
      setTotal(report?.reportDetails.reduce((sum, current) => sum + current.total, 0));
    }
  }, [report]);

  return (
    <div
      style={{
        padding: '5px',
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    label={'Chỉ số'}
                    value={report ? indicatorUtils.get(report?.indicatorCode ?? 0) : ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    label={'Năm'}
                    value={report ? dateUtils.getYear(report?.reportPeriod) : ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    label={'Quý'}
                    value={report ? dateUtils.getQuarter(report?.reportPeriod) : ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    label={'Tháng'}
                    value={report ? dateUtils.getMonth(report?.reportPeriod) : ''}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ maxHeight: 490 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Danh mục cơ sở</TableCell>
                      <TableCell>Giá trị</TableCell>
                      <TableCell>Tỉ trọng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {site?.map((s: any) => (
                      <TableRow key={s.name}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.total}</TableCell>
                        <TableCell>{Math.round(s.percent * 10000) / 100 + '%'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Danh mục giới tính</TableCell>
                      <TableCell>Giá trị</TableCell>
                      <TableCell>Tỉ trọng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gender?.map((s: any) => (
                      <TableRow key={s.name}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.total}</TableCell>
                        <TableCell>{Math.round(s.percent * 10000) / 100 + '%'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ maxHeight: 331 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Danh mục nhóm tuổi</TableCell>
                      <TableCell>Giá trị</TableCell>
                      <TableCell>Tỉ trọng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ageGroup?.map((s: any) => (
                      <TableRow key={s.name}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.total}</TableCell>
                        <TableCell>{Math.round(s.percent * 10000) / 100 + '%'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ maxHeight: 340 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Danh mục nhóm nguy cơ</TableCell>
                      <TableCell>Giá trị</TableCell>
                      <TableCell>Tỉ trọng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {keyPopulation?.map((s: any) => (
                      <TableRow key={s.name}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.total}</TableCell>
                        <TableCell>{Math.round(s.percent * 10000) / 100 + '%'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 75px)' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Cơ sở</TableCell>
                  <TableCell>Nhóm tuổi</TableCell>
                  <TableCell>Giới tính</TableCell>
                  <TableCell>Nhóm nguy cơ</TableCell>
                  <TableCell>Giá trị</TableCell>
                  <TableCell>Tỉ trọng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {report?.reportDetails.map((s: any) => (
                  <TableRow key={s.site + s.ageGroup + s.gender + s.keyPopulation}>
                    <TableCell>{s.site}</TableCell>
                    <TableCell>{s.ageGroup}</TableCell>
                    <TableCell>{s.gender}</TableCell>
                    <TableCell>{s.keyPopulation}</TableCell>
                    <TableCell>{s.total}</TableCell>
                    <TableCell>{Math.round((s.total / total) * 10000) / 100 + '%'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
