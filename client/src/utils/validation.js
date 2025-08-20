export const validateName = (name) => {
  return name.length >= 20 && name.length <= 60;
};

export const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return (
    password.length >= 8 &&
    password.length <= 16 &&
    hasUpperCase &&
    hasSpecialChar
  );
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateAddress = (address) => {
  return address.length <= 400;
};
