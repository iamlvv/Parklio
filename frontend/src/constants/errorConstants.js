import { SwalObject } from "../components/styles";

// general error
export const SOMETHING_WENT_WRONG = {
  ...SwalObject.error,
  text: `Something went wrong.`,
};

// user error
export const USER_NOT_FOUND = { ...SwalObject.error, text: `User not found.` };
export const USER_ALREADY_EXISTED = {
  ...SwalObject.error,
  text: `User has already existed.`,
};
export const INVALID_EMAIL_OR_PASSWORD = {
  ...SwalObject.error,
  text: `Invalid email or password.`,
};
export const INVALID_PASSWORD = {
  ...SwalObject.error,
  text: `Invalid password.`,
};
export const PASSWORD_NOT_MATCH = {
  ...SwalObject.error,
  text: `Password and confirm password not match.`,
};

// vehicle error
export const VEHICLE_ALREADY_CHECKED_IN = {
  ...SwalObject.error,
  text: `Vehicle already checked in.`,
};
export const VEHICLE_NOT_FOUND = {
  ...SwalObject.error,
  text: `Vehicle not found.`,
};
export const INVALID_PARKING_KEY_OR_PLATE_NUMBER = {
  ...SwalObject.error,
  text: `Invalid parking key or plate number.`,
};
