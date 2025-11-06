// Customer-facing types for menu detail page

export interface FoodItemResponse {
  id?: number;          // Alias for foodItemId
  foodItemId?: number;
  storeId: number;
  name?: string;        // Alias for foodName
  foodName?: string;
  description?: string;
  price: number;
  isActive: boolean;
  photoUrl?: string;    // Main field from backend
  thumbnailUrl?: string; // Backwards compatibility
  categoryName?: string;
  hasActiveReview?: boolean;
  activeQuestionCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PhotoResponse {
  photoId: number;
  storeId: number;
  userId: number;
  foodItemId?: number;
  imageUrl: string;
  fileName: string;
  fileSize?: number;
  imageWidth?: number;
  imageHeight?: number;
  createdAt: string;
}
