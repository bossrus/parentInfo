export function removeLeadingZeros(str: string) {

  const value = str.replace(/^0+/, '');
  return +value > 0 ? +value : 0;
}