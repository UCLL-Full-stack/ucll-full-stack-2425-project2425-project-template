/*
 * A greeting message for the user based on the current time of day :)
 * Still to fully implement as it will take the @username
 * It shows "Good morning" with a coffee icon, "Good afternoon" with a sun icon,
 * and "Good evening" with a moon icon
 */

import { Coffee, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");
  const [greetingIcon, setGreetingIcon] = useState(<Sun />);

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting(`Good morning`);
      setGreetingIcon(<Coffee className="h-6 w-6" />);
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
      setGreetingIcon(<Sun className="h-6 w-6" />);
    } else {
      setGreeting("Good evening");
      setGreetingIcon(<Moon className="h-6 w-6" />);
    }
  }, []);

  return (
    <article className="flex items-center py-2 px-0 w-full">
      <div className="flex items-center text-gray-600">
        {greetingIcon}
        {/*@username as placeholder temporarily*/}
        <p className="ml-2 text-lg font-semibold m-0">{greeting}, @username!</p>
      </div>
    </article>
  );
};

export default Greeting;
