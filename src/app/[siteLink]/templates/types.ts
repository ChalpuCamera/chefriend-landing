import type { StoreResponse, FoodItemResponse } from "@/lib/types/store";

export interface TemplateProps {
  storeId: number;
  storeData: StoreResponse;
  foodsData: FoodItemResponse[];
}
