import { useState, useEffect } from "react";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";
import "./App.css";

function App() {
  // Lista de contactos base
  const [contactos, setContactos] = useState([
    { id: 1, nombre: "Gustavo Bolaños", telefono: "300 123 4567", correo: "gustavo@sena.edu.co", etiqueta: "Instructor" },
    { id: 2, nombre: "Cristian Acevedo", telefono: "300 765 4321", correo: "cristian@sena.edu.co", etiqueta: "Instructor" },
    { id: 3, nombre: "Carlos Pérez", telefono: "310 456 7890", correo: "carlos@gmail.com", etiqueta: "Familiar" },
    { id: 4, nombre: "María Gómez", telefono: "320 987 6543", correo: "maria@hotmail.com", etiqueta: "Amigo" },
    { id: 5, nombre: "Ana Martínez", telefono: "315 111 2233", correo: "ana@gmail.com", etiqueta: "Trabajo" },
    { id: 6, nombre: "David López", telefono: "300 444 5566", correo: "david@sena.edu.co", etiqueta: "Compañero" },
    { id: 7, nombre: "Laura Rodríguez", telefono: "312 999 8877", correo: "laura@hotmail.com", etiqueta: "Amigo" },
  ]);

  // Estados de Búsqueda y Ordenamiento
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);

  // --- ESTADOS DE PAGINACIÓN ---
  const [paginaActual, setPaginaActual] = useState(1); // Página inicia en 1
  const [contactosPorPagina, setContactosPorPagina] = useState(3); // Por defecto 3 por página

  // 1. Filtrar
  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 2. Ordenar
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    return ordenAsc
      ? a.nombre.localeCompare(b.nombre)
      : b.nombre.localeCompare(a.nombre);
  });

  // 3. Reiniciar a página 1 cuando cambia la búsqueda o el orden
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, ordenAsc, contactosPorPagina]);

  // 4. Calcular el total de páginas
  const totalPaginas = Math.ceil(contactosOrdenados.length / contactosPorPagina);

  // 5. Recortar lista con slice() para obtener la página actual
  const indiceInicio = (paginaActual - 1) * contactosPorPagina;
  const indiceFin = indiceInicio + contactosPorPagina;
  const contactosPaginados = contactosOrdenados.slice(indiceInicio, indiceFin);

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, { ...nuevo, id: Date.now() }]);
  };

  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Agenda ADSO Paginada</h1>
        <p className="text-gray-600 text-sm mt-1">Navegación por páginas con slice() y Math.ceil()</p>
      </header>

      {/* Formulario de creación */}
      <FormularioContacto onAgregarContacto={agregarContacto} />

      {/* Controles de filtro, orden y cantidad por página */}
      <div className="max-w-xl mx-auto mb-6 flex flex-wrap gap-3 items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <input
          type="text"
          placeholder="🔍 Buscar contacto por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={() => setOrdenAsc((prev) => !prev)}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg text-sm text-gray-700 transition"
        >
          {ordenAsc ? "A-Z ⬆️" : "Z-A ⬇️"}
        </button>

        {/* Selector de cantidad de contactos por página (Mini Reto) */}
        <select
          value={contactosPorPagina}
          onChange={(e) => setContactosPorPagina(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm outline-none"
        >
          <option value={2}>2 por pág.</option>
          <option value={3}>3 por pág.</option>
          <option value={5}>5 por pág.</option>
        </select>
      </div>

      {/* Lista de contactos paginados */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto min-h-[220px]">
        {contactosPaginados.length > 0 ? (
          contactosPaginados.map((c) => (
            <ContactoCard
              key={c.id}
              nombre={c.nombre}
              telefono={c.telefono}
              correo={c.correo}
              etiqueta={c.etiqueta}
              onEliminar={() => eliminarContacto(c.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 italic mt-8">No se encontraron contactos</p>
        )}
      </div>

      {/* --- CONTROLES DE PAGINACIÓN --- */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {/* Botón Anterior */}
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual((p) => p - 1)}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition text-sm font-medium"
          >
            Anterior
          </button>

          {/* Números de página con Array.from */}
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPaginaActual(num)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                paginaActual === num
                  ? "bg-purple-700 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}

          {/* Botón Siguiente */}
          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual((p) => p + 1)}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition text-sm font-medium"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default App;