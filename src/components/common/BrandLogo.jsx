const BrandLogo = ({ size = 44, showText = true, className = "" }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="AI-SaleBD logo"
        className="shrink-0"
      >
        <path
          d="M7 88L46 12C48 7 52 7 54 12L93 88H70L50 48L30 88H7Z"
          fill="#16A34A"
        />
        <path d="M39 88L50 66L61 88H39Z" fill="#DC2626" />
      </svg>

      {showText && (
        <div className="min-w-0 leading-none">
          <p className="whitespace-nowrap text-xl font-black tracking-tight text-white sm:text-2xl">
            AI-Sale<span className="text-[#16A34A]">BD.</span>
          </p>

          <p className="mt-1 whitespace-nowrap text-[8px] font-semibold tracking-[0.17em] text-[#A3ADA4] sm:text-[9px]">
            PREMIUM AI MARKETPLACE
          </p>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
