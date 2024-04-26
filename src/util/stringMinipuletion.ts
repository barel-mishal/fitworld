export function addSpaceBeforeCapitalLetter(str: string): string {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }

export function capitalFirstCharInAString(str: string): string {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

export function fixEnglishMeasurementName(name: string): string {
    let n = name.trim();
    n = n.replace("The measurement is: ", "");
    return n;
  }

