// Client-side API functions for coupon operations
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface CouponMembershipResponse {
  currentStamps: number;
  canRedeem: boolean;
}

interface CouponGeneratePinResponse {
  pin: string;
  expiredAt: string;
}

interface CouponRedeemResponse {
  success: boolean;
  currentStamps: number;
}

interface StoreIdResponse {
  storeId: number;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

// Fetch storeId by siteLink (client-side version)
export async function fetchStoreIdBySiteLink(
  siteLink: string
): Promise<number> {
  const url = `${API_BASE_URL}/api/public/stores/${siteLink}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("매장 정보를 찾을 수 없습니다");
  }

  const data: ApiResponse<StoreIdResponse> = await response.json();
  return data.result.storeId;
}

// Fetch membership information
export async function fetchMembership(
  storeId: number,
  phone: string
): Promise<CouponMembershipResponse> {
  const url = `${API_BASE_URL}/api/coupon/membership?storeId=${storeId}&phone=${encodeURIComponent(phone)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("쿠폰 정보를 불러올 수 없습니다");
  }

  const data: ApiResponse<CouponMembershipResponse> = await response.json();
  return data.result;
}

// Generate PIN for stamp earning
export async function generatePin(
  storeId: number,
  phone: string
): Promise<CouponGeneratePinResponse> {
  const url = `${API_BASE_URL}/api/coupon/generate-pin`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ storeId, phone }),
  });

  if (!response.ok) {
    throw new Error("PIN 생성에 실패했습니다");
  }

  const data: ApiResponse<CouponGeneratePinResponse> = await response.json();
  return data.result;
}

// Redeem coupon (use stamps)
export async function redeemCoupon(
  storeId: number,
  phone: string
): Promise<CouponRedeemResponse> {
  const url = `${API_BASE_URL}/api/coupon/redeem`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ storeId, phone }),
  });

  if (!response.ok) {
    throw new Error("쿠폰 사용에 실패했습니다");
  }

  const data: ApiResponse<CouponRedeemResponse> = await response.json();
  return data.result;
}
