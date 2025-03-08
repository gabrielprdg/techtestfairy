import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "./contexts/authContext";
import styles from "./home.module.scss";

type SignInData = {
  email: string;
  password: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<SignInData>();
  const { signIn } = useAuth();

  async function handleSignIn(data: SignInData) {
    try {
      await signIn(data);
    } catch (err) {
      toast.error("Email ou senha incorretos!");
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.title}>
        <h1>TechTest</h1>
        <h1 className={styles.fairy}>Fairy</h1>
      </div>
      <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          autoComplete="email"
          required
          className={styles.inputEmail}
          {...register("email", { required: true })}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="password"
          required
          className={styles.inputPass}
          {...register("password", { required: true })}
        />

        <button type="submit">Login</button>
      </form>
      <div className={styles.loginFooter}>
        Não possui uma conta? <span><Link to="/signup">Cadastre-se</Link></span>
      </div>
    </div>
  );
}
