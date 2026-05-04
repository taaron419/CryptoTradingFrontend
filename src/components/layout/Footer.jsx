import appLogo from "../../assets/site/coinbase-logo.svg";
import xIcon from "../../assets/site/x.svg";
import linkedinIcon from "../../assets/site/linkedin.svg";
import instagramIcon from "../../assets/site/instagram.svg";
import tiktokIcon from "../../assets/site/tiktok.svg";
import FooterDisclaimer from "./FooterDisclaimer";

const leftFooterColumns = [
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Affiliates",
      "Blog",
      "Press",
      "Security",
      "Investors",
      "Vendors",
      "Legal & privacy",
      "Cookie policy",
      "Cookie preferences",
      "Digital Asset Disclosures",
    ],
  },
  {
    title: "Learn",
    links: [
      "Explore crypto",
      "Explore stocks",
      "Market statistics",
      "Coinbase Bytes newsletter",
      "Crypto basics",
      "Tips & tutorials",
      "Crypto glossary",
      "Market updates",
      "What is Bitcoin?",
      "What is crypto?",
      "What is a blockchain?",
      "How to set up a crypto wallet?",
      "How to send crypto?",
      "Taxes",
    ],
  },
  {
    title: "Support",
    links: [
      "Help center",
      "Contact us",
      "Create account",
      "ID verification",
      "Account information",
      "Payment methods",
      "Account access",
      "Supported crypto",
      "Status",
    ],
  },
];

const rightFooterColumns = [
  {
    title: "Individuals",
    links: ["Buy & sell", "Base App", "Coinbase One", "Debit Card"],
  },
  {
    title: "Businesses",
    links: ["Asset Listings", "Coinbase Business", "Payments", "Token Manager"],
  },
  {
    title: "Institutions",
    links: [
      "Prime",
      "Staking",
      "Exchange",
      "International Exchange",
      "Derivatives Exchange",
      "Verified Pools",
    ],
  },
  {
    title: "Developers",
    links: [
      "Developer Platform",
      "Base",
      "Server Wallets",
      "Embedded Wallets",
      "Base Accounts (Smart Wallets)",
      "Onramp & Offramp",
      "x402",
      "Trade API",
      "Paymaster",
      "OnchainKit",
      "Data API",
      "Verifications",
      "Node",
      "AgentKit",
      "Staking",
      "Faucet",
      "Exchange API",
      "International Exchange API",
      "Prime API",
      "Derivatives API",
    ],
  },
  {
    title: "Asset prices",
    links: ["Bitcoin price", "Ethereum price", "Solana price", "XRP price"],
  },
  {
    title: "Stock prices",
    links: ["NVIDIA price", "Apple price", "Microsoft price", "Amazon price"],
  },
];

const FooterLinkColumn = ({ column }) => (
  <div>
    <h3 className="text-[22px] font-semibold leading-none text-black">
      {column.title}
    </h3>
    <ul className="mt-5 space-y-4">
      {column.links.map((item) => (
        <li key={item}>
          <a
            href="#"
            className="text-[24px] leading-tight text-[#4f5d73] transition hover:text-[#0052ff]"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const socialLinks = [
    { name: "X", icon: xIcon },
    { name: "LinkedIn", icon: linkedinIcon },
    { name: "Instagram", icon: instagramIcon },
    { name: "TikTok", icon: tiktokIcon },
  ];

  return (
    <footer className="border-t border-slate-300 bg-[#eef1f5]">
      <div className="px-7 py-16 sm:px-12 lg:px-[70px]">
        <img src={appLogo} alt="Coinbase" className="h-20 w-20" />

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-[120px]">
          <div className="space-y-12">
            {leftFooterColumns.map((column) => (
              <FooterLinkColumn key={column.title} column={column} />
            ))}
          </div>

          <div className="space-y-12">
            {rightFooterColumns.map((column) => (
              <FooterLinkColumn key={column.title} column={column} />
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-center gap-14">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href="#"
              aria-label={item.name}
              className="inline-flex transition hover:opacity-65"
            >
              <img
                src={item.icon}
                alt={item.name}
                className="h-8 w-8 brightness-0"
              />
            </a>
          ))}
        </div>

        <div className="mt-12">
          <FooterDisclaimer />
        </div>

        <div className="mt-12 border-t border-slate-300 pt-9 text-[24px] text-[#4f5d73]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="text-black">© 2026 Coinbase</span>
              <span> • </span>
              <a href="#" className="hover:text-[#0052ff]">
                Privacy
              </a>
              <span> • </span>
              <a href="#" className="hover:text-[#0052ff]">
                Terms & Conditions
              </a>
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-3 text-[#4f5d73] transition hover:text-[#0052ff]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.05a15.2 15.2 0 0 0-1.2-5.1A8.02 8.02 0 0 1 19.93 11ZM12 4c.98 0 2.34 2.15 2.85 7H9.15C9.66 6.15 11.02 4 12 4ZM8.32 5.9A15.2 15.2 0 0 0 7.12 11H4.07a8.02 8.02 0 0 1 4.25-5.1ZM4.07 13h3.05c.18 1.85.6 3.6 1.2 5.1A8.02 8.02 0 0 1 4.07 13ZM12 20c-.98 0-2.34-2.15-2.85-7h5.7c-.51 4.85-1.87 7-2.85 7Zm3.68-1.9c.6-1.5 1.02-3.25 1.2-5.1h3.05a8.02 8.02 0 0 1-4.25 5.1Z"
                  fill="currentColor"
                />
              </svg>
              <span>Global</span>
              <span>•</span>
              <span>English</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
