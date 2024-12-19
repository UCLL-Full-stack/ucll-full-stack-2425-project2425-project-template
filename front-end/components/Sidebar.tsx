import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Calendar,
  ShoppingCart,
  UtensilsCrossed,
  Settings,
  LogOut,
  Globe,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/router";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, pathname: currentPath, asPath, query } = router;

  const handleLanguageChange = () => {
    const newLocale = locale === "en" ? "zh" : "en";
    router.push({ pathname: currentPath, query }, asPath, { locale: newLocale });
  };

  return (
    <aside className="w-16 h-screen fixed top-0 left-0 bg-card border-r border-border flex flex-col items-center py-4">
      <Link href="/profile" className="flex justify-center items-center w-12 h-12 mb-4 rounded-full text-primary hover:bg-avatar-hover-bg">
        <Avatar>
          <AvatarImage src="/user/avatar.jpg" alt="Profile picture" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </Link>
      <Link href="/planner" className={`flex justify-center items-center w-12 h-12 mb-4 rounded-full text-primary hover:bg-avatar-hover-bg ${pathname === "/planner" ? "bg-avatar-bg text-avatar-color" : ""}`}>
        <Calendar size={24} />
      </Link>
      <Link href="/shopping-list" className={`flex justify-center items-center w-12 h-12 mb-4 rounded-full text-primary hover:bg-avatar-hover-bg ${pathname === "/shopping-list" ? "bg-avatar-bg text-avatar-color" : ""}`}>
        <ShoppingCart size={24} />
      </Link>
      <Link href="/recipes" className={`flex justify-center items-center w-12 h-12 mb-4 rounded-full text-primary hover:bg-avatar-hover-bg ${pathname === "/recipes" ? "bg-avatar-bg text-avatar-color" : ""}`}>
        <UtensilsCrossed size={24} />
      </Link>
      <div className="flex-grow"></div>
      <button
        onClick={handleLanguageChange}
        className="flex justify-center items-center w-12 h-12 mb-4 rounded-full text-primary hover:bg-avatar-hover-bg"
        aria-label="Change Language"
      >
        <Globe size={24} />
      </button>
      <Link href="/profile" className={`flex justify-center items-center w-12 h-12 mb-4 rounded-full text-primary hover:bg-avatar-hover-bg ${pathname === "/profile" ? "bg-avatar-bg text-avatar-color" : ""}`}>
        <Settings size={24} />
      </Link>
      <Link href="/auth" className="flex justify-center items-center w-12 h-12 mb-4 rounded-full text-primary hover:bg-avatar-hover-bg">
        <LogOut size={24} />
      </Link>
    </aside>
  );
};

export default Sidebar;