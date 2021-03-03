export const getAvatarFromName = (firstname, lastname) => {
  if (firstname && lastname) {
    return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
  } else {
    return ""
  }
};
