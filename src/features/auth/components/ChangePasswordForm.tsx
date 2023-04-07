import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import { InputField } from 'components/FormFields';
import { t } from 'i18next';
import { ChangePasswordPayload } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface ChangePasswordFormProps {
  initialValues?: ChangePasswordPayload;
  onSubmit?: (formValues: ChangePasswordPayload) => void;
}

const schema = yup.object().shape({
  oldPassword: yup.string().min(6).required('Please enter your password.'),
  newPassword: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Your password is too short.')
    .test('Xin chao', 'ABCD', (item, context) => {
      return context.parent.newPassword !== context.parent.oldPassword;
    }),
  confirmPassword: yup
    .string()
    .required('Please retype your password.')
    .test('Xin chao', 'ABCD', (item, context) => {
      return context.parent.newPassword === context.parent.confirmPassword;
    }),
});

export default function ChangePasswordForm({ initialValues, onSubmit }: ChangePasswordFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: ChangePasswordPayload) => {
    await onSubmit?.(formValues);
  };

  return (
    <Box maxWidth={800}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="oldPassword" control={control} label={t('Password')} type="password" />
        <InputField name="newPassword" control={control} label={'Mật khẩu mới'} type="password" />
        <InputField
          name="confirmPassword"
          control={control}
          label={'Xác nhận mật khẩu mới'}
          type="password"
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        ></Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'end',
          }}
          mt={3}
        >
          <CommonButton
            sx={{ px: 8, py: 1 }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            fullWidth
          >
            {'Đồng ý'}
          </CommonButton>
        </Box>
      </form>
    </Box>
  );
}
