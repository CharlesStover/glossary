const FIRST_CHARACTER = 1;
export default function mapHashToWord(hash: string): string | undefined {
  if (!hash.startsWith('#') || hash.length === FIRST_CHARACTER) {
    return;
  }
  return hash.substring(FIRST_CHARACTER);
}
