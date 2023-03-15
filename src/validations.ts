export const isInputNotEmpty = (data: any): boolean => {
  if (Object.keys(data).length === 2) {
    if (data.email === "" || data.password === "") {
      return false;
    }
  } else {
    if (
      data.name === "" ||
      data.email === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      return false;
    }
  }
  return true;
};

export const isEmailValid = (email: string): boolean => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const isNameValid = (name: string): boolean => {
  if (name.length < 5) {
    return false
  }
  return true
} 

export const isPasswordValid = (password: string): boolean => {
  if (password.length < 8) {
    return false
  }
  return true
}