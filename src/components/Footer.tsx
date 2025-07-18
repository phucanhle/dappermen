import Logo from "./Logo";
import Link from "next/link";
import { footerData } from "../../constants/footerData";

export default function Footer() {
  const { address, phone, email, website } = footerData.companyInfo;

  return (
    <footer className="bg-[#EBEBEB]">
      <div className="flex justify-between w-full max-w-screen-xl mx-auto p-4 flex-wrap">
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <Logo />
          <span>Address: {address}</span>
          <span>Phone: {phone}</span>
          <span>Email: {email}</span>
          <span>{website}</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {footerData.links.map((section) => (
            <div key={section.title} className="flex flex-col pt-5 gap-2">
              <h3 className="text-base font-bold text-gray-700">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.label} className="mt-1">
                    <Link
                      className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
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
      <p className="text-center py-2 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Shop for Men. All rights reserved.
      </p>
    </footer>
  );
}
