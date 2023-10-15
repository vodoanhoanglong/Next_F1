import { LoginForm } from "../../../components";
import { AuthContextProvider } from "../../../contexts";

export default async function AdminLoginPage() {
  return (
    <AuthContextProvider>
      <section className="login">
        <div className="login__background">
          <div className="login__background-shape"></div>
          <div className="login__background-shape"></div>
        </div>
        <LoginForm />
      </section>
    </AuthContextProvider>
  );
}
