import { Navigate, useLocation } from 'react-router-dom'

const AuthCheck = ({isAuthenticated , user , children}) => {
    const location = useLocation();
    
    if (location.pathname === "/") {
        if (!isAuthenticated) {
          return <Navigate to="/login" />;
        } else {
          if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
          } else {
            return <Navigate to="/home" />;
          }
        }
      }    
    
  return (
    <div>
      {children}
    </div>
  )
} 

export default AuthCheck
