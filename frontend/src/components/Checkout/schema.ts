import * as yup from 'yup';

const REQUIRED_MESSAGE = 'این فیلد الزامی است';

const checkoutFormSchema = yup.object({
  shipToAnotherAddress: yup.boolean().required(),
  country: yup.string().when('shipToAnotherAddress', {
    is: true,
    then: yup.string().trim().required(REQUIRED_MESSAGE),
  }),
  city: yup.string().when('shipToAnotherAddress', {
    is: true,
    then: yup.string().trim().required(REQUIRED_MESSAGE),
  }),

  postalCode: yup.string().when('shipToAnotherAddress', {
    is: true,
    then: yup.string().trim().required(REQUIRED_MESSAGE),
  }),
  address: yup.string().when('shipToAnotherAddress', {
    is: true,
    then: yup.string().trim().required(REQUIRED_MESSAGE),
  }),
  specialNotes: yup.string(),
});

export default checkoutFormSchema;
