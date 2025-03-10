import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "./contexts/authContext";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">TechTest</h1>
        <h1 className="text-4xl font-bold text-green-400">Fairy</h1>
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            autoComplete="email"
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            {...register("email", { required: true })}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="password"
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            {...register("password", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-400 text-white p-2 rounded-md hover:bg-green-500 transition duration-200"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        Não possui uma conta?{" "}
        <span className="text-green-400">
          <Link to="/signup">Cadastre-se</Link>
        </span>
      </div>
    </div>
  );
}
