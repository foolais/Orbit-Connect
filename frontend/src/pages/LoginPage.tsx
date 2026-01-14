import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const { login } = useAuthStore();
  return (
    <div>
      <button className="btn btn-primary" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
