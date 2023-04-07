import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import ageGroupApi from 'api/ageGroupApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { AgeGroup } from 'models/ageGroup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ageGroupActions, selectAgeGroupFilter } from '../ageGroupSlice';

export interface AgeGroupFormProps {
  initialValues?: AgeGroup;
  onClose: () => void;
}
const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập độ tuổi'),
  order: yup.string().required('Nhập thứ tự'),
  lowestAge: yup.string().required('Nhập tuổi thấp nhất'),
  olderAge: yup.string().required('Nhập tuổi cao nhất'),
});

export default function AgeGroupForm({ initialValues, onClose }: AgeGroupFormProps) {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectAgeGroupFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AgeGroup>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleAgeGroupFormSubmit = async (formValues: AgeGroup) => {
    if (isEdit) {
      await ageGroupApi.update(formValues);
    } else {
      await ageGroupApi.add(formValues);
    }
    dispatch(ageGroupActions.fetchAgeGroupList(filter));
    onClose();
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleAgeGroupFormSubmit)}>
        <InputField
          name="name"
          control={control}
          placeholder="Nhập tên nhóm tuổi"
          label="Tên nhóm tuổi*"
        ></InputField>
        <InputField name="lowestAge" control={control} label="Nhập tuổi thấp nhất"></InputField>
        <InputField name="olderAge" control={control} label="Nhập tuổi cao nhất"></InputField>
        <InputField
          name="order"
          control={control}
          placeholder="Nhập thứ tự"
          label="Thứ tự*"
        ></InputField>
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
