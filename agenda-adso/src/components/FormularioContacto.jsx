import { useState } from "react";

export default function FormularioContacto({ onAgregarContacto }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "Amigo",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo) return;
    onAgregarContacto(form);
    setForm({ nombre: "", telefono: "", correo: "", etiqueta: "Amigo" });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white border border-gray-200 rounded-lg shadow-sm p-5 max-w-lg mx-auto mb-6 text-left"
    >
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          placeholder="Ej: Laura Pérez"
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Teléfono</label>
        <input
          name="telefono"
          value={form.telefono}
          onChange={onChange}
          placeholder="Ej: 300 000 0000"
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Correo</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="correo@ejemplo.com"
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

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

      <button
        type="submit"
        className="sm:col-span-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-2.5 transition mt-2"
      >
        Agregar contacto
      </button>
    </form>
  );
}