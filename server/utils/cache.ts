const cache = new Map<string, { value: any; expires: number }>();

export const getCached = async <T>(key: string): Promise<T | null> => {
  const cached = cache.get(key);
  if (!cached) return null;

  if (cached.expires < Date.now()) {
    cache.delete(key);
    return null;
  }

  return cached.value as T;
};

export const setCache = async (key: string, value: any, ttl = 3600): Promise<void> => {
  cache.set(key, {
    value,
    expires: Date.now() + ttl * 1000,
  });
};
