import * as yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('لطفا یک ایمیل معتبر وارد کنید')
      .required('این فیلد الزامی است'),
    password: yup
      .string()
      .min(6, 'رمز عبور حداقل باید 6 رقم باشد')
      .required('این فیلد الزامی است'),
  })
  .required();

export const registerSchema = yup.object({
  username: yup
    .string()
    .required('این فیلد الزامی است')
    .matches(
      /^(?=.{7,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'نام کاربری باید حداقل 7 تا 20 رقم و تنها شامل حروف انگلیسی، اعداد، آندرلاین و نقطه باشند. همچنین امکان استفاده از نقطه و اندرلاین پشت سر هم، اول یا اخر نام کاربری وجود ندارد'
    ),
  email: yup
    .string()
    .email('لطفا یک ایمیل معتبر وارد کنید')
    .required('این فیلد الزامی است'),
  password: yup
    .string()
    .min(6, 'رمز عبور حداقل باید 6 رقم باشد')
    .required('این فیلد الزامی است'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'رمز ها یکسان نیستند')
    .required('این فیلد الزامی است'),
});
