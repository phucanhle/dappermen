import Logo from "./Logo";
import Link from "next/link";
import { footerData } from "../../constants/footerData";

export default function Footer() {
    return (
        <footer className="bg-[#EBEBEB]">
            <div className="flex justify-between w-full max-w-[1440px] mx-auto p-4 flex-wrap">
                {/* Company Info */}
                <div className="flex flex-col gap-2">
                    <Logo />
                    <span>{footerData.companyInfo.address}</span>
                    <span>{footerData.companyInfo.phone}</span>
                    <span>{footerData.companyInfo.email}</span>
                    <span>{footerData.companyInfo.website}</span>
                </div>

                {/* Dynamic Links */}
                <div className="flex py-4 gap-10">
                    {footerData.links.map((section) => (
                        <div key={section.title} className="flex flex-col pt-5 gap-2">
                            <h3 className="text-xl font-bold">{section.title}</h3>
                            <ul>
                                {section.items.map((item) => (
                                    <li key={item.label} className="mt-1">
                                        <Link href={item.href}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-center py-2">&copy; {new Date().getFullYear()} Shop for Men. All rights reserved.</p>
        </footer>
    );
}
