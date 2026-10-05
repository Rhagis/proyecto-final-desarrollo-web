import { useEffect } from "react";
import styles from "./Modal.module.css";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
