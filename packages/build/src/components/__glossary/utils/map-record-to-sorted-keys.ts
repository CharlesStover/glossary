import sortStrings from '../utils/sort-strings';

export default function mapRecordToSortedKeys(
  record: Readonly<Record<string, unknown>>,
): readonly string[] {
  const words: string[] = Object.keys(record);
  return words.sort(sortStrings);
}
