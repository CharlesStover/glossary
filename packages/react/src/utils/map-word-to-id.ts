export default function mapWordToId(word: string): string {
  return word.toLowerCase().replace(/[^\d\w]+/g, '-');
}
