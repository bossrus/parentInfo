export function ageToText(age: number) {
  let num = age % 100;
  let ageSuffix: string;

  if (num >= 5 && num <= 20) {
    ageSuffix = ' лет';
  } else {
    num = num % 10;
    switch (num) {
      case 1:
        ageSuffix = ' год';
        break;
      case 2:
      case 3:
      case 4:
        ageSuffix = ' года';
        break;
      default:
        ageSuffix = ' лет';
    }
  }

  return age > 0 ? `${age} ${ageSuffix}` : 'Новорождённый';
}