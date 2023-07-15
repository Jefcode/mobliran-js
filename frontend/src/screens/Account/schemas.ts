import * as yup from 'yup';

const requiredMessage = 'این فیلد الزامی است';
const stringTypeError = 'این فیلد نمی تواند حاوی عدد باشد';
const numberTypeError = 'لطفا عدد وارد کنید';

export const editAddressFormSchema = yup.object({
  country: yup.string().required(requiredMessage),
  city: yup.string().required(requiredMessage),
  address: yup.string().required(requiredMessage),
  postalCode: yup.number().required(requiredMessage).typeError(numberTypeError),
});

export const editProfileFormSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required(requiredMessage)
    .typeError(stringTypeError),
  lastName: yup
    .string()
    .trim()
    .required(requiredMessage)
    .typeError(stringTypeError),
  username: yup
    .string()
    .trim()
    .required(requiredMessage)
    .typeError(stringTypeError),
  email: yup
    .string()
    .email('لطفا یک ایمیل درست وارد کنید')
    .required(requiredMessage)
    .typeError(stringTypeError),
  oldPassword: yup.string(),
  newPassword: yup.string().when('oldPassword', {
    is: (value: any) => !!value,
    then: yup
      .string()
      .required(
        'در صورتی که فیلد رمز عبور فعلی را پر کرده باشید لازم است این فیلد را هم پر کنید'
      ),
  }),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'این رمز با رمز جدید یکسان نیست.'),
});
