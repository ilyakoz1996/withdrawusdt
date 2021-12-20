export const shortAddress = (address: string): string => {
    const first = address.substring(0, 8);
    const last = address.substring(address.length - 4);
    return `${first}...${last}`;
  };