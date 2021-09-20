import type AsyncState from '../types/async-state';
import type DefinitionFileGetter from '../types/definition-file-getter';

export default function getDefaultAsyncState(): Map<
  DefinitionFileGetter,
  AsyncState
> {
  return new Map();
}
