import validator from 'validator';

export const validateUsername = (name: string): string => {
  if (name?.length > 1 && !validator.matches(name, '^[a-zA-Z0-9_.-]*$')) {
    return '';
  } else {
    return 'username is not valid';
  }
};

export const validatePassword = (pwd: string): string => {
  if (pwd?.length > 6 && pwd?.length < 32) {
    return '';
  } else {
    return 'password must be more than 6 characters and less than 32 characters';
  }
};
