import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Получаем значение переменной и удаляем случайные пробелы
    const rawUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

    // Если переменная пустая — ставим дефолтный адрес ngrok или localhost
    let apiUrl =
      rawUrl && rawUrl.length > 0 ? rawUrl : "http://localhost:4000/api";

    // Гарантируем наличие валидного протокола
    if (!apiUrl.startsWith("http://") && !apiUrl.startsWith("https://")) {
      apiUrl = `https://${apiUrl}`;
    }

    // Удаляем слэш в конце
    apiUrl = apiUrl.replace(/\/$/, "");

    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
