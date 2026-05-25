const hopByHopHeaders = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

export async function loader({ request, params }) {
  return proxyApiRequest(request, params);
}

export async function action({ request, params }) {
  return proxyApiRequest(request, params);
}

async function proxyApiRequest(request, params) {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return Response.json(
      { message: "API_PROXY_URL ou VITE_API_URL nao foi definida no servico do frontend." },
      { status: 500 }
    );
  }

  const requestUrl = new URL(request.url);
  const apiPath = params["*"] ?? "";
  const targetUrl = new URL(`${apiBaseUrl}/${apiPath}`);
  targetUrl.search = requestUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
    redirect: "manual",
  });

  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (!hopByHopHeaders.has(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

function getApiBaseUrl() {
  const value = process.env.API_PROXY_URL || process.env.VITE_API_URL;

  if (!value) {
    return "";
  }

  const normalizedValue = value.replace(/\/$/, "");
  return normalizedValue.endsWith("/api") ? normalizedValue : `${normalizedValue}/api`;
}
