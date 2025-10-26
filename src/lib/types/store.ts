// API 공통 응답 타입
export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface Pageable extends Record<string, unknown> {
  page?: number;
  size?: number;
  sort?: string[];
}

// Link Types
export type LinkType =
  | "BAEMIN"
  | "YOGIYO"
  | "COUPANGEATS"
  | "NAVER_MAP"
  | "KAKAO_MAP"
  | "INSTAGRAM"
  | "KAKAO_TALK"
  | "GOOGLE_MAPS"
  | "DDANGYO"
  | "DAANGN"
  | "CUSTOM";

export interface LinkItem {
  linkType: LinkType;
  url: string;
  customLabel?: string;  // CUSTOM 타입일 때 사용
  label?: string;        // 백엔드 응답에만 포함됨
}

// 매장 정보
export interface StoreResponse {
  storeId: number;
  storeName: string;
  address?: string;
  description?: string;
  siteLink?: string;
  feedbackCount?: number;
  menuCount?: number;
  thumbnailUrl?: string;
  requiredStampsForCoupon?: number;
  displayTemplate?: number;
  links: LinkItem[];
}

// 음식 정보
export interface FoodItemResponse {
  foodItemId: number;
  storeId: number;
  foodName: string;
  description?: string;
  price: number;
  isActive: boolean;
  thumbnailUrl?: string;
  categoryName?: string;
  createdAt: string;
  updatedAt: string;
}

// 가게 이름으로 조회 Response
export interface StoreIdResponse {
  storeId: number;
  storeName?: string;
}
