import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

const EditNotePage = () => {
  const { id } = useParams();              // Obtener ID desde la URL
  const navigate = useNavigate();          // Para redirigir
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar la nota actual
  useEffect(() => {
    const loadNote = async () => {
      try {
        const res = await axios.get(`${apiURL}/api/notes/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    loadNote();
  }, [id]);

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${apiURL}/api/notes/${id}`, {
        title,
        description,
      });

      navigate("/"); // Redirige a HomePage
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-base-300 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-accent">Editar Nota</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Título"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Descripción"
          className="textarea textarea-bordered h-32 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button className="btn btn-accent w-full" type="submit">
          Guardar Cambios
        </button>

      </form>
    </div>
  );
};

export default EditNotePage;