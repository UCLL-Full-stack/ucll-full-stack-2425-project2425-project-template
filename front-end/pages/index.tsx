import Header from "@/components/header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight } from "react-feather";

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
  return (
    <>
      <Header />
      <main className="py-4 bg-gray-50 min-h-screen">
        <MaxWidthWrapper className="mb-8 mt-20 sm:mt-24 flex flex-col items-center justify-center text-center">
          <div className="mx-auto mb-2 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
            <p className="text-sm font-semibold text-gray-700">
              The Workout Planner is now live!
            </p>
          </div>
          <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl text-black">
            Plan your <span className="text-gray-600">workouts</span>{" "}
            effortlessly.
          </h1>
          <p className="mt-3 max-w-prose text-zinc-700 sm:text-lg">
            Our Workout Planner helps you create and manage your workouts with
            ease and efficiency!
          </p>
          <Link
            className={buttonVariants({
              size: "lg",
              className: "mt-4",
            })}
            href="/workouts"
          >
            Get started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </MaxWidthWrapper>
      </main>
    </>
  );
};

export default Home;
