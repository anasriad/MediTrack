import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosAPI from "../api/Configuration"
import { useManager } from "../utils/Context"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export default function Landing() {
    const [Code, setValue] = useState('')
    const Navigate = useNavigate()
    const { setManager } = useManager()
    const CheckForPass = async () => {
        try {
            const { data } = await axiosAPI.get(`Manager/${Code}/CheckManager`)
            if (data.length) {
                setManager({ ...data[0] })
                Navigate('/main')
            }
            else {
                toast.error('Code incorrect')
            }
        } catch (error) {
            toast.error('Erreur est produit')
        }
    }
    return <>
        <ToastContainer />
        <div className="flex flex-col justify-center items-center gap-3 p-44">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entrez le code d'authentication</label>
                <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {
                    setValue(e.target.value)
                }}></input>
            </div>
            <div>
                <button className=" bg-green-500 p-2 rounded-2xl text-white hover:duration-300 hover:bg-orange-400" onClick={() => CheckForPass()}>Entrez</button>
            </div>
            <div>
                <h3 className=" text-gray-400 text-sm hover:underline hover:cursor-pointer" onClick={() => Navigate('/forgottenPass')}>Code Oublié?</h3>
            </div>
            <div>
                <h3 className=" text-gray-400 text-sm hover:underline hover:cursor-pointer" onClick={() => Navigate('/Account')}>Créé un compte</h3>
            </div>
        </div>
    </>
}