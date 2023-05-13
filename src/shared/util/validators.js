const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_NUMBER = "NUMBER";
const VALIDATOR_TYPE_CHARACTER = "CHARACTER";
const VALIDATOR_TYPE_MAX_LENGTH_ARRAY = "MAXLENGTH_ARRAY";
const VALIDATOR_TYPE_MIN_LENGTH_ARRAY = "MINLENGTH_ARRAY";
const VALIDATOR_TYPE_FROM_API = "API";

export const VALIDATOR_REQUIRED = (message) => ({
  type: VALIDATOR_TYPE_REQUIRE,
  message,
});

// Just show message from API sent to
export const VALIDATOR_FROM_API = (message) => ({
  type: VALIDATOR_TYPE_FROM_API,
  message,
});

export const VALIDATOR_MINLENGTH = (val, message) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
  message,
});

export const VALIDATOR_MAXLENGTH = (val, message) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
  message,
});

export const VALIDATOR_MIN = (val, message) => ({
  type: VALIDATOR_TYPE_MIN,
  val: val,
  message,
});

export const VALIDATOR_MAX = (val, message) => ({
  type: VALIDATOR_TYPE_MAX,
  val: val,
  message,
});

export const VALIDATOR_EMAIL = (message) => ({
  type: VALIDATOR_TYPE_EMAIL,
  message,
});

export const VALIDATOR_NUMBER = (message) => ({
  type: VALIDATOR_TYPE_NUMBER,
  message,
});

export const VALIDATOR_CHARACTERS = (message) => ({
  type: VALIDATOR_TYPE_CHARACTER,
  message,
});

export const VALIDATOR_MAX_LENGTH_ARRAY = (val, message) => ({
  type: VALIDATOR_TYPE_MAX_LENGTH_ARRAY,
  val,
  message,
});

export const VALIDATOR_MIN_LENGTH_ARRAY = (val, message) => ({
  type: VALIDATOR_TYPE_MIN_LENGTH_ARRAY,
  val,
  message,
});

/* Validate */
export const validateForm = (value = "", validators) => {
  let isValid = true;
  let message = "";

  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_FROM_API) {
      isValid = !!validator.message ? false : true;
      message = validator.message;
    }

    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length !== 0;
      message = validator.message;
    }

    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
      message = validator.message;
    }

    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
      message = validator.message;
    }

    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
      message = validator.message;
    }

    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
      message = validator.message;
    }

    if (validator.type === VALIDATOR_TYPE_MAX_LENGTH_ARRAY) {
      isValid = isValid && +value.length <= validator.val;
      message = validator.message;
    }

    if (validator.type === VALIDATOR_TYPE_MIN_LENGTH_ARRAY) {
      isValid = isValid && +value.length >= validator.val;
      message = validator.message;
    }

    if (validator.type === VALIDATOR_TYPE_NUMBER) {
      const numberPattern = /\d+/g;
      isValid = isValid && value.match(numberPattern) !== null;
      message = validator.message;
    }

    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      message = validator.message;
    }

    if (validator.type === VALIDATOR_TYPE_CHARACTER) {
      const characterPattern = /^[a-zA-Z ]+$/;
      isValid = isValid && value.match(characterPattern) !== null;
      message = validator.message;
    }

    if (isValid) {
      continue;
    } else {
      return message;
    }
  }
};
