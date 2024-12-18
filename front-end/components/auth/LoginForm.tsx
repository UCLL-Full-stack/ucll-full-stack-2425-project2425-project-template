import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import authService from "@/services/authService";
import { LoginData } from "@/types/auth";
import { AlertCircle } from "lucide-react";

type Props = {
  onSuccess: () => void;
};

const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const router = useRouter();

  const validateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (!value) {
      setUsernameError("Username is required.");
    } else {
      setUsernameError("");
    }
  };

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username) setUsernameError("Username is required");
    if (!password) setPasswordError("Password is required");

    if (!usernameError && !passwordError) {
      try {
        const loginData: LoginData = { username, password };
        const user = await authService.login(loginData);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        onSuccess();
        router.push("/planner"); // Redirect to planner page on success
      } catch (error) {
        setFormError("Invalid username or password. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={username}
          onChange={validateUsername}
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
        <Label htmlFor="password">Password</Label>
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
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
