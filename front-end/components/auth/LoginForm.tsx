import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import authService from "@/services/authService";
import { LoginData } from "@/types/auth";
import { AlertCircle } from "lucide-react";
import { useTranslation } from 'next-i18next';

type Props = {
  onSuccess: () => void;
};

const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const router = useRouter();

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!value.includes("@")) {
      setEmailError(t("invalidEmail"));
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError(t("passwordTooShort"));
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) setEmailError(t("emailRequired"));
    if (!password) setPasswordError(t("passwordRequired"));

    if (!emailError && !passwordError) {
      try {
        const loginData: LoginData = { email, password };
        await authService.login(loginData);
        onSuccess();
        router.push("/"); // Redirect to home on success
      } catch (error) {
        setFormError(t("invalidCredentials"));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={validateEmail}
          required
        />
        {emailError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{emailError}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={validatePassword}
          required
        />
        {passwordError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{passwordError}</AlertDescription>
          </Alert>
        )}
      </div>
      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full">
        {t("login")}
      </Button>
    </form>
  );
};

export default LoginForm;