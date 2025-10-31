// Server-side API fetch functions for SSR
import type {
  ApiResponse,
  PageResponse,
  Pageable,
  StoreResponse,
  FoodItemResponse,
  StoreIdResponse,
  StoreNoticeResponse,
} from "@/lib/types/store";

// Use server-only API_URL or fallback to NEXT_PUBLIC for compatibility
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";

async function serverFetch<T>(
  endpoint: string,
  options?: RequestInit & { params?: Record<string, unknown> }
): Promise<T> {
  // Validate API URL
  if (!API_URL) {
    const errorMsg = "[Server API] API_URL is not configured";
    console.error(errorMsg, {
      nodeEnv: process.env.NODE_ENV,
      apiUrl: API_URL,
      nextPublicApiUrl: process.env.NEXT_PUBLIC_API_URL,
    });
    throw new Error("API_URL is not configured");
  }

  // Query parameters 처리
  let url = `${API_URL}${endpoint}`;
  if (options?.params) {
    const searchParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    url += `?${searchParams.toString()}`;
  }

  console.log(`[Server API] Fetching: ${url}`);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      cache: options?.cache || "no-store", // SSR by default
    });

    console.log(`[Server API] Response: ${endpoint} - Status ${response.status}`);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));

      // Only log non-404 errors to reduce noise
      if (response.status !== 404) {
        console.error(
          `[Server API Error] ${endpoint}:`,
          response.status,
          JSON.stringify(error, null, 2)
        );
      }

      throw new Error(error.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      `[Server API] Success: ${endpoint}`,
      typeof data === "object" ? Object.keys(data) : typeof data
    );
    return data;
  } catch (error) {
    console.error(`[Server API Fetch Error] ${endpoint}:`, error);
    throw error;
  }
}

// 사이트 링크로 storeId 조회
export async function fetchStoreIdBySiteLink(
  siteLink: string
): Promise<ApiResponse<StoreIdResponse>> {
  return serverFetch(`/api/public/stores/${encodeURIComponent(siteLink)}`);
}

// Store APIs
export async function fetchStore(
  storeId: number
): Promise<ApiResponse<StoreResponse>> {
  return serverFetch(`/api/stores/${storeId}`);
}

// Food APIs
export async function fetchFoodsByStore(
  storeId: number,
  pageable?: Pageable
): Promise<ApiResponse<PageResponse<FoodItemResponse>>> {
  return serverFetch(`/api/foods/store/${storeId}`, { params: pageable });
}

// Notice APIs
export async function fetchNoticesByStore(
  storeId: number,
  pageable?: Pageable
): Promise<ApiResponse<PageResponse<StoreNoticeResponse>>> {
  return serverFetch(`/api/stores/${storeId}/notices`, { params: pageable });
}
