"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Info, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/courses", label: "Courses", icon: LayoutGrid },
  { href: "/about", label: "About", icon: Info },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <header className="fixed bottom-0 left-0 right-0 h-16 bg-primary border-t border-border shadow-t-lg z-50">
      <nav className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors duration-200 ease-in-out",
                isActive
                  ? "text-primary-foreground font-bold"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
