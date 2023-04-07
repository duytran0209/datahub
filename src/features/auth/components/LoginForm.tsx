import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, CircularProgress, Link, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import { InputField } from 'components/FormFields';
import CheckboxField from 'components/FormFields/CheckboxField';
import { t } from 'i18next';
import { LoginPayload } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface LoginFormProps {
  initialValues?: LoginPayload;
  onSubmit?: (formValues: LoginPayload) => void;
}

const schema = yup.object().shape({
  rememberMe: yup.boolean(),
  password: yup.string().required(t('Input your password')),
  username: yup.string().required(t('Input your username')),
});

export default function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const error = useAppSelector((state) => state.auth.error);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: LoginPayload) => {
    await onSubmit?.(formValues);
  };

  return (
    <Box maxWidth={400}>
      <Typography
        align="center"
        sx={{
          fontSize: 60,
          fontWeight: '900',
          background: 'linear-gradient(225deg, #D665FF 0%, #4C6FFF 100%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          textShadow: '0px 27px 54px rgba(75, 77, 237, 0.2)',
        }}
        component="h1"
      >
        DataHub
      </Typography>
      <Typography
        textTransform="uppercase"
        fontWeight="bold"
        color="black"
        component="h1"
        variant="h5"
        marginTop={4}
      >
        {t('Login')}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="username" control={control} label={t('Username')} type="text" />
        <InputField name="password" control={control} label={t('Password')} type="password" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CheckboxField name="rememberMe" control={control} label={t('Remember login')} />
          <Link
            href="#"
            sx={{
              color: '#576574DB',
              textDecoration: 'none',
            }}
          >
            {t('Forgot password?')}
          </Link>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
        {!error && error?.length === 0 && (
          <Alert severity="success">{t('Logged in successfully')}</Alert>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'end',
          }}
          mt={3}
        >
          {!isLoading && (
            <CommonButton
              sx={{ px: 8, py: 1 }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {t('Login')}
            </CommonButton>
          )}
          {isLoading && <CircularProgress size={30} />}
        </Box>
      </form>
    </Box>
  );
}
