const BrandHeader = () => {
  return (
    <section className="bg-slate-50 border-b border-slate-200/60 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            {/* 브랜드 favicon.ico 아이콘 */}
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/favicon.ico"
                alt="chefriend logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* 서비스 이름 */}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="text-slate-800">셰프랜드</span>
              <span className="text-slate-600 text-lg md:text-xl ml-2"></span>
            </h1>

            {/* 서브 텍스트 */}
            <div className="hidden sm:flex items-center space-x-2 text-slate-500">
              <span className="text-sm font-medium">|</span>
              <span className="text-sm font-medium">
                사장님을 위한 피드백 솔루션
              </span>
            </div>
          </div>

          {/* 베타 배지 */}
          <div className="flex items-center justify-center bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
            <span className="text-xs font-semibold text-purple-700 tracking-wide">
              BETA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandHeader;
