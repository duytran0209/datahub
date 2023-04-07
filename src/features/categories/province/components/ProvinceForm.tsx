import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress, MenuItem } from '@mui/material';
import provinceApi from 'api/provinceApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { DisableField } from 'components/FormFields/DisableField';
import { OptionField } from 'components/FormFields/OptionField';
import { Province } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { provinceActions, selectProvinceFilter } from '../provinceSlice';

export interface ProvinceFormProps {
  initialValues?: Province;
  onClose: () => void;
}
const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên tỉnh'),
  code: yup.string().required('Nhập loại mã tỉnh/thành phố'),
  type: yup.string().required('Vui lòng chọn loại tỉnh/thành phố').oneOf(['Tỉnh', 'Thành phố']),
  numberOrder: yup.string().required('Vui lòng nhập số thứ tự'),
  nameWithType: yup.string().required('Vui lòng nhập loai'),
});

export default function ProvinceForm({ initialValues, onClose }: ProvinceFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectProvinceFilter);
  // --------------------------------------------------------
  const [currency, setCurrency] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
    // setValue('slug', stringUtils.removeVietnameseTones(event.target.value.toLowerCase()));
  };

  // ---------------------------------------------------------

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useForm<Province>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const watchFields = watch(['type', 'name']);

  React.useEffect(() => {
    console.log('watchFields : ', watchFields);
    return setValue(
      'slug',
      `${watchFields[1]
        .toLowerCase()
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        .replace(/đ/gi, 'd')
        .replace(/ /g, '-')
        .replace(/\-\-\-\-\-/gi, '-')
        .replace(/\-\-\-\-/gi, '-')
        .replace(/\-\-\-/gi, '-')
        .replace(/\-\-/gi, '-')}`
    );
  }, [watchFields]);

  React.useEffect(() => {
    console.log('watchFields : ', watchFields);
    return setValue('nameWithType', `${watchFields[0]} ${watchFields[1].replace(/\s+/g, ' ')}`);
  }, [watchFields]);

  //submit
  const handleProvinceFormSubmit = async (formValues: Province) => {
    console.log('formValue:', formValues);

    if (isEdit) {
      await provinceApi.update(formValues);
      toast.success('Update province successfully');
    } else {
      await provinceApi.add(formValues);
      toast.success('Create province successfully');
    }
    dispatch(provinceActions.fetchProvinceList(filter));
    onClose();
  };

  const typeProvince = [
    { label: 'Tỉnh', value: 'Tỉnh' },
    {
      label: 'Thành phố',
      value: 'Thành phố',
    },
  ];
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleProvinceFormSubmit)}>
        <OptionField
          name="type"
          control={control}
          placeholder="Chọn loại tỉnh/thành"
          label="Chọn loại tỉnh thành*"
          value={currency}
          onChange={handleChange}
        >
          {typeProvince.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </OptionField>
        <InputField
          name="code"
          control={control}
          placeholder="Nhập mã tỉnh/thành"
          label="Mã tỉnh thành*"
        />
        <InputField
          name="name"
          control={control}
          placeholder="Nhập tên tỉnh/thành phố"
          label="Tên*"
        />
        <DisableField name="slug" control={control} placeholder="Nhập slug" label="Slug*" />
        <DisableField
          name="nameWithType"
          control={control}
          placeholder="Nhập tên chuẩn tỉnh/thành phố"
          label="Tên chuẩn*"
        />
        <InputField
          name="numberOrder"
          control={control}
          placeholder="Nhập số thứ tự"
          label="Thứ tự*"
          type="number"
        />

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
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Alert } from '@mui/lab';
// import { Box, Button, CircularProgress } from '@mui/material';
// import provinceApi from 'api/provinceApi';
// import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { InputField } from 'components/FormFields';
// import { Province } from 'models';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { provinceActions, selectProvinceFilter } from '../provinceSlice';

// export interface ProvinceFormProps {
//   initialValues?: Province;
//   onClose: () => void;
// }

// const schema = yup.object().shape({
//   name: yup.string().required('Vui lòng nhập tên tỉnh'),
//   nameWithType: yup.string().required('Nhập loại tỉnh'),
// });

// export default function ProvinceForm({ initialValues, onClose }: ProvinceFormProps): JSX.Element {
//   const [error, setError] = useState<string>('');
//   const isEdit = Boolean(initialValues?.id);
//   const dispatch = useAppDispatch();
//   const filter = useAppSelector(selectProvinceFilter);

//   const {
//     control,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<Province>({
//     defaultValues: initialValues,
//     resolver: yupResolver(schema),
//   });

//   const handleProvinceFormSubmit = async (formValues: Province) => {
//     console.log('form value : ', formValues);

//     if (isEdit) {
//       await provinceApi.update(formValues);
//     } else {
//       await provinceApi.add(formValues);
//     }
//     dispatch(provinceActions.fetchProvinceList(filter));
//     onClose();
//   };

//   return (
//     <Box maxWidth={400}>
//       <form onSubmit={handleSubmit(handleProvinceFormSubmit)}>
//         <InputField
//           name="code"
//           control={control}
//           placeholder="Nhập mã tỉnh/thành"
//           label="Mã tỉnh thành*"
//         />
//         <InputField name="slug" control={control} placeholder="Nhập slug" label="Slug*" />
//         <InputField
//           name="type"
//           control={control}
//           placeholder="Nhập loại Tỉnh/thành"
//           label="Loại*"
//         />
//         <InputField
//           name="name"
//           control={control}
//           placeholder="Nhập tên tỉnh/thành phố"
//           label="Tên*"
//         />
//         <InputField
//           name="nameWithType"
//           control={control}
//           placeholder="Nhập tên chuẩn tỉnh/thành phố"
//           label="Tên chuẩn*"
//         />

//         {error && <Alert severity="error">{error}</Alert>}

//         <Box mt={3}>
//           <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
//             {isSubmitting && <CircularProgress size={16} color="primary" />}
//             &nbsp;Xác nhận
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// }
