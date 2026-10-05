import { useState } from "react";
import styles from "./RegisterForm.module.css";

function RegisterForm({ compact = false, onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!form.nombre || !form.email || !form.password || !form.confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");
    console.log("Datos de registro:", form);
    if (onSuccess) onSuccess();
  };

  return (
    <div className={compact ? styles.compactPage : styles.page}>
      <form onSubmit={handleSubmit} className={compact ? styles.compactForm : styles.form}>
        <h2 className={styles.title}>Registro</h2>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className={styles.input}
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;