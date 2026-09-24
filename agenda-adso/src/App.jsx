import { useState } from "react";
import "./App.css";
import ContactoCard from "./components/ContactoCard";

function App() {
  // --- 1. Estado para el Saludo Formulario ---
  const [nombreInput, setNombreInput] = useState("");
  const [saludo, setSaludo] = useState("");

  const handleSaludoSubmit = (e) => {
    e.preventDefault();
    if (nombreInput.trim() !== "") {
      setSaludo(nombreInput);
    }
  };

  // --- 2. Estado para la lista de Contactos ---
  const [contactos] = useState([
    {
      id: 1,
      nombre: "Gustavo Bolaños",
      telefono: "300 123 4567",
      correo: "gustavo@sena.edu.co",
      etiqueta: "Instructor"
    },
    {
      id: 2,
      nombre: "Cristian Acevedo",
      telefono: "300 765 4321",
      correo: "cristian@sena.edu.co",
      etiqueta: "Instructor"
    },
    {
      id: 3,
      nombre: "Carlos Pérez",
      telefono: "310 456 7890",
      correo: "carlos@gmail.com",
      etiqueta: "Familiar"
    },
    {
      id: 4,
      nombre: "María Gómez",
      telefono: "320 987 6543",
      correo: "maria@hotmail.com",
      etiqueta: "Amigo"
    }
  ]);

  // --- 3. Estado para la Búsqueda en vivo (Reto B) ---
  const [busqueda, setBusqueda] = useState("");

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* SECCIÓN DE SALUDO */}
      <section className="saludo-section">
        <h2>Formulario de Saludo</h2>
        <form onSubmit={handleSaludoSubmit} className="saludo-form">
          <input
            type="text"
            placeholder="Ingresa tu nombre..."
            value={nombreInput}
            onChange={(e) => setNombreInput(e.target.value)}
          />
          <button type="submit">Saludar</button>
        </form>

        {saludo && (
          <div className="saludo-mensaje">
            <h3>¡Hola, {saludo}! 👋</h3>
            <p>Bienvenido a la Agenda ADSO v2.</p>
          </div>
        )}
      </section>

      <hr className="divider" />

      {/* SECCIÓN DE LA AGENDA Y BÚSQUEDA */}
      <section className="agenda-section">
        <h1 className="app-title">Agenda ADSO v2</h1>
        <p className="app-subtitle">Gestión interactiva de contactos</p>

        {/* Input de Búsqueda */}
        <div className="busqueda-container">
          <input
            type="text"
            placeholder="🔍 Buscar contacto por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="busqueda-input"
          />
        </div>

        {/* Lista de Tarjetas */}
        <div className="contactos-grid">
          {contactosFiltrados.length > 0 ? (
            contactosFiltrados.map((c) => (
              <ContactoCard
                key={c.id}
                nombre={c.nombre}
                telefono={c.telefono}
                correo={c.correo}
                etiqueta={c.etiqueta}
              />
            ))
          ) : (
            <p className="sin-resultados">No se encontraron contactos</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;