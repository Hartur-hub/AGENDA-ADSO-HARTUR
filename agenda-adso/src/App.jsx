import { useState } from "react";
import "./App.css";
import ContactoCard from "./components/ContactoCard";

function App() {

  const [nombreInput, setNombreInput] = useState("");
  const [saludo, setSaludo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombreInput.trim() !== "") {
      setSaludo(nombreInput);
    }
  };


  const contactos = [
    {
      nombre: "Gustavo Bolaños",
      telefono: "300 123 4567",
      correo: "gustavo@sena.edu.co",
      etiqueta: "Instructor"
    },
    {
      nombre: "Cristian Acevedo",
      telefono: "300 765 4321",
      correo: "cristian@sena.edu.co",
      etiqueta: "Instructor"
    },
    {
      nombre: "Carlos Pérez",
      telefono: "310 456 7890",
      correo: "carlos@gmail.com",
      etiqueta: "Familiar"
    },
    {
      nombre: "María Gómez",
      telefono: "320 987 6543",
      correo: "maria@hotmail.com",
      etiqueta: "Amigo"
    }
  ];

  return (
    <div className="app-container">
      {/* SECCIÓN 1: Formulario de Saludo */}
      <section className="saludo-section">
        <h2>Formulario de Saludo</h2>
        <form onSubmit={handleSubmit} className="saludo-form">
          <input
            type="text"
            placeholder="Ingresa tu nombre..."
            value={nombreInput}
            onChange={(e) => setNombreInput(e.target.value)}
          />
          <button type="submit">Saludar</button>
        </form>

        {/* Mensaje de saludo dinámico */}
        {saludo && (
          <div className="saludo-mensaje">
            <h3>¡Hola, {saludo}! 👋</h3>
            <p>Bienvenido a la Agenda ADSO.</p>
          </div>
        )}
      </section>

      <hr className="divider" />

      {/* SECCIÓN 2: Lista de Contactos */}
      <section className="agenda-section">
        <h1 className="app-title">Agenda ADSO</h1>
        <p className="app-subtitle">Contactos guardados</p>

        <div className="contactos-grid">
          {contactos.map((c, i) => (
            <ContactoCard
              key={i}
              nombre={c.nombre}
              telefono={c.telefono}
              correo={c.correo}
              etiqueta={c.etiqueta}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;