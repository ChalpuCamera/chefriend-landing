"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/landing/ui/card";
import type { StoreNoticeResponse } from "@/lib/types/store";

interface NoticeSectionProps {
  notices: StoreNoticeResponse[];
}

export function NoticeSection({ notices }: NoticeSectionProps) {
  const [expandedNoticeIds, setExpandedNoticeIds] = useState<Set<number>>(
    new Set()
  );
  const [noticesWithOverflow, setNoticesWithOverflow] = useState<Set<number>>(
    new Set()
  );
  const contentRefs = useRef<Map<number, HTMLParagraphElement>>(new Map());

  // 최신순 정렬 (createdAt 기준)
  const sortedNotices = [...notices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // 내용이 넘치는지 확인
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const overflowSet = new Set<number>();

      sortedNotices.forEach((notice) => {
        const element = contentRefs.current.get(notice.id);
        if (element) {
          // 실제 렌더링된 높이가 한 줄 높이(약 20px)보다 크거나
          // 텍스트 길이가 일정 이상이면 overflow로 판단
          const lineHeight = 20; // text-sm의 line-height
          const hasMultipleLines = element.scrollHeight > lineHeight * 1.5;
          const hasLongText = notice.body.length > 50;

          if (hasMultipleLines || hasLongText) {
            overflowSet.add(notice.id);
          }
        }
      });

      setNoticesWithOverflow((prev) => {
        const prevIds = Array.from(prev).sort().join(",");
        const newIds = Array.from(overflowSet).sort().join(",");
        return prevIds === newIds ? prev : overflowSet;
      });
    }, 200);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notices.length]);

  const toggleNoticeExpansion = (noticeId: number) => {
    setExpandedNoticeIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(noticeId)) {
        newSet.delete(noticeId);
      } else {
        newSet.add(noticeId);
      }
      return newSet;
    });
  };

  const setContentRef = (
    noticeId: number,
    element: HTMLParagraphElement | null
  ) => {
    if (element) {
      contentRefs.current.set(noticeId, element);
    } else {
      contentRefs.current.delete(noticeId);
    }
  };

  if (!notices || notices.length === 0) {
    return null;
  }

  const renderNoticeCard = (notice: StoreNoticeResponse) => {
    const isNoticeExpanded = expandedNoticeIds.has(notice.id);
    const hasOverflow = noticesWithOverflow.has(notice.id);

    return (
      <Card
        key={notice.id}
        className={`border border-gray-200 transition-all duration-300 ${
          isNoticeExpanded ? "" : "h-[110px]"
        }`}
      >
        <CardContent className="p-4 flex flex-col h-full">
          <h3 className="font-semibold text-gray-900 mb-2 text-base flex-shrink-0 truncate">
            {notice.title}
          </h3>
          <div className={`flex flex-col min-h-0 ${isNoticeExpanded ? 'flex-1' : 'flex-shrink-0'}`}>
            {isNoticeExpanded ? (
              <div className="flex flex-col max-h-[250px]">
                <div className="flex-1 overflow-y-auto">
                  <p
                    ref={(el) => setContentRef(notice.id, el)}
                    className="text-sm text-gray-600 whitespace-pre-wrap break-words"
                  >
                    {notice.body}
                  </p>
                </div>
                {hasOverflow && (
                  <button
                    onClick={() => toggleNoticeExpansion(notice.id)}
                    className="mt-2 text-sm text-[#7790AC] font-bold flex-shrink-0"
                  >
                    접기
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="relative">
                  <p className="text-sm text-gray-600 whitespace-pre-wrap break-words line-clamp-1 pr-16">
                    {notice.body}
                  </p>
                  {hasOverflow && (
                    <button
                      onClick={() => toggleNoticeExpansion(notice.id)}
                      className="absolute bottom-0 right-0 text-sm text-[#7790AC] font-bold bg-white pl-1"
                    >
                      더보기
                    </button>
                  )}
                </div>
                {/* overflow 감지용 숨겨진 요소 */}
                <p
                  ref={(el) => setContentRef(notice.id, el)}
                  className="text-sm absolute invisible whitespace-pre-wrap break-words"
                  style={{ width: 'calc(100% - 2rem)' }}
                >
                  {notice.body}
                </p>
              </>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-2 flex-shrink-0">
            {new Date(notice.createdAt).toLocaleDateString("ko-KR")}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full space-y-3">
      {/* 최신 공지사항 1개 */}
      {sortedNotices.slice(0, 1).map((notice) => renderNoticeCard(notice))}

      {/* 나머지 공지사항들 표시 */}
      {sortedNotices.length > 1 && (
        <details className="group">
          <summary className="cursor-pointer text-sm text-[#7790AC] font-bold list-none flex items-center justify-center py-2">
            <span className="group-open:hidden">
              이전 공지사항 {sortedNotices.length - 1}개 더보기
            </span>
            <span className="hidden group-open:inline">접기</span>
          </summary>

          {/* 스크롤 가능한 공지사항이 있을 때 힌트 */}
          {sortedNotices.length > 4 && (
            <div className="text-center pt-2 pb-1 sticky bottom-0 bg-white">
              <p className="text-xs text-gray-500">
                ↓ 스크롤하여 더 많은 공지사항 보기 ↓
              </p>
            </div>
          )}
          <div
            className={`space-y-3 mt-3 ${
              sortedNotices.length > 3 ? "max-h-[380px] overflow-y-auto" : ""
            }`}
          >
            {sortedNotices.slice(1).map((notice) => renderNoticeCard(notice))}
          </div>
        </details>
      )}
    </div>
  );
}
