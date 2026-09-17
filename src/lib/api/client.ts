const getBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;

  if (envUrl) {
    // Если протокол засылается без http/https, добавляем http://
    return envUrl.startsWith("http") ? envUrl : `http://${envUrl}`;
  }

  return "http://localhost:4000";
};

export async function fetcher(
  endpoint: string,
  options?: RequestInit,
): Promise<unknown> {
  const baseUrl = getBaseUrl().replace(/\/$/, ""); // Удаляем слэш в конце, если есть
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`; // Гарантируем слэш в начале
  const fullUrl = `${baseUrl}${cleanEndpoint}`;

  const res = await fetch(fullUrl, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API Error [\({res.status}]:\){res.statusText}`);
  }

  return res.json();
}
