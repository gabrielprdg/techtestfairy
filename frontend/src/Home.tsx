import styles from './home.module.scss'

export default function Home() {
  return (
    <div className={styles.authContainer}>

      <div className={styles.title}>
        <span>Use</span>
        <span>FashionStore</span>
      </div>
      <form action="" className={styles.form}>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          autoComplete="email"
          required className={styles.inputEmail}
        />
        <label htmlFor="name">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="password"
          required className={styles.inputPass}
        />
      </form>
      <div className={styles.signUp}>Nao possui uma conta? <span>Cadastre-se</span></div>
    </div>
  )
}
