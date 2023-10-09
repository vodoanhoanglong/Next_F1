import { LoginForm } from "../../../components";

export default async function AdminLoginPage() {
  return (
    <section className="login">
      <div className="login__background">
        <div className="login__background-shape"></div>
        <div className="login__background-shape"></div>
      </div>
      <LoginForm />
    </section>
  );
}
