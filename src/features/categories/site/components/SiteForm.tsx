import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import siteApi from 'api/siteApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { Site } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { selectSiteFilter, siteActions } from '../siteSlice';


export interface SiteFormProps {
  initialValues?: Site;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên cơ sở'),
  order: yup.string().required('Nhập thứ tự'),
});

export default function SiteForm({ initialValues, onClose }: SiteFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectSiteFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Site>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleSiteFormSubmit = async (formValues: Site) => {
    if (isEdit) {
      await siteApi.update(formValues);
    } else {
      await siteApi.add(formValues);
    }
    dispatch(siteActions.fetchSiteList(filter));
    onClose();
  };
  
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleSiteFormSubmit)}>
        <InputField name="name" control={control} label="Tên cơ sở*" />
        <InputField name="districtID" control={control} placeholder="Mã tỉnh" label="Mã tỉnh*" />

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Xác nhận
          </Button>
        </Box>
      </form>
    </Box>
  );
}
