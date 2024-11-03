import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Calendar,
  ShoppingCart,
  UtensilsCrossed,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/profile" className="user-avatar">
        <Avatar>
          {/* Temporary hardcoded image */}
          <AvatarImage src="/user/avatar.jpg" alt="Profile picture" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </Link>
      <Link href="/planner" className={pathname === "/planner" ? "active" : ""}>
        <Calendar size={24} />
      </Link>
      <Link
        href="/shopping-list"
        className={pathname === "/shopping-list" ? "active" : ""}
      >
        <ShoppingCart size={24} />
      </Link>
      <Link href="/recipes" className={pathname === "/recipes" ? "active" : ""}>
        <UtensilsCrossed size={24} />
      </Link>
      <div style={{ flexGrow: 1 }}></div> {/* Move to global */}
      <Link href="/profile" className={pathname === "/profile" ? "active" : ""}>
        <Settings size={24} />
      </Link>
      <Link href="/auth">
        <LogOut size={24} />
      </Link>
    </aside>
  );
};

export default Sidebar;
