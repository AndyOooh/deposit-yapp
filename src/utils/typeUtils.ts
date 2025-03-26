export const typedKeys = <T extends object>(obj: T): Array<keyof T> => {
  return Object.keys(obj) as Array<keyof T>;
};

export const truncateAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};
