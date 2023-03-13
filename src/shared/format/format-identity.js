const formatIdentityCard = (value) => {
  if (!value) {
    return value;
  }

  const phoneNumber = value.replace(/[^0-9]+/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) {
    return phoneNumber;
  }

  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)} - ${phoneNumber.slice(3)}`;
  }

  return `${phoneNumber.slice(0, 3)} - ${phoneNumber.slice(
    3,
    6
  )} - ${phoneNumber.slice(6, 9)}`;
};

export default formatIdentityCard;
