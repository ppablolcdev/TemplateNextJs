import http from "node:http";
import https from "node:https";

const apiBaseUrl =
  process.env.BSOL_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://localhost:5059";
const allowInsecureTls = process.env.BSOL_API_ALLOW_INSECURE_TLS !== "false";

interface RequestOptions {
  body?: unknown;
  method: "GET" | "POST";
  path: string;
}

export interface RealApiResponse {
  ok: boolean;
  payload: unknown;
  status: number;
  targetUrl: string;
}

export async function callRealApi(options: RequestOptions): Promise<RealApiResponse> {
  const targetUrl = new URL(options.path, apiBaseUrl);
  const transport = targetUrl.protocol === "https:" ? https : http;
  const agent =
    targetUrl.protocol === "https:"
      ? new https.Agent({ rejectUnauthorized: !allowInsecureTls })
      : new http.Agent();

  return new Promise<RealApiResponse>((resolve, reject) => {
    const request = transport.request(
      targetUrl,
      {
        agent,
        headers: {
          Accept: "application/json",
          ...(options.body ? { "Content-Type": "application/json" } : {}),
        },
        method: options.method,
      },
      (response) => {
        let rawBody = "";

        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          rawBody += chunk;
        });
        response.on("end", () => {
          const status = response.statusCode ?? 500;
          const contentType = response.headers["content-type"] ?? "";
          const isJson = contentType.includes("application/json");

          try {
            resolve({
              ok: status >= 200 && status < 300,
              payload: isJson && rawBody ? JSON.parse(rawBody) : rawBody,
              status,
              targetUrl: targetUrl.toString(),
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    request.on("error", reject);

    if (options.body) {
      request.write(JSON.stringify(options.body));
    }

    request.end();
  });
}
