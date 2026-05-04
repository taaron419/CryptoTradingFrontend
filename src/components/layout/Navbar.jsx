import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import coinbaseLogo from "../../assets/coinbase/coinbaseLogoNavigation-4.svg";

const localeOptions = [
  { country: "United States", language: "English" },
  { country: "United Kingdom", language: "English" },
  { country: "France", language: "Francais" },
  { country: "Germany", language: "Deutsch" },
  { country: "Spain", language: "Espanol" },
  { country: "Nigeria", language: "English" },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[29px] w-[29px]" aria-hidden="true">
    <path
      d="M10.8 3.25a7.55 7.55 0 1 0 4.76 13.4l4.39 4.39 1.42-1.42-4.39-4.39A7.55 7.55 0 0 0 10.8 3.25Zm0 2a5.55 5.55 0 1 1 0 11.1 5.55 5.55 0 0 1 0-11.1Z"
      fill="currentColor"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.05a15.2 15.2 0 0 0-1.2-5.1A8.02 8.02 0 0 1 19.93 11ZM12 4c.98 0 2.34 2.15 2.85 7H9.15C9.66 6.15 11.02 4 12 4ZM8.32 5.9A15.2 15.2 0 0 0 7.12 11H4.07a8.02 8.02 0 0 1 4.25-5.1ZM4.07 13h3.05c.18 1.85.6 3.6 1.2 5.1A8.02 8.02 0 0 1 4.07 13ZM12 20c-.98 0-2.34-2.15-2.85-7h5.7c-.51 4.85-1.87 7-2.85 7Zm3.68-1.9c.6-1.5 1.02-3.25 1.2-5.1h3.05a8.02 8.02 0 0 1-4.25 5.1Z"
      fill="currentColor"
    />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
    <path d="M4 7h16v2H4V7Zm0 4h16v2H4v-2Zm0 4h16v2H4v-2Z" fill="currentColor" />
  </svg>
);

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
    <path
      d="M10.4 5.4 3.8 12l6.6 6.6 1.4-1.4L7.6 13H20v-2H7.6l4.2-4.2-1.4-1.4Z"
      fill="currentColor"
    />
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocale, setSelectedLocale] = useState(localeOptions[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem("coinbaseToken")));
  const actionRef = useRef(null);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!actionRef.current?.contains(event.target)) {
        setSearchOpen(false);
        setLocaleOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("coinbaseToken")));
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("coinbase-auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("coinbase-auth-change", syncAuth);
    };
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? "text-[#0052ff]" : "text-slate-700 hover:text-[#0052ff]"}`;

  const mobileMenuItems = [
    { label: "Cryptocurrencies", href: "/explore", route: true, arrow: false },
    { label: "Individuals", href: "#", route: false, arrow: true },
    { label: "Businesses", href: "#", route: false, arrow: true },
    { label: "Institutions", href: "#", route: false, arrow: true },
    { label: "Developers", href: "#", route: false, arrow: true },
    { label: "Company", href: "#", route: false, arrow: true },
  ];

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Clear the frontend session even if the cookie request fails.
    } finally {
      localStorage.removeItem("coinbaseToken");
      localStorage.removeItem("coinbaseUser");
      window.dispatchEvent(new Event("coinbase-auth-change"));
      setMenuOpen(false);
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <a
        href="#"
        className="block bg-gradient-to-r from-[#020617] via-[#0b37a5] to-[#5797ff] px-4 py-2 text-center text-[13px] font-semibold text-white sm:text-[20px]"
      >
        <span className="border-b-2 border-white leading-none">
          Unlock One month of rewards with Coinbase One. Join now for 20% off your first year of an annual plan.¹
        </span>
      </a>

      <div className="flex h-[108px] items-center gap-4 border-b border-slate-200 px-7 sm:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="Coinbase home">
          <img src={coinbaseLogo} alt="Coinbase" className="h-14 w-14" />
        </Link>

        {!isHomePage ? (
          <Link
            to="/"
            className="grid h-[56px] w-[56px] place-items-center rounded-full bg-[#f0f3f7] text-black transition hover:bg-slate-200"
            aria-label="Back to homepage"
          >
            <BackArrowIcon />
          </Link>
        ) : null}

        <nav className="hidden items-center gap-6">
          <NavLink to="/explore" className={navLinkClass}>Cryptocurrencies</NavLink>
          <a href="#" className="text-sm font-medium text-slate-700 hover:text-[#0052ff]">Individuals</a>
          <a href="#" className="text-sm font-medium text-slate-700 hover:text-[#0052ff]">Businesses</a>
          <a href="#" className="text-sm font-medium text-slate-700 hover:text-[#0052ff]">Institutions</a>
          <NavLink to="/learn" className={navLinkClass}>Learn</NavLink>
        </nav>

        <div ref={actionRef} className="ml-auto flex items-center gap-2">
          <div className="relative flex items-center">
            {searchOpen ? (
              <div className="absolute right-20 top-1/2 w-56 -translate-y-1/2 sm:w-72">
                <Input
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="h-10 rounded-full bg-slate-50"
                />
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setLocaleOpen(false);
              }}
              className="grid h-[70px] w-[70px] place-items-center rounded-full bg-[#f0f3f7] text-black transition hover:bg-slate-200"
              aria-label="Open search"
            >
              <SearchIcon />
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setLocaleOpen((prev) => !prev);
                setSearchOpen(false);
              }}
              className="grid h-[70px] w-[70px] place-items-center rounded-full bg-[#f0f3f7] text-black transition hover:bg-slate-200"
              aria-label="Change region and language"
            >
              <GlobeIcon />
            </button>

            {localeOpen ? (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Region and language
                </p>
                <div className="max-h-64 overflow-y-auto">
                  {localeOptions.map((option) => {
                    const active =
                      option.country === selectedLocale.country &&
                      option.language === selectedLocale.language;

                    return (
                      <button
                        key={`${option.country}-${option.language}`}
                        type="button"
                        onClick={() => {
                          setSelectedLocale(option);
                          setLocaleOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${
                          active ? "bg-[#e8f0ff] text-[#0052ff]" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{option.country}</span>
                        <span className="text-slate-500">{option.language}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="hidden h-[70px] items-center rounded-full bg-[#f0f3f7] px-8 text-[22px] font-semibold text-black transition hover:bg-slate-200 sm:inline-flex"
              >
                Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden h-[70px] items-center rounded-full bg-[#f0f3f7] px-8 text-[22px] font-semibold text-black transition hover:bg-slate-200 sm:inline-flex"
              >
                Log out
              </button>
            </>
          ) : null}

          {!isAuthenticated ? (
            <>
              <Link to="/signin">
                <Button variant="secondary" className="hidden h-[72px] rounded-full px-9 text-[24px] font-semibold text-black sm:inline-flex sm:items-center">
                  Sign in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="hidden h-[72px] rounded-full px-10 text-[24px] font-semibold sm:inline-flex sm:items-center">
                  Sign up
                </Button>
              </Link>
            </>
          ) : null}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="grid h-[72px] w-[72px] place-items-center rounded-full bg-slate-100 text-black transition hover:bg-slate-200"
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-[70] xl:hidden">
          <div className="flex h-full flex-col bg-white">
            <a
              href="#"
              className="block bg-gradient-to-r from-[#020617] via-[#0b37a5] to-[#5797ff] px-4 py-2 text-center text-[13px] font-semibold text-white sm:text-[20px]"
            >
              <span className="border-b-2 border-white leading-none">
                Unlock One month of rewards with Coinbase One. Join now for 20% off your first year of an annual plan.¹
              </span>
            </a>

            <div className="flex h-[100px] items-center justify-between border-b border-slate-200 px-2">
              <img src={coinbaseLogo} alt="Coinbase" className="h-14 w-14" />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="grid h-[72px] w-[72px] place-items-center rounded-full bg-[#f0f3f7] text-black"
                  aria-label="Open search"
                >
                  <SearchIcon />
                </button>
                <button
                  type="button"
                  className="grid h-[72px] w-[72px] place-items-center rounded-full bg-[#f0f3f7] text-black"
                  aria-label="Open locale selector"
                >
                  <GlobeIcon />
                </button>
                {!isAuthenticated ? (
                  <>
                    <Link to="/signin" onClick={() => setMenuOpen(false)}>
                      <Button variant="secondary" className="h-[72px] rounded-full px-9 text-[24px] font-semibold text-black">Sign in</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMenuOpen(false)}>
                      <Button className="h-[72px] rounded-full px-10 text-[24px] font-semibold">Sign up</Button>
                    </Link>
                  </>
                ) : null}
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="grid h-[72px] w-[72px] place-items-center rounded-full bg-[#f0f3f7] text-[46px] font-light leading-none text-black"
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-white px-2 py-[62px]">
              <div className="space-y-[42px]">
                {mobileMenuItems.map((item) =>
                  item.route ? (
                    <NavLink
                      key={item.label}
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between text-[35px] font-normal leading-none text-black"
                    >
                      <span>{item.label}</span>
                      {item.arrow ? <span className="text-[35px] font-light leading-none text-black">›</span> : null}
                    </NavLink>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between text-[35px] font-normal leading-none text-black"
                    >
                      <span>{item.label}</span>
                      {item.arrow ? <span className="text-[35px] font-light leading-none text-black">›</span> : null}
                    </a>
                  ),
                )}
                {isAuthenticated ? (
                  <NavLink
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between text-[35px] font-normal leading-none text-black"
                  >
                    <span>Profile</span>
                  </NavLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
