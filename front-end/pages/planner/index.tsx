import CalendarGrid from "@/components/planner/calendar/CalendarGrid";
import Greeting from "@/components/planner/Greeting";
import ShoppingList from "@/components/planner/ShoppingListSidebar";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

const MealPlanner: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Content */}
      <main className="flex h-screen overflow-hidden">
        <section className="flex-1 overflow-auto">
          <section className="p-6">
            <Greeting />
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