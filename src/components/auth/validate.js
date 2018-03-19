
export function validate(values) {
  const errors = {};

  if(values.password !== values.passwordConfirm){
    errors.password = 'password must match'
  }

  if (!values.email) {
    errors.email= 'Required'
  }
  if (!values.password) {
    errors.password= 'Required'
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm= 'Required'
  }

if (
  values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
) {
  errors.email = 'Invalid email address'
}

  return errors;
}
