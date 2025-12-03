import { useEffect, useState } from "react";
import CardNote from "../components/CardNote.jsx"
import axios from "axios"
import formatData from "../utils/formatDate.js";
const apiURL = import.meta.env.VITE_API_URL;
const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/notes`);
        console.log(response)
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);  

  if(loading) return <span>Cargando...</span>
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
      {notes.map(note => (
        <CardNote 
        key={note._id}
        title={note.title}
        description={note.description}
        id={note._id}
        date={formatData(note.createdAt)}
        />
      ))}
    </div>
  )
}

export default HomePage