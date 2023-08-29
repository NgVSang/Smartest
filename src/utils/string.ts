export const converLicensePlate = (license_plate?: string) => {
  if (license_plate) {
    if (/[a-zA-Z]/.test(license_plate[3]))
      return license_plate
        ? license_plate.slice(0, 4) +
            ' - ' +
            license_plate.slice(4, license_plate.length)
        : '';
    else
      return license_plate
        ? license_plate.slice(0, 3) +
            ' - ' +
            license_plate.slice(3, license_plate.length)
        : '';
  } else return '';
};

export const reConvertLicensePlate = (license_plate?: string) => {
  if (license_plate) {
    if (/[a-zA-Z]/.test(license_plate[3]))
      return license_plate
        ? license_plate.slice(0, 4) +
            license_plate.slice(7, license_plate.length)
        : '';
    else
      return license_plate
        ? license_plate.slice(0, 3) +
            license_plate.slice(6, license_plate.length)
        : '';
  } else return '';
};

export const convertPrice = (price?: number) => {
  if (price) {
    const arr = [];
    const priceSTR = price.toString();
    for (let index = priceSTR.length; index > 0; index -= 3) {
      index - 3 > 0
        ? arr.push(priceSTR.slice(index - 3, index))
        : arr.push(priceSTR.slice(0, index));
    }
    arr.reverse();
    return arr.join('.');
  }
  return '0';
};

export const formatDate = (date?: string) => {
  return date ? date.split('-').reverse().join('/') : '';
};

export const convertDate = (date?: string) => {
  return date ? date.split('/').reverse().join('-') : '';
};
