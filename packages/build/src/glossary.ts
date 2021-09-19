/*
This file is a placeholder for what will be generated automatically in the
  future.
*/

const a = async (): Promise<{ default: Record<string, string> }> =>
  import('./glossary/a.json');
const d = async (): Promise<{ default: Record<string, string> }> =>
  import('./glossary/d.json');
const e = async (): Promise<{ default: Record<string, string> }> =>
  import('./glossary/e.json');

export default {
  a: a,
  b: a,
  c: a,
  d: d,
  e: e,
  f: e,
  g: e,
};
