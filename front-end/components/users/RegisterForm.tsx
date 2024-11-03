import { User } from "@/types";

type Props = {
    user: User;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (field: keyof User, value: any) => void;
}



const RegisterForm: React.FC<Props> = ({ user, handleSubmit, handleInputChange }: Props) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nationalregisternumber"> Nation Register Number <sup>*</sup></label>
                <input 
                    type="text"
                    value={user.nationalRegisterNumber}
                    onChange={(e) => handleInputChange("nationalRegisterNumber", e.target.value)}
                    placeholder="National registration number"
                />

                <label htmlFor="name">Name <sup>*</sup></label>
                <input 
                    type="text" 
                    value={user.name} 
                    onChange={(e) => handleInputChange("name", e.target.value)} 
                    placeholder="Name"
                />

                <label htmlFor="email">Email<sup>*</sup></label>
                <input 
                    type="email" 
                    value={user.email} 
                    onChange={(e) => handleInputChange("email", e.target.value)} 
                    placeholder="Email"
                />

                <label htmlFor="password">Password<sup>*</sup></label>
                <input 
                    type="password" 
                    value={user.password} 
                    onChange={(e) => handleInputChange("password", e.target.value)} 
                    placeholder="Password"
                />


                <label htmlFor="birthdate"></label>
                <input 
                    type="date" 
                    value={user.birthDate ? user.birthDate.toISOString().split("T")[0] : ""} 
                    onChange={(e) => handleInputChange("birthDate", e.target.value ? new Date(e.target.value) : null)} 
                    placeholder="Birthdate"
                />

                <p>
                    Administrator?
                <label htmlFor="administrator">
                    <input 
                        type="radio"  
                        value="yes" 
                        checked={user.isAdministrator === true} 
                        onChange={() => handleInputChange("isAdministrator", true)}
                    />
                    Yes
                </label>

                <label htmlFor="administrator">
                    <input 
                        type="radio"  
                        value="No" 
                        checked={user.isAdministrator === false} 
                        onChange={() => handleInputChange("isAdministrator", false)}
                    />
                    No
                </label>
                </p>
                
                <label htmlFor="phonenumber">Phone number<sup>*</sup></label>
                <input 
                    type="text" 
                    value={user.phoneNumber} 
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)} 
                    placeholder="Phone number"
                />
                <button type="submit">Create account</button>
            </form>
        </>
    );
};

export default RegisterForm;