import type { StoreResponse, FoodItemResponse, StoreNoticeResponse } from "@/lib/types/store";

export interface TemplateProps {
  storeId: number;
  siteLink: string;
  storeData: StoreResponse;
  foodsData: FoodItemResponse[];
  noticesData: StoreNoticeResponse[];
}
