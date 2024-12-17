/* This is currently the homepage of the app, hence why the <Head /> and meta information */

import CalendarGrid from "@/components/planner/calendar/CalendarGrid";
import Greeting from "@/components/planner/Greeting";
import ShoppingList from "@/components/planner/ShoppingListSidebar";
import Head from "next/head";
import { useEffect, useState } from "react";

const MealPlanner: React.FC = () => {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const userToken = sessionStorage.getItem("loggedInUser");
  //   if (userToken) {
  //     try {
  //       const user = JSON.parse(userToken);
  //       if (user.token) {
  //         setIsLoggedIn(true);
  //       }
  //     } catch (e) {
  //       console.error("Failed to parse LoggedInUser:", e);
  //       setIsLoggedIn(false);
  //     }
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>Plateful</title>
        <meta
          name="description"
          content="Plateful - Your personal meal planning and shopping list app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Content */}
      <main className="flex h-screen overflow-hidden">
        <section className="flex-1 overflow-auto">
          <section className="p-6">
            <Greeting />
            <h1 className="text-2xl font-bold mb-3">Meal Planner</h1>
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

export default MealPlanner;
