import type AsyncState from '../types/async-state';

export default function mapAsyncStateToLoading(
  state?: AsyncState | undefined,
): boolean {
  if (typeof state === 'undefined') {
    return false;
  }
  return state.loading;
}
