import { Metadata } from "next";
import { MenuClient } from "./menu-client";
import { fetchFood } from "@/lib/api/store";

interface MenuPageProps {
  params: Promise<{ siteLink: string; menuId: string }>;
}

export async function generateMetadata({ params }: MenuPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const foodId = parseInt(resolvedParams.menuId);

  try {
    const menuResponse = await fetchFood(foodId);
    const menu = menuResponse?.result;

    if (menu) {
      const menuName = menu.foodName || "메뉴";
      const imageUrl = menu.thumbnailUrl;

      return {
        title: `${menuName} - 셰프렌드`,
        description: menu.description || `${menuName} - ${menu.price.toLocaleString()}원`,
        openGraph: {
          title: `${menuName} - 셰프렌드`,
          description: menu.description || `${menuName} - ${menu.price.toLocaleString()}원`,
          images: imageUrl ? [imageUrl] : [],
        },
      };
    }
  } catch (error) {
    console.error(`[generateMetadata] Failed to fetch menu ${foodId}:`, error);
  }

  return {
    title: "메뉴 상세 - 셰프렌드",
    description: "맛평을 남겨보세요.",
  };
}

export default async function MenuPage({ params }: MenuPageProps) {
  const resolvedParams = await params;
  const foodId = parseInt(resolvedParams.menuId);

  try {
    // 서버에서 데이터 fetch (SSR) - foodId만으로 조회
    const menuResponse = await fetchFood(foodId);
    const menuData = menuResponse?.result;

    if (!menuData) {
      throw new Error("Menu data not found");
    }

    return <MenuClient menuData={menuData} storeId={menuData.storeId} />;
  } catch (error) {
    console.error(`[MenuPage] Failed to fetch menu ${foodId}:`, error);
    throw error; // Let error boundary handle it
  }
}
