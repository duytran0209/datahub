import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import drugApi from 'api/drugApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { t } from 'i18next';
import { Drug } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { drugActions, selectDrugFilter } from '../drugSlice';

export interface DrugFormProps {
  initialValues?: Drug;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required(t('Drug name is required')),
  unit: yup.string().required(t('Drug unit is required')),
  order: yup.string().required(t('Order is required')),
});

export default function DrugForm({ initialValues, onClose }: DrugFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectDrugFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Drug>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleDrugFormSubmit = async (formValues: Drug) => {
    if (isEdit) {
      await drugApi.update(formValues);
    } else {
      await drugApi.add(formValues);
    }
    dispatch(drugActions.fetchDrugList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleDrugFormSubmit)}>
        <InputField
          name="name"
          control={control}
          placeholder={t('Input drug name')}
          label={`${t('Drug name')}*`}
        />
        <InputField
          name="unit"
          control={control}
          placeholder={t('Input drug unit')}
          label={`${t('Drug unit')}*`}
        />
        <InputField
          name="order"
          control={control}
          placeholder={t('Input drug order')}
          label={`${t('Drug order')}*`}
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;{t('Confirm')}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
