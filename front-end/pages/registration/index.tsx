import Link from 'next/link';
import Header from '@/components/header';

export default function Register() {
    return (
        <>
        <Header />
        <div className="container mt-5">
            <h2>Register</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First name:</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Enter your first name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last name:</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Enter your last name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <p className="mt-3">
                    Already have an account? <Link href="/login">Login here</Link>.
                </p>
            </form>
        </div>
        </>
    );
}
