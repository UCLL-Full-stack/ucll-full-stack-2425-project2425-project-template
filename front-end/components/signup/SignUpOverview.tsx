import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { StatusMessage } from "types"
import { useTranslation } from "react-i18next";
import UserService from "@services/UserService";
import classNames from "classnames";

const SignUpOverview: React.FC = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [firstNameError, setFirstNameError] = useState<string | null>(null)
    const [lastNameError, setLastNameError] = useState<string | null>(null)
    const [usernameError, setUsernameError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const [hydrated, setHydrated] = useState(false);

    const router = useRouter();

    const { t } = useTranslation();

    const clearErrors = () => {
        setFirstNameError(null);
        setLastNameError(null);
        setUsernameError(null);
        setEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
    }

    const validate = (): boolean => {
        let result = true;

        if (!firstName && firstName.trim() == "") {
            setFirstNameError(t("signup.validate.firstName"))
            result = false
        }

        if (!lastName && lastName.trim() == "") {
            setLastNameError(t("signup.validate.lastName"))
            result = false
        }
        if (!username && username.trim() == "") {
            setUsernameError(t("signup.validate.username"))
            result = false
        }
        if (!email && email.trim() == "") {
            setEmailError(t("signup.validate.email"))
            result = false
        }
        if (!password && password.trim() == "") {
            setPasswordError(t("signup.validate.password"))
            result = false
        }

        return result;
    }

    const handleSubmit = async (event: {preventDefault: () => void; }) => {
        event.preventDefault()

        clearErrors();

        if (!validate()) {
            return;
        }

        const signUpUser = {firstName, lastName, username, email, password, role: "user"}
        const response = await UserService.signupUser(signUpUser)

        if (response.status == 200) {
            setStatusMessages([
                {
                    message: t("signup.success"),
                    type: "success",
                }
            ])

            // const user = await response.json()
            // localStorage.setItem("loggedinUser",
            //     JSON.stringify({
            //         token: user.token,
            //         fullname: user.fullname,
            //         username: user.username,
            //         role: user.role,
            //         id: user.id
            //     })
            // )

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } else if (response.status === 401) {
            const { errorMessage } = await response.json();
            setStatusMessages([{message: errorMessage, type: "error"}]);
        } else {
            setStatusMessages([
                {
                    message: t("general.error"),
                    type: "error",
                }
            ]);
        };
    };

    useEffect(() => {
      setHydrated(true);
    }, [])

      if (!hydrated) {
        return null;
    }

    return (
        <>
          <h3 className="px-0">{t("signup.title")}</h3>
          {statusMessages && (
            <div className="row">
              <ul className="list-none mb-3 mx-auto ">
                {statusMessages.map(({ message, type }, index) => (
                  <li
                    key={index}
                    className={classNames({
                      "text-red-800": type === "error",
                      "text-green-800": type === "success",
                    })}
                  >
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstNameInput" className="block mb-2 text-sm font-medium">
              {t("signup.label.firstname")}:
            </label>


            <div className="block mb-2 text-sm font-medium">
              <input
                id="firstNameInput"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
              />
              {firstNameError && <div className="text-red-800 ">{firstNameError}</div>}
            </div>


            <div className="mt-2">
              <div>
                <label
                  htmlFor="lastNameInput"
                  className="block mb-2 text-sm font-medium"
                >
                  {t("signup.label.lastName")}:
                </label>
              </div>
              <div className="block mb-2 text-sm font-medium">
                <input
                  id="lastNameInput"
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                />
                {lastNameError && (
                  <div className=" text-red-800">{lastNameError}</div>
                )}
              </div>
            </div>
            

            <div className="mt-2">
              <div>
                <label
                  htmlFor="usernameInput"
                  className="block mb-2 text-sm font-medium"
                >
                  {t("signup.label.username")}:
                </label>
              </div>
              <div className="block mb-2 text-sm font-medium">
                <input
                  id="usernameInput"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                />
                {usernameError && (
                  <div className=" text-red-800">{usernameError}</div>
                )}
              </div>
            </div>


            <div className="mt-2">
              <div>
                <label
                  htmlFor="emailInput"
                  className="block mb-2 text-sm font-medium"
                >
                  {t("signup.label.email")}:
                </label>
              </div>
              <div className="block mb-2 text-sm font-medium">
                <input
                  id="emailInput"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                />
                {emailError && (
                  <div className=" text-red-800">{emailError}</div>
                )}
              </div>
            </div>


            <div className="mt-2">
              <div>
                <label
                  htmlFor="passwordInput"
                  className="block mb-2 text-sm font-medium"
                >
                  {t("signup.label.password")}:
                </label>
              </div>
              <div className="block mb-2 text-sm font-medium">
                <input
                  id="passwordInput"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                />
                {passwordError && (
                  <div className=" text-red-800">{passwordError}</div>
                )}
              </div>
            </div>

            <button
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              {t("signup.button")}
            </button>

          </form>
        </>
    );
};

export default SignUpOverview