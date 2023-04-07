import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import districtsApi from 'api/districtsApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { Districts } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { districtsActions, selectDistrictsFilter } from '../districtsSlice';

export interface DistrictsFormProps {
  initialValues?: Districts;
  onClose: () => void;
}

const schema = yup.object().shape({
  code: yup.string().required('Vui lòng nhập mã quận/huyện'),
  name: yup.string().required('Vui lòng nhập tên quận/huyện'),
  path:yup.string().required('Vui lòng nhập địa chỉ'),
  slug:yup.string().required('Vui lòng nhập slug'),
});

export default function DistrictsForm({ initialValues, onClose }: DistrictsFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectDistrictsFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Districts>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleDistrictsFormSubmit = async (formValues: Districts) => {
    if (isEdit) {
      await districtsApi.update(formValues);
    } else {
      await districtsApi.add(formValues);
    }
    dispatch(districtsActions.fetchDistrictsList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleDistrictsFormSubmit)}>
        <InputField
          name="provinceCode"
          control={control}
          placeholder="Chọn loại Tỉnh/TP"
          label="Tỉnh/Thành Phố*"
        />
        <InputField
          name="code"
          control={control}
          placeholder="Nhập mã Quận/Huyện"
          label="Mã Quận/Huyện*"
        />
        <InputField
          name="type"
          control={control}
          placeholder="Chọn loại Quận/Huyện"
          label="Loại Quận/Huyện*"
        />
        <InputField
          name="name"
          control={control}
          placeholder="Nhập tên Quận/Huyện"
          label="Tên Quận/Huyện*"
        />
        <InputField name="path" control={control} placeholder="Nhập địa chỉ" label="Địa chỉ*" />
        <InputField
          name="pathWithType"
          control={control}
          placeholder="Nhập địa chỉ chuẩn"
          label="Nhập địa chỉ chuẩn*"
        />
        <InputField name="slug" control={control} placeholder="slug" label="Nhập slug*" />

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
