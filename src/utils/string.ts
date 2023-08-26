export const converLicensePlate = (license_plate: string) => {
  if (license_plate) {
    if (isNaN(parseInt(license_plate[3])))
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
