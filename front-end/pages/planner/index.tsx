import CalendarGrid from "@/components/planner/calendar/CalendarGrid";
import Greeting from "@/components/planner/Greeting";
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
      <div className="px-3">
        <Greeting user={user} />
        <h1 className="page-title mt-2 px-1">{t("mealPlanner")}</h1>
        <CalendarGrid />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const localeString = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(localeString, ["common"])),
    },
  };
};

export default MealPlanner;
