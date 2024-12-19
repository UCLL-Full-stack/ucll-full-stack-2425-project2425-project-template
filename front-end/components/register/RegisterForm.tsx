import RegisterLoginService from "@/services/RegisterLoginService";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [nameError, setNameError] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>("");
  const [passwordError, setPasswordError] = useState<null | string>("");
  const [birthDateError, setBirthDateError] = useState<null | string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<null | string>("");
  

  const [statusMessages,setStatusMessages] = useState<string | null>();

  const clearErrors = () => {
    //reset errors and status messages
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setBirthDateError(null);
    setPhoneNumberError(null);
    setStatusMessages(null);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name && name.trim() === "") {
      // set error here
      setNameError("Name is required")
      result = false;
    }
    if (!email && email.trim() === "") {
        // set error here
        setEmailError("Email is required")
        result = false;
    }
    if (!password && password.trim() === "") {
        // set error here
        setPasswordError("Password is required")
        result = false;
    }
    if (!birthDate && birthDate.trim() === "") {
        // set error here
        setBirthDateError("BirthDate is required")
        result = false;
    }
    if (!phoneNumber && phoneNumber.trim() === "") {
        // set error here
        setPhoneNumberError("Phone Number is required")
        result = false;
    }
    return result;
  };

  const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
  
    const isValid = validate();
    if (!isValid) {
      return;
    }
  
    try {
    const birthDateAsDate = new Date(birthDate);
    if (isNaN(birthDateAsDate.getTime())) {
      setBirthDateError("Invalid birth date format");
      return;
    }
  
      const register = await RegisterLoginService.registerUser({
        name,
        email,
        password,
        role: "user",
        birthDate: birthDateAsDate, // Use the formatted date
        phoneNumber: phoneNumber,
      });
  
      if (register.token) {
        setStatusMessages("Registration successful. Redirecting...");
        console.log(register);
    
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setStatusMessages("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setStatusMessages("Registration failed.");
    }
  }

  return (
    <>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages}
          </ul>
        </div>
      )}
      {/* name,email,password,role,birth_date,phone_number */}
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          name:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
          <p className="text-red-800">{nameError ? nameError : null}</p>
        </div>
        <label htmlFor="emailInput" className="block mb-2 text-sm font-medium">
          email:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="emailInput"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
          <p className="text-red-800">{emailError ? emailError : null}</p>
        </div>
        <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
          password:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
          <p className="text-red-800">{passwordError ? passwordError : null}</p>
        </div>
        <label htmlFor="birthDateInput" className="block mb-2 text-sm font-medium">
          birth date:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="birthDateInput"
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
          <p className="text-red-800">{birthDateError ? birthDateError : null}</p>
        </div>
        <label htmlFor="phoneNumberInput" className="block mb-2 text-sm font-medium">
          phone number:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
          <p className="text-red-800">{phoneNumberError ? phoneNumberError : null}</p>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
