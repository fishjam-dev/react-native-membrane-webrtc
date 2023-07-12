export function isJest() {
  // @ts-ignore
  return process.env.NODE_ENV === 'test';
}
