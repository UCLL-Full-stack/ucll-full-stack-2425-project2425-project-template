import {UserLogIn} from "@/types"
import { useState } from "react";


type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onLogIn: (user: UserLogIn) => Promise<void>;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const handleSubmit = (e: React.FormEvent) => {
    return console.log("Submitted")
}

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Log In</h2>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Log In
                    </button>
                </div>
            
            </form>
        </div>
    );
};

export default LoginModal;