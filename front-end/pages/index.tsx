import Header from "@/components/header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight } from "react-feather";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const buttonVariants = ({
  size,
  className,
}: {
  size: string;
  className: string;
}) => {
  const baseClass =
    "inline-flex items-center justify-center font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition";
  const sizeClass = size === "lg" ? "px-6 py-3 text-lg" : "px-4 py-2 text-base";

  return `${baseClass} ${sizeClass} ${className}`;
};

const Home: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [redirectPath, setRedirectPath] = useState<string>("/login");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      switch (user.role) {
        case "admin":
          setRedirectPath("/admin");
          break;
        case "trainer":
          setRedirectPath("/users");
          break;
        case "user":
          setRedirectPath("/workouts");
          break;
        default:
          setRedirectPath("/login");
      }
    }
  }, []);

  return (
    <>
      <Header />
      <main className="py-4 bg-gray-50 min-h-screen">
        <MaxWidthWrapper className="mb-8 mt-20 sm:mt-24 flex flex-col items-center justify-center text-center">
          <div className="mx-auto mb-2 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
            <p className="text-sm font-semibold text-gray-700">
              {t("home.bannerText")}
            </p>
          </div>
          <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl text-black">
            {t("home.title")}{" "}
            <span className="text-gray-600">{t("home.titleHighlight")}</span>
          </h1>
          <p className="mt-3 max-w-prose text-zinc-700 sm:text-lg">
            {t("home.subtitle")}
          </p>
          <Link
            className={buttonVariants({
              size: "lg",
              className: "mt-4",
            })}
            href={redirectPath}
          >
            {t("home.cta")} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </MaxWidthWrapper>

        {/* User Details Table */}
        <section className="mt-12 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {t("userTable.title")}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-700"
                  >
                    {t("userTable.email")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-700"
                  >
                    {t("userTable.password")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-700"
                  >
                    {t("userTable.role")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    user1@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    User1!
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {t("userTable.admin")}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    user2@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    User2!
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {t("userTable.user")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Home;
