import { useState, useTransition } from "react";
import { useRouter } from "next/router";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { useTranslation } from "next-i18next";
import { Globe } from "lucide-react";

const AuthToggle = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale, pathname, asPath, query } = router;

  const handleSuccess = () => {
    router.push("/planner"); // redirects to planner page after successful login/signup
  };

  const handleTabChange = (value: string) => {
    startTransition(() => {
      setIsLogin(value === "login");
    });
  };
  const handleLanguageChange = () => {
    const newLocale = locale === "en" ? "zh" : "en";
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Card className="relative w-[350px]">
      <button
        onClick={handleLanguageChange}
        className="absolute top-4 right-4 flex justify-center items-center w-8 h-8 rounded-full text-primary hover:bg-avatar-hover-bg"
        aria-label="Change Language"
      >
        <Globe size={24} />
      </button>
      <CardHeader>
        <CardTitle>Plateful</CardTitle>
        <CardDescription>
          {isLogin ? t("welcomeBack") : t("createNewAccount")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="login"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t("login")}</TabsTrigger>
            <TabsTrigger value="register">{t("register")}</TabsTrigger>
          </TabsList>
          <div
            className={`mt-4 transition-opacity duration-300 ${
              isPending ? "opacity-50" : "opacity-100"
            }`}
          >
            <TabsContent value="login">
              <LoginForm onSuccess={handleSuccess} />
            </TabsContent>
            <TabsContent value="register">
              <SignupForm onSuccess={handleSuccess} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        {isLogin && (
          <Button variant="link" className="p-0">
            {t("forgotPassword")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};


export default AuthToggle;