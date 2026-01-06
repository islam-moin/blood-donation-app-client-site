import { Routes, Route } from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}
function Login() {
  return <h1>Login</h1>;
}
function Register() {
  return <h1>Register</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
