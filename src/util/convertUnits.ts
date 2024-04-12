export function convertUnits(value: number, fromUnit: string, toUnit: string): number {
    // Define conversion factors
    const cmToM = 0.01;
    const mToCm = 100;
    const ftToM = 0.3048;
    const mToFt = 3.28084;
  
    // Standardize input units to lowercase
    fromUnit = fromUnit.toLowerCase();
    toUnit = toUnit.toLowerCase();
  
    // Convert input value to meters
    let meters: number;
    if (fromUnit === 'cm') {
      meters = value * cmToM;
    } else if (fromUnit === 'm') {
      meters = value;
    } else if (fromUnit === 'ft') {
      meters = value * ftToM;
    } else {
      throw new Error(`Invalid 'from' unit: ${fromUnit}`);
    }
  
    // Convert meters to the desired output unit
    let result: number;
    if (toUnit === 'cm') {
      result = meters * mToCm;
    } else if (toUnit === 'm') {
      result = meters;
    } else if (toUnit === 'ft') {
      result = meters * mToFt;
    } else {
      throw new Error(`Invalid 'to' unit: ${toUnit}`);
    }
  
    return result;
  }