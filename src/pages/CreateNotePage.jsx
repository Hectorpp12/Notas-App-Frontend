import NoteForm from "../components/NoteForm.jsx"
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const CreateNotePage = () => {
  const navigate = useNavigate()
  const handleCreate = async (note) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`, note)
      .then(res => {
        if(res.status !== 201) {
          throw new Error("Error creating note")
        }

        toast.success("Note created successfully",{
          position: "bottom-center",
          autoClose: 3001,
          theme:"colored"
        })
        navigate("/")
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
        <NoteForm 
        onSubmit={handleCreate}
        initialDate={{title: "", content: ""}}/>
    </div>
  )
}

export default CreateNotePage