interface AsyncStateError {
  data?: undefined;
  error: Error;
  loading: false;
}

interface AsyncStateLoading {
  data?: undefined;
  error?: undefined;
  loading: true;
}

interface AsyncStateSuccess {
  data: Record<string, string>;
  error?: undefined;
  loading: false;
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
type AsyncState = AsyncStateError | AsyncStateLoading | AsyncStateSuccess;

export default AsyncState;
