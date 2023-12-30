import { useState } from "react"
import axiosAPI from "../api/Configuration"
import { useManager } from "../utils/Context"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
interface ManagerData {
    code: string | undefined
    FirstName: string | undefined
    LastName: string | undefined
    Phone_Number: string | undefined
}
export default function SignName() {
    const { setManager } = useManager()
    const Navigate = useNavigate()
    const [Data, setData] = useState<ManagerData>({ FirstName: '', LastName: '', Phone_Number: '', code: '' })
    const handleClick = async () => {
        try {
            const { data } = await axiosAPI.post(`Manager/retrieveAccount`, Data)
            if (data.length) {
                console.log(data[0])
                setManager({ ...data[0] })
                Navigate('/main')
            }
            else {
                toast.error('Votre Données ne correspond pas à ceux trouvés sur notre base de donnée')
            }
        } catch (error) {
            toast.error('un erreur est produit')
        }
    }
    return <>
        <ToastContainer />
        <div className="flex flex-col justify-center items-center gap-3 p-44">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entrez Votre Prénom</label>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setData({ ...Data, FirstName: e.target.value })}></input>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entrez Votre Nom</label>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setData({ ...Data, LastName: e.target.value })}></input>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entrez Votre Numéro de Téléphone</label>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setData({ ...Data, Phone_Number: e.target.value })}></input>
            </div>
            <div>
                <button className=" bg-green-500 p-2 rounded-2xl text-white hover:duration-300 hover:bg-orange-400" onClick={() => handleClick()}>Entrez</button>
            </div>
            <div>
                <button className=" bg-green-500 p-2 rounded-2xl text-white hover:duration-300 hover:bg-orange-400" onClick={() => Navigate('/')}>Retournez</button>
            </div>
        </div>
    </>
}