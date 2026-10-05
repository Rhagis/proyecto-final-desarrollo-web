import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import MenuGeneral from "./components/layout/MenuGeneral";
import Modal from "./components/layout/Modal";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Register";

function App() {
  const [modalType, setModalType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("animangaLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("animangaLoggedIn", String(isLoggedIn));
  }, [isLoggedIn]);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    closeModal();
  };

  return (
    <div className="pageShell">
      <Navbar
        user={isLoggedIn ? { name: "Usuario" } : null}
        onOpenLogin={() => openModal("login")}
        onOpenRegister={() => openModal("register")}
      />

      <div className="app">
        <MenuGeneral isLoggedIn={isLoggedIn} />

        <div className="mainContent">
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/busqueda" element={<div className="section"><h1>Busqueda</h1><p>Página de búsqueda.</p></div>} />
              <Route path="/anime" element={<div className="section"><h1>Anime</h1><p>Listado de anime.</p></div>} />
              <Route path="/manga" element={<div className="section"><h1>Manga</h1><p>Listado de manga.</p></div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
            </Routes>
          </main>
        </div>
      </div>

      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === "login" ? <LoginForm compact onSuccess={handleAuthSuccess} /> : null}
        {modalType === "register" ? <RegisterForm compact onSuccess={handleAuthSuccess} /> : null}
      </Modal>
    </div>
  );
}

export default App;
