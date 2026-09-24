import { useState } from "react";

export default function FormularioContacto({ onAgregarContacto }) {
  // Estado para los valores de los campos
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "Amigo",
  });

  // Estado para los mensajes de error por campo
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Estado booleano para controlar la UX al enviar a la API
  const [enviando, setEnviando] = useState(false);

  // Manejo de cambios en los inputs
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Función de validación
  function validarFormulario() {
    const nuevosErrores = {
      nombre: "",
      telefono: "",
      correo: "",
    };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    // Es válido solo si todos los mensajes de error quedaron vacíos
    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  // Manejo del envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      setEnviando(true);
      await onAgregarContacto(form); // Llamada asíncrona a la API o estado padre
      // Reiniciar formulario y errores
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "Amigo" });
      setErrores({ nombre: "", telefono: "", correo: "" });
    } catch (error) {
      console.error("Error al guardar contacto:", error);
    } finally {
      setEnviando(false); // Se reactiva el botón siempre
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white border border-gray-200 rounded-lg shadow-sm p-5 max-w-lg mx-auto mb-6 text-left"
    >
      {/* Campo Nombre */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          placeholder="Ej: Laura Pérez"
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errores.nombre && (
          <p className="text-xs text-red-600 font-medium">{errores.nombre}</p>
        )}
      </div>

      {/* Campo Teléfono */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Teléfono</label>
        <input
          name="telefono"
          value={form.telefono}
          onChange={onChange}
          placeholder="Ej: 300 000 0000"
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errores.telefono && (
          <p className="text-xs text-red-600 font-medium">{errores.telefono}</p>
        )}
      </div>

      {/* Campo Correo */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Correo</label>
        <input
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="correo@ejemplo.com"
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errores.correo && (
          <p className="text-xs text-red-600 font-medium">{errores.correo}</p>
        )}
      </div>

      {/* Campo Etiqueta */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Etiqueta</label>
        <select
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-purple-500 bg-white"
        >
          <option value="Instructor">Instructor</option>
          <option value="Familiar">Familiar</option>
          <option value="Amigo">Amigo</option>
          <option value="Trabajo">Trabajo</option>
        </select>
      </div>

      {/* Botón con estado enviando */}
      <button
        type="submit"
        disabled={enviando}
        className="sm:col-span-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-lg py-2.5 transition mt-2"
      >
        {enviando ? "Guardando..." : "Agregar contacto"}
      </button>
    </form>
  );
}