import { useNavigate } from 'react-router-dom';

import { api } from '../../../services/api';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/authContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    // Pegando os dados dos inputs
    const name = (event.target as any).name.value;
    const email = (event.target as any).email.value;
    const password = (event.target as any).pass.value;
    const confirmPassword = (event.target as any).cfpass.value;

    // Validação simples de senha
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
      });

      await signIn({ email, password });

      navigate('/Dashboard');
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.error("Este email já está cadastrado.");
      } else {
        toast.error("Erro ao cadastrar ou logar, tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.title}>
        <h1>TechTest</h1>
        <h1 className={styles.fairy}>Fairy</h1>
      </div>
      <form onSubmit={handleSignUp} className={styles.form}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          required
          className={styles.inputName}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          className={styles.inputEmail}
        />

        <label htmlFor="pass">Senha</label>
        <input
          id="pass"
          type="password"
          autoComplete="password"
          required
          className={styles.inputPass}
        />

        <label htmlFor="cfpass">Confirmar senha</label>
        <input
          id="cfpass"
          type="password"
          autoComplete="password"
          required
          className={styles.inputCfPass}
        />

        <button type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
