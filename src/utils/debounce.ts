/**
 *
 * @param fn
 * @param delayMs time delay in milliseconds
 */

export function debounce<F extends (...args: any[]) => void>(
  fn: F,
  delayMs: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delayMs);
  };
}
