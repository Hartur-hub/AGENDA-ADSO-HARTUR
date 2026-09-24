export default function ContactoCard({ nombre, telefono, correo, etiqueta }) {
  return (
    <div className="card-contacto">
      <p className="card-nombre">{nombre}</p>
      <p className="card-linea">📞 {telefono}</p>
      <p className="card-linea">✉️ {correo}</p>
      <span className="card-etiqueta">{etiqueta}</span>
    </div>
  );
}