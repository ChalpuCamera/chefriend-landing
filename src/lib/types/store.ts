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

// 매장 정보
export interface StoreResponse {
  storeId: number;
  storeName: string;
  address: string;
  baeminLink?: string;
  yogiyoLink?: string;
  coupangEatsLink?: string;
  ddangyoLink?: string;
  naverLink?: string;
  kakaoLink?: string;
  googleMapsLink?: string;
  instagramLink?: string;
  kakaoTalkLink?: string;
  daangnLink?: string;
  siteLink: string;
  description?: string;
  thumbnailUrl?: string;
  menuCount?: number;
  requiredStampsForCoupon?: number;
  displayTemplate?: number;
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
