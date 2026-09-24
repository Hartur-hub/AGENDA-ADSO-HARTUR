export default function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar }) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between gap-4 w-full max-w-sm">
      <div className="text-left">
        <h3 className="font-bold text-gray-800">{nombre}</h3>
        <p className="text-sm text-gray-600">📞 {telefono}</p>
        <p className="text-sm text-gray-600">✉️ {correo}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 font-bold text-xs rounded-full">
          {etiqueta}
        </span>
      </div>
      {onEliminar && (
        <button
          onClick={() => onEliminar(correo)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-full px-3 py-1.5 transition"
        >
          Eliminar
        </button>
      )}
    </article>
  );
}