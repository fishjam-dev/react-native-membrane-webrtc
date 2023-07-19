export function isJest() {
  console.log('Is JEST');
  // @ts-ignore
  return process.env.NODE_ENV === 'test';
}
