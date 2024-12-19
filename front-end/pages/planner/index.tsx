import CalendarGrid from "@/components/planner/calendar/CalendarGrid";
import Greeting from "@/components/planner/Greeting";
import ShoppingList from "@/components/planner/ShoppingListSidebar";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

interface User {
  name: string;
}

const MealPlanner: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { t } = useTranslation("common");

  useEffect(() => {
    const userToken = localStorage.getItem("loggedInUser");
    if (userToken) {
      try {
        const user = JSON.parse(userToken);
        if (user.token) {
          setUser({ name: user.username });
        }
      } catch (e) {
        console.error("Failed to parse LoggedInUser:", e);
      }
    }
  }, []);

  return (
    <>
      {/* Main Content */}
      <main className="flex h-screen overflow-hidden">
        <section className="flex-1 overflow-auto">
          <section className="p-6">
            <Greeting user={null} />
            <h1 className="text-2xl font-bold mb-3">{t("mealPlanner")}</h1>
            <CalendarGrid />
          </section>
        </section>

        {/* Shopping List Sidebar */}
        <section className="w-80 flex-shrink-0">
          <ShoppingList />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const localeString = locale || "en"; // Provide a default value for locale
  return {
    props: {
      ...(await serverSideTranslations(localeString, ["common"])),
    },
  };
};

export default MealPlanner;
