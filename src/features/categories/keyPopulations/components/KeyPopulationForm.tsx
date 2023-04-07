import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import keyPopulationApi from 'api/keyPopulationApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { t } from 'i18next';
import { KeyPopulation } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { keyPopulationActions, selectKeyPopulationFilter } from '../keyPopulationSlice';

export interface KeyPopulationFormProps {
  initialValues?: KeyPopulation;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required(t('Key population name is required')),
  descriptions: yup.string().required(t('Description is required')),
  order: yup.string().required(t('Order is required')),
});

export default function KeyPoplationForm({
  initialValues,
  onClose,
}: KeyPopulationFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectKeyPopulationFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<KeyPopulation>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleKeyPopulationFormSubmit = async (formValues: KeyPopulation) => {
    if (isEdit) {
      await keyPopulationApi.update(formValues);
      toast.success(t('Update key population successfully'));
    } else {
      await keyPopulationApi.add(formValues);
      toast.success(t('Create key population successfully'));
    }
    dispatch(keyPopulationActions.fetchKeyPopulationList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleKeyPopulationFormSubmit)}>
        <InputField
          name="name"
          control={control}
          placeholder={t('Input key population name')}
          label={`${t('Key population name')}*`}
        />
        <InputField
          name="descriptions"
          control={control}
          placeholder={t('Input key population description')}
          label={`${t('Description')}*`}
        />
        <InputField
          name="order"
          control={control}
          placeholder={t('Input order')}
          label={`${t('Order')}*`}
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
