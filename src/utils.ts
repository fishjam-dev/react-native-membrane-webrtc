export function isJest() {
  // @ts-ignore
  console.log('Is JEST', process.env.NODE_ENV);
  return process.env.NODE_ENV === 'test';
}
