import { Link, useNavigate } from "react-router-dom";

function ProtectedPage() {
    const navigate = useNavigate();
  
    return (
      <div>
        <h1>Protected Page</h1>
        <Link to="/login" state={{ from: '/protected' }}>Go to Login</Link>
      </div>
    );
  }

  export default ProtectedPage;