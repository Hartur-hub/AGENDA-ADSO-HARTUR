import { useState, useEffect } from "react";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

function App() {
  // Cargar contactos iniciales desde localStorage o lista por defecto
  const [contactos, setContactos] = useState(() => {
    const guardados = localStorage.getItem("contactos_adso");
    return guardados
      ? JSON.parse(guardados)
      : [
          { nombre: "Gustavo Bolaños", telefono: "300 123 4567", correo: "gustavo@sena.edu.co", etiqueta: "Instructor" },
          { nombre: "Cristian Acevedo", telefono: "300 765 4321", correo: "cristian@sena.edu.co", etiqueta: "Instructor" },
        ];
  });

  const [busqueda, setBusqueda] = useState("");

  // Persistencia con useEffect (se ejecuta al modificar 'contactos')
  useEffect(() => {
    localStorage.setItem("contactos_adso", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo) => {
    setContactos([...contactos, nuevo]);
  };

  const eliminarContacto = (correo) => {
    setContactos(contactos.filter((c) => c.correo !== correo));
  };

  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Agenda ADSO v4</h1>
        <p className="text-gray-600 text-sm mt-1">Diseño moderno con TailwindCSS</p>
      </header>

      {/* Formulario para agregar */}
      <FormularioContacto onAgregarContacto={agregarContacto} />

      {/* Buscador */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar contacto por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Galería de Contactos */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {contactosFiltrados.length > 0 ? (
          contactosFiltrados.map((c) => (
            <ContactoCard
              key={c.correo}
              nombre={c.nombre}
              telefono={c.telefono}
              correo={c.correo}
              etiqueta={c.etiqueta}
              onEliminar={eliminarContacto}
            />
          ))
        ) : (
          <p className="text-gray-500 italic mt-4">No se encontraron contactos</p>
        )}
      </div>
    </div>
  );
}

export default App;