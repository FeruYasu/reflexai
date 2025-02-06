const BASE_URL = "http://localhost:3000/api";

interface FetchOptions<T = unknown> {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: T;
    headers?: HeadersInit;
}

export async function apiFetch<TResponse, TBody = unknown>(
    endpoint: string,
    { method = "GET", body, headers = {} }: FetchOptions<TBody> = {}
): Promise<TResponse> {
    const config: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    console.log(response)
    if (!response?.ok) {
        throw new Error(`HTTP error! Status: ${response?.status}`);
    }

    return response.json() as Promise<TResponse>;
}