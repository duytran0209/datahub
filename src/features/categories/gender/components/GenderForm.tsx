import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import genderApi from 'api/genderApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { Gender } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { genderActions, selectGenderFilter } from '../genderSlice';

export interface GenderFormProps {
  initialValues?: Gender;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên giới tính'),
  order: yup.string().required('Nhập thứ tự'),
});

export default function GenderForm({ initialValues, onClose }: GenderFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectGenderFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Gender>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleGenderFormSubmit = async (formValues: Gender) => {
    if (isEdit) {
      await genderApi.update(formValues);
    } else {
      await genderApi.add(formValues);
    }
    dispatch(genderActions.fetchGenderList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleGenderFormSubmit)}>
        <InputField name="name" control={control}  placeholder="Nhập giới tính" label="Tên giới tính*"   />
        <InputField name="order" control={control} placeholder="Nhập thứ tự" label="Thứ tự*" />

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
