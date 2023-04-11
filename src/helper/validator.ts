import validator from 'validator';

export const validateUsername = (name: string): string => {
  if (
    name?.length > 0 &&
    name?.length <= 32 &&
    validator.matches(name, '^[a-zA-Z0-9_.-]*$')
  ) {
    return '';
  } else {
    return 'username is not valid';
  }
};

export const validatePassword = (pwd: string): string => {
  if (pwd?.length >= 6 && pwd?.length <= 32) {
    return '';
  } else {
    return 'password must be from 6 to 32 characters';
  }
};
