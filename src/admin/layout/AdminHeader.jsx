import { Bell, Menu, Search, UserCircle } from "lucide-react";

function AdminHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#171326]/95 px-4 backdrop-blur sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#AAA3C1] transition hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
          aria-expanded="false"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
          <Search size={17} className="text-[#AAA3C1]" />
          <input
            type="search"
            placeholder="Search anything..."
            className="w-48 bg-transparent text-sm text-white outline-none placeholder:text-[#AAA3C1]"
          />
        </div>

        <h1 className="text-sm font-semibold sm:hidden">AI-SaleBD Admin</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2 text-[#AAA3C1] transition hover:bg-white/10 hover:text-white"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-purple-500" />
        </button>

        <div className="flex items-center gap-2 border-l border-white/10 pl-3">
          <UserCircle size={30} className="text-[#B99AFF]" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Administrator</p>
            <p className="text-xs text-[#AAA3C1]">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
