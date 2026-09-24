import "./App.css";
import ContactoCard from "./components/ContactoCard";

function App() {
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
    </div>
  );
}

export default App;