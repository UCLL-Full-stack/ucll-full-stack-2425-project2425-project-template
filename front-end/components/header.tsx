import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { useTranslation } from "next-i18next";
import Language from "./language/Language";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <header className="bg-[#2c2c2c] p-1 font-sans">
        <nav className="flex items-center justify-end hover-blue-500 p-2">
          {loggedInUser ? (
            <>
              <Link href="/" className="text-black p-2 mx-2 font-semibold bg-[#21b5ff] hover:bg-[#21b5ff97] rounded-md">
                {t("app.title")}
              </Link>
              <Link href="/cars" className="text-black p-2 mx-2 font-semibold bg-[#21b5ff] hover:bg-[#21b5ff97] rounded-md">
                {t("header.nav.carStock")}
              </Link>
              <Link href="/orders" className="text-black p-2 mx-2 font-semibold bg-[#21b5ff] hover:bg-[#21b5ff97] rounded-md">
                {t("header.nav.orders")}
              </Link>
              <Link href="/parts" className="text-black p-2 mx-2 font-semibold bg-[#21b5ff] hover:bg-[#21b5ff97] rounded-md">
                {t("header.nav.carPartStock")}
              </Link>
              <div className="p-2 fs-6 mt-1 ml-6 text-[#ffffff] italic under">
                {t("header.welcome")}, {loggedInUser.name}!{" "} {"("}{loggedInUser.role}{")"}
              </div>
              <Link
                href="/login"
                className="p-2 m-1 fs-6 text-black font-semibold bg-[#21b5ff] hover:bg-[#21b5ff97] rounded-md "
                onClick={() => {
                  sessionStorage.removeItem("loggedInUser");
                  localStorage.removeItem("loggedInUser");
                  setLoggedInUser(null);
                }}
              >
                {" "}
                {t("header.nav.logout")}
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="p-2 m-1 fs-6 text-black bg-[#21b5ff] hover:bg-[#21b5ff97] rounded-md"
            >
              {t("header.nav.login")}
            </Link>
          )}
          <Language/>
        </nav>
      </header>
    </>
  );
};

export default Header;
