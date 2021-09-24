export default function validateString(value: unknown): string {
  if (typeof value !== 'string') {
    throw new Error(
      `Expected a string, but received: ${JSON.stringify(value)}`,
    );
  }
  return value;
}
