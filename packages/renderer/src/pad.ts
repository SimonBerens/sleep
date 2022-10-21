export function padN(x: number | string, n: number) {
  return x.toString().padStart(n, '0');
}
