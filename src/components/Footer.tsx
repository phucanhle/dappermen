import Logo from "./Logo";
import Link from "next/link";
import { footerData } from "../../constants/footerData";

export default function Footer() {
  const { address, phone, email, website } = footerData.companyInfo;

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800/80 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        
        {/* Info Column */}
        <div className="flex flex-col gap-4 text-sm col-span-1 md:col-span-1 lg:col-span-1">
          <Logo />
          <p className="text-neutral-500 mt-2 leading-relaxed">
            Dapper is the ultimate online shopping destination for modern men's fashion. Premium quality, curated styles.
          </p>
          <div className="space-y-2 mt-4 text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-200">Address:</span> {address}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-200">Phone:</span> {phone}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-200">Email:</span> {email}
            </div>
            <div>
              <a href={website} className="hover:text-white transition-colors">{website}</a>
            </div>
          </div>
        </div>

        {/* Links Grid - span remaining columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:col-span-2 lg:col-span-3">
          {footerData.links.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="font-serif text-sm font-semibold tracking-wider text-neutral-100 uppercase">
                {section.title}
              </h3>
              <ul className="space-y-3 font-sans">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      className="text-xs sm:text-sm text-neutral-400 hover:text-[#d4af37] transition-colors duration-200"
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-neutral-900 text-center text-xs text-neutral-600">
        <p>&copy; {new Date().getFullYear()} Dapper Men. All rights reserved.</p>
      </div>
    </footer>
  );
}
