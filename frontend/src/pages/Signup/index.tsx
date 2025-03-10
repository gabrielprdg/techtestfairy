import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/authContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const name = (event.target as any).name.value;
    const email = (event.target as any).email.value;
    const password = (event.target as any).pass.value;
    const confirmPassword = (event.target as any).cfpass.value;

    if (password !== confirmPassword) {
      toast.error('As senhas não se coincidem');
      return;
    }

    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      if (res.status == 201) {
        toast.success("Cadastro realizado com sucesso")
      }

    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.error("Este email já está cadastrado.");
      } else {
        toast.error("Erro ao cadastrar ou logar, tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">TechTest</h1>
        <h1 className="text-4xl font-bold text-green-400">Fairy</h1>
      </div>
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="pass"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <input
            id="pass"
            type="password"
            autoComplete="password"
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="cfpass"
            className="block text-sm font-medium text-gray-700"
          >
            Confirmar senha
          </label>
          <input
            id="cfpass"
            type="password"
            autoComplete="password"
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-400 text-white p-2 rounded-md hover:bg-green-500 transition duration-200"
        >
          Cadastrar
        </button>
      </form>
      <div className="mt-4 text-center">
        Já possui uma conta?{" "}
        <span className="text-green-400">
          <Link to="/">Faça login</Link>
        </span>
      </div>
    </div>
  );
}
