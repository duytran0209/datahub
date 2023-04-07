import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import customerApi from 'api/customerApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { t } from 'i18next';
import { Customer } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { customerActions, selectCustomerFilter } from '../customerSlice';

export interface CustomerFormProps {
  initialValues?: Customer;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required(t('Customer name is required')),
  unit: yup.string().required(t('Customer unit is required')),
  order: yup.string().required(t('Order is required')),
});

export default function CustomerForm({ initialValues, onClose }: CustomerFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectCustomerFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Customer>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleCustomerFormSubmit = async (formValues: Customer) => {
    // if (isEdit) {
    //   await customerApi.update(formValues);
    // } else {
    //   await customerApi.add(formValues);
    // }
    // dispatch(customerActions.fetchCustomerList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleCustomerFormSubmit)}>
        <InputField
          name="name"
          control={control}
          placeholder={t('Input customer name')}
          label={`${t('Customer name')}*`}
        />
        <InputField
          name="unit"
          control={control}
          placeholder={t('Input customer unit')}
          label={`${t('Customer unit')}*`}
        />
        <InputField
          name="order"
          control={control}
          placeholder={t('Input customer order')}
          label={`${t('Customer order')}*`}
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
