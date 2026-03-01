import { useState } from "react";
import Login from "./frontend/auth/Login";
import Register from "./frontend/auth/Register";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      {isLogin ? (
        <Login switchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;
