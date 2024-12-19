import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RegisterData } from "@/types/auth";
import authService from "@/services/authService";
import { useTranslation } from 'next-i18next';

interface SignupFormProps {
  onSuccess: () => void;
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const { t } = useTranslation('common');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const router = useRouter();

  const validateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    if (!value) {
      setFirstNameError(t("firstNameRequired"));
    } else {
      setFirstNameError("");
    }
  };

  const validateLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    if (!value) {
      setLastNameError(t("lastNameRequired"));
    } else {
      setLastNameError("");
    }
  };

  const validateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (!value) {
      setUsernameError(t("usernameRequired"));
    } else {
      setUsernameError("");
    }
  };

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
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!regex.test(value)) {
      setPasswordError(t("passwordRequirements"));
    } else {
      setPasswordError("");
    }
  };

  const validateRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepeatPassword(value);
    if (value !== password) {
      setRepeatPasswordError(t("passwordsDoNotMatch"));
    } else {
      setRepeatPasswordError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName) setFirstNameError(t("firstNameRequired"));
    if (!lastName) setLastNameError(t("lastNameRequired"));
    if (!username) setUsernameError(t("usernameRequired"));
    if (!email) setEmailError(t("emailRequired"));
    if (!password) setPasswordError(t("passwordRequired"));
    if (password !== repeatPassword)
      setRepeatPasswordError(t("passwordsDoNotMatch"));

    if (
      !firstNameError &&
      !lastNameError &&
      !usernameError &&
      !emailError &&
      !passwordError &&
      !repeatPasswordError
    ) {
      try {
        const registerData: RegisterData = {
          firstName,
          lastName,
          username,
          email,
          password,
        };
        await authService.register(registerData);
        onSuccess();
        router.push("/"); // Redirect to home on success
      } catch (error) {
        setFormError(t("registrationFailed"));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("firstName")}</Label>
          <Input
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={validateFirstName}
            required
          />
          {firstNameError && (
            <Alert variant="destructive">
              <AlertDescription>{firstNameError}</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("lastName")}</Label>
          <Input
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={validateLastName}
            required
          />
          {lastNameError && (
            <Alert variant="destructive">
              <AlertDescription>{lastNameError}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">{t("username")}</Label>
        <Input
          id="username"
          name="username"
          value={username}
          onChange={validateUsername}
          required
        />
        {usernameError && (
          <Alert variant="destructive">
            <AlertDescription>{usernameError}</AlertDescription>
          </Alert>
        )}
      </div>
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
            <AlertDescription>{passwordError}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="repeatPassword">{t("repeatPassword")}</Label>
        <Input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          value={repeatPassword}
          onChange={validateRepeatPassword}
          required
        />
        {repeatPasswordError && (
          <Alert variant="destructive">
            <AlertDescription>{repeatPasswordError}</AlertDescription>
          </Alert>
        )}
      </div>
      {formError && (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full">
        {t("signUp")}
      </Button>
    </form>
  );
}

export default SignupForm;