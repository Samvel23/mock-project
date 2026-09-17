import { NextRequest, NextResponse } from "next/server";

const getApiBaseUrl = (): string => {
  const rawUrl =
    process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:4000/api";
  const withProtocol = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  const normalizedUrl = withProtocol.replace(/\/$/, "");

  return normalizedUrl.endsWith("/api")
    ? normalizedUrl
    : `${normalizedUrl}/api`;
};

// This route is the browser-to-backend bridge. It prevents the browser from
// parsing a Vercel HTML error page as JSON and keeps CRUD requests same-origin.
async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const targetUrl = `${getApiBaseUrl()}/${path.join("/")}${request.nextUrl.search}`;

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        "Content-Type":
          request.headers.get("content-type") ?? "application/json",
        Accept: "application/json",
      },
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : await request.text(),
      cache: "no-store",
    });

    const body = await response.arrayBuffer();
    return new NextResponse(body, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "API_PROXY_ERROR",
          message:
            "The backend API could not be reached. Check the ngrok tunnel.",
          cause: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 502 },
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
