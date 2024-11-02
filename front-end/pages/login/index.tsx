import Header from "@/components/header";
import Link from 'next/link';

export default function Login() {
    return (
        <>
        <Header />
        <div className="container mt-5">
            <h2>Login</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <p className="mt-3">
                    Don’t have an account? <Link href="/registration">Register here</Link>.
                </p>
            </form>
        </div>
        </>
    );
}
