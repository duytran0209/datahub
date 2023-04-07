import { ConstructionOutlined } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import { FormControl, FormHelperText, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface IDateFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

export default function DateField({ name, control, label, disabled }: IDateFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      disabled={disabled}
      error={invalid}
    >
      <DatePicker
        label={label}
        value={value ?? null}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
