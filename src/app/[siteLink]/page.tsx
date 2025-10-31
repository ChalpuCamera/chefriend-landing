import { Metadata } from "next";
import { notFound } from "next/navigation";
import Template3 from "./templates/template3";
import {
  fetchStoreIdBySiteLink,
  fetchStore,
  fetchFoodsByStore,
  fetchNoticesByStore,
} from "@/lib/api/store";
import type { FoodItemResponse, StoreNoticeResponse } from "@/lib/types/store";

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
        title: "가게를 찾을 수 없습니다",
        description: "요청하신 가게를 찾을 수 없습니다.",
      };
    }

    // 가게 정보 조회
    const storeResponse = await fetchStore(storeId);
    const store = storeResponse?.result;

    if (store) {
      const title = store.storeName;
      const description =
        store.description || `${store.storeName}의 메뉴를 확인하고 주문하세요.`;
      const imageUrl = store.thumbnailUrl || "/landing1.png";
      const url = `/${siteLink}`;

      // 키워드 동적 생성
      const keywords = [
        store.storeName,
        `${store.storeName} 메뉴`,
        `${store.storeName} 주문`,
        store.address,
        "음식점",
        "배달",
        "포장",
        "셰프렌드",
      ].filter((keyword): keyword is string => Boolean(keyword));

      return {
        title,
        description,
        keywords,
        alternates: {
          canonical: url,
        },
        openGraph: {
          title,
          description,
          type: "website",
          locale: "ko_KR",
          url,
          siteName: "셰프렌드",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: `${store.storeName} - 셰프렌드`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [imageUrl],
        },
      };
    }
  } catch {
    // Silently handle metadata fetch errors
  }

  return {
    title: siteLink,
    description: "맛있는 메뉴를 확인하세요.",
    alternates: {
      canonical: `/${siteLink}`,
    },
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

    // 2. Store 정보 fetch
    const storeResponse = await fetchStore(storeId);
    const storeData = storeResponse?.result;

    if (!storeData) {
      notFound();
    }

    // 3. Foods 정보 fetch
    let foodsData: FoodItemResponse[] = [];
    try {
      const foodsResponse = await fetchFoodsByStore(storeId, {
        page: 0,
        size: 20,
      });
      foodsData = foodsResponse?.result?.content || [];
    } catch {
      // Silently handle foods fetch errors
    }

    // 4. Notices 정보 fetch
    let noticesData: StoreNoticeResponse[] = [];
    try {
      const noticesResponse = await fetchNoticesByStore(storeId, {
        page: 0,
        size: 20,
      });
      noticesData = noticesResponse?.result?.content || [];
    } catch {
      // Silently handle notices fetch errors
    }

    // Restaurant Schema for JSON-LD
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: storeData.storeName,
      description:
        storeData.description ||
        `${storeData.storeName}의 메뉴를 확인하고 주문하세요.`,
      image: storeData.thumbnailUrl || "/landing1.png",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.chefriend.kr"}/${siteLink}`,
      address: storeData.address
        ? {
            "@type": "PostalAddress",
            streetAddress: storeData.address,
            addressCountry: "KR",
          }
        : undefined,
      hasMenu:
        foodsData.length > 0
          ? {
              "@type": "Menu",
              hasMenuSection: {
                "@type": "MenuSection",
                name: "메뉴",
                hasMenuItem: foodsData.map((food) => ({
                  "@type": "MenuItem",
                  name: food.foodName,
                  description: food.description,
                  image: food.thumbnailUrl,
                  offers: {
                    "@type": "Offer",
                    price: food.price,
                    priceCurrency: "KRW",
                  },
                })),
              },
            }
          : undefined,
      servesCuisine: "Korean",
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Template3
          storeId={storeId}
          storeData={storeData}
          foodsData={foodsData}
          noticesData={noticesData}
        />
      </>
    );
  } catch (error) {
    console.error(`[StorePage] Error for siteLink ${siteLink}:`, error);
    notFound();
  }
}
