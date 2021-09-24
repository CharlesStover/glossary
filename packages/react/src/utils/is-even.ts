const BASE = 2;
const ZERO = 0;

export default function isEven(value: number): boolean {
  return value % BASE === ZERO;
}
