import { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreClient } from "./store-client";
import {
  fetchStoreIdBySiteLink,
  fetchStore,
  fetchFoodsByStore,
} from "@/lib/api/store";
import type { FoodItemResponse } from "@/lib/types/store";

interface StorePageProps {
  params: Promise<{ siteLink: string }>;
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const siteLink = decodeURIComponent(resolvedParams.siteLink);

  try {
    // 사이트 링크로 storeId 조회
    const storeIdResponse = await fetchStoreIdBySiteLink(siteLink);
    const storeId = storeIdResponse?.result?.storeId;

    if (!storeId) {
      return {
        title: "가게를 찾을 수 없습니다 - 셰프렌드",
      };
    }

    // 가게 정보 조회
    const storeResponse = await fetchStore(storeId);
    const store = storeResponse?.result;

    if (store) {
      return {
        title: `${store.storeName} - 셰프렌드`,
        description:
          store.description || `${store.storeName}의 메뉴를 확인하세요.`,
        openGraph: {
          title: `${store.storeName} - 셰프렌드`,
          description:
            store.description || `${store.storeName}의 메뉴를 확인하세요.`,
        },
      };
    }
  } catch {
    // Silently handle metadata fetch errors
  }

  return {
    title: `${siteLink} - 셰프렌드`,
    description: "맛있는 메뉴를 확인하세요.",
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const resolvedParams = await params;
  const siteLink = decodeURIComponent(resolvedParams.siteLink);

  try {
    // 1. 사이트 링크로 storeId 조회
    const storeIdResponse = await fetchStoreIdBySiteLink(siteLink);
    const storeId = storeIdResponse?.result?.storeId;

    if (!storeId) {
      notFound();
    }

    // 2. 기존 API로 데이터 fetch
    let storeData = null;
    let foodsData: FoodItemResponse[] = [];

    // Store 정보 fetch
    try {
      const storeResponse = await fetchStore(storeId);
      storeData = storeResponse?.result;
      console.log(storeData);
    } catch {
      // Silently handle store fetch errors
    }

    // Foods 정보 fetch
    try {
      const foodsResponse = await fetchFoodsByStore(storeId, {
        page: 0,
        size: 20,
      });
      foodsData = foodsResponse?.result?.content || [];
    } catch {
      // Silently handle foods fetch errors
    }

    // Store 정보가 없으면 기본값 생성
    if (!storeData) {
      storeData = {
        storeId: storeId,
        storeName: "",
        address: "",
        baeminLink: undefined,
        yogiyoLink: undefined,
        coupangEatsLink: undefined,
        naverLink: undefined,
        kakaoLink: undefined,
        instagramLink: undefined,
        kakaoTalkLink: undefined,
        siteLink: siteLink,
        description: undefined,
        thumbnailUrl: undefined,
      };
    }

    return (
      <StoreClient
        storeId={storeId}
        storeData={storeData}
        foodsData={foodsData}
      />
    );
  } catch (error) {
    console.error(`[StorePage] Error for siteLink ${siteLink}:`, error);
    notFound();
  }
}
