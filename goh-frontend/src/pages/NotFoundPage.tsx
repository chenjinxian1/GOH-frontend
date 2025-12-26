import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
    return (
        <div className="notfound-page">
            <h1 className="notfound-title">404 – Page not found</h1>
            <p className="notfound-text">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link className="notfound-link" to="/">
                ← Back to Home
            </Link>
        </div>
    );
}
