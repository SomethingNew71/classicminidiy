import { ref, watch, type Ref } from 'vue';

/**
 * Creates a debounced version of a reactive value
 * @param source - The source ref to debounce
 * @param delay - Debounce delay in milliseconds (default: 300)
 * @returns A ref that updates after the specified delay
 */
export function useDebounce<T>(source: Ref<T>, delay: number = 300): Ref<T> {
  const debounced = ref(source.value) as Ref<T>;
  let timeout: NodeJS.Timeout | null = null;

  watch(
    source,
    (newValue) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        debounced.value = newValue;
      }, delay);
    },
    { immediate: false }
  );

  return debounced;
}

/**
 * Creates a debounced function that only executes after a delay
 * @param func - The function to debounce
 * @param delay - Debounce delay in milliseconds (default: 300)
 * @returns A debounced version of the function
 */
export function useDebouncedFunction<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Creates a throttled function that executes at most once per delay period
 * @param func - The function to throttle
 * @param delay - Throttle delay in milliseconds (default: 100)
 * @returns A throttled version of the function
 */
export function useThrottledFunction<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 100
): (...args: Parameters<T>) => void {
  let isThrottled = false;

  return (...args: Parameters<T>) => {
    if (!isThrottled) {
      func(...args);
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
}
