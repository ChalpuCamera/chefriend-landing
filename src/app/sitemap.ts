import { MetadataRoute } from 'next';

// API URL
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.chefriend.kr';

/**
 * 백엔드 API 응답 타입
 */
interface Store {
  storeId: number;
  storeName: string;
  siteLink: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  result: T;
}

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

/**
 * 백엔드에서 모든 가게 목록 가져오기
 */
async function fetchAllStores(): Promise<Store[]> {
  if (!API_URL) {
    console.warn('[Sitemap] API_URL is not configured');
    return [];
  }

  try {
    // 충분히 큰 페이지 사이즈로 모든 가게 가져오기
    const response = await fetch(`${API_URL}/api/stores/all?page=0&size=10000`, {
      next: { revalidate: 3600 }, // 1시간마다 재생성
    });

    if (!response.ok) {
      console.error('[Sitemap] Failed to fetch stores:', response.status);
      return [];
    }

    const data: ApiResponse<PageResponse<Store>> = await response.json();
    return data.result?.content || [];
  } catch (error) {
    console.error('[Sitemap] Error fetching stores:', error);
    return [];
  }
}

/**
 * Sitemap 생성
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/term`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/operation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // 2. 동적 가게 페이지
  const stores = await fetchAllStores();

  // siteLink가 유효한 가게만 필터링
  const validStores = stores.filter(
    (store) => store.siteLink && store.siteLink.trim() !== ''
  );

  const dynamicPages: MetadataRoute.Sitemap = validStores.map((store) => ({
    url: `${SITE_URL}/${encodeURIComponent(store.siteLink)}`,
    lastModified: store.updatedAt ? new Date(store.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 개발 환경에서 로그 출력
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Sitemap] Generated ${staticPages.length} static pages`);
    console.log(`[Sitemap] Generated ${dynamicPages.length} dynamic store pages`);
  }

  // 3. 정적 + 동적 페이지 결합
  return [...staticPages, ...dynamicPages];
}
