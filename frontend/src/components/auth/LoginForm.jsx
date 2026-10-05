import { useState } from "react";
import styles from "./LoginForm.module.css";

function LoginForm({ compact = false, onSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
    console.log("Datos de login:", form);
    if (onSuccess) onSuccess();
  };

  return (
    <div className={compact ? styles.compactPage : styles.page}>
      <form onSubmit={handleSubmit} className={compact ? styles.compactForm : styles.form}>
        <h2 className={styles.title}>Iniciar sesión</h2>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;