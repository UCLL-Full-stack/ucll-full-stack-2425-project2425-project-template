import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginData, StatusMessage } from "@/types/auth";
import { AlertCircle } from "lucide-react";
import AuthService from "../../services/authService";
import { useTranslation } from "next-i18next";

type Props = {
  onSuccess: () => void;
};

const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const router = useRouter();
  const { t } = useTranslation("common");

  useEffect(() => {
    const role = localStorage.getItem("role");
  }, []);

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setFormError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!username || username.trim() === "") {
      setUsernameError(t("usernameRequired"));
      result = false;
    } else {
      setUsernameError("");
    }

    if (!password || password.trim() === "") {
      setPasswordError(t("passwordRequired"));
      result = false;
    } else if (password.length < 6) {
      setPasswordError(t("passwordTooShort"));
      result = false;
    } else {
      setPasswordError("");
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const loginData: LoginData = { username, password };

    try {
      const response = await AuthService.login(loginData);

      if (response.ok) {
        const userData = await response.json();

        setStatusMessages([
          {
            message: t("loginSuccessful"),
            type: "success",
          },
        ]);

        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            token: userData.token,
            fullname: userData.fullname,
            username: userData.username,
            role: userData.role,
          })
        );

        setTimeout(() => {
          router.push("/planner");
        }, 2000);
      } else {
        setFormError(t("invalidCredentials"));
      }
    } catch (error) {
      setFormError(t("invalidCredentials"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">{t("username")}</Label>
        <Input
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        {usernameError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{usernameError}</AlertDescription>
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
          onChange={(event) => setPassword(event.target.value)}
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
      <Button type="submit">{t("login")}</Button>
    </form>
  );
};

export default LoginForm;
