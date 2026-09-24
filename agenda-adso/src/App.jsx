import { useState, useEffect } from "react";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // Cargar contactos (simulación o petición a API)
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");
        
        // Carga inicial o llamada a API
        const guardados = localStorage.getItem("contactos_adso");
        const data = guardados
          ? JSON.parse(guardados)
          : [
              { nombre: "Gustavo Bolaños", telefono: "300 123 4567", correo: "gustavo@sena.edu.co", etiqueta: "Instructor" },
              { nombre: "Cristian Acevedo", telefono: "300 765 4321", correo: "cristian@sena.edu.co", etiqueta: "Instructor" },
            ];
        
        setContactos(data);
      } catch (err) {
        console.error("Error al cargar contactos:", err);
        setError("No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo.");
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  // Actualizar localStorage cada vez que cambia la lista
  useEffect(() => {
    if (!cargando) {
      localStorage.setItem("contactos_adso", JSON.stringify(contactos));
    }
  }, [contactos, cargando]);

  const agregarContacto = async (nuevo) => {
    // Simula una pequeña demora asíncrona para observar el estado "Guardando..."
    await new Promise((resolve) => setTimeout(resolve, 600));
    setContactos((prev) => [...prev, nuevo]);
  };

  const eliminarContacto = (correo) => {
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
  };

  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Agenda ADSO v6</h1>
        <p className="text-gray-600 text-sm mt-1">Validaciones, UX y errores controlados</p>
      </header>

      {/* Banner de Error Global de API/Servidor */}
      {error && (
        <div className="max-w-lg mx-auto mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-left">
          <p className="text-sm font-medium text-red-700">⚠️ {error}</p>
        </div>
      )}

      {/* Formulario */}
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

      {/* Lista de contactos */}
      {cargando ? (
        <p className="text-gray-500">Cargando contactos...</p>
      ) : (
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
      )}
    </div>
  );
}

export default App;