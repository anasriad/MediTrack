import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useManager } from "../utils/Context"
export default function Main() {
   const { manager } = useManager()
   useEffect(() => {
      toast.success(`Bienvenue ${manager?.FirstName} ${manager?.LastName}`)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   const Navigate = useNavigate()
   return <>
      <ToastContainer />
      <div className=" flex flex-col gap-3 p-44 justify-center items-center">
         <div>
            <h1 className=" font-bold">Managez Votre Produits</h1>
         </div>
         <div className=" flex flex-col gap-6">
            <button className=" bg-green-500 p-2 rounded-2xl text-white hover:duration-300 hover:bg-orange-400" onClick={() => Navigate('/management')}>Gestion Des Produits</button>
            <button className=" bg-green-500 p-2 rounded-2xl text-white hover:duration-300 hover:bg-orange-400" onClick={() => Navigate('/form')}>Enregistrez Un Nouveau Produit</button>
            <button className=" bg-green-500 p-2 rounded-2xl text-white hover:duration-300 hover:bg-orange-400" onClick={() => Navigate('/history')}>Historique</button>
         </div>
      </div>
   </>
}