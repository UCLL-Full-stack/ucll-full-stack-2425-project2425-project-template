import { useState, useTransition } from "react";
import { useRouter } from "next/router";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useTranslation } from "next-i18next";
import { Globe } from "lucide-react";

const AuthToggle = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale, pathname, asPath, query } = router;

  const handleSuccess = () => {
    router.push("/planner");
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
    <Card className="w-[350px]">
      <CardHeader className="relative">
        <CardTitle className="text-2xl">Plateful</CardTitle>
        <CardDescription>
          {isLogin ? t("welcomeBack") : t("createNewAccount")}
        </CardDescription>
        <button
          onClick={handleLanguageChange}
          className="absolute top-0 right-0 flex justify-center items-center w-8 h-8 rounded-full text-primary hover:bg-avatar-hover-bg"
          aria-label="Change Language"
        >
          <Globe size={24} />
        </button>
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
    </Card>
  );
};

export default AuthToggle;
