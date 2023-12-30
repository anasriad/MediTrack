import { useEffect, useState } from "react"
import axiosAPI from "../api/Configuration"
import { toast, ToastContainer } from "react-toastify"
import { IoHome } from 'react-icons/io5'
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { useManager } from "../utils/Context"
interface ProductData {
    name: string,
    quantity: number,
    expiration: string,
    security: number,
    Manager: string | undefined
}
export default function Form() {
    const Navigate = useNavigate()
    const { manager } = useManager()
    const [Product, setProduct] = useState<ProductData>({
        name: '',
        quantity: 0,
        expiration: '',
        security: 0,
        Manager: '',
    })
    useEffect(() => {
        setProduct({ ...Product, Manager: manager?.code })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            await axiosAPI.post('/Product/RegisterProduct', Product)
            toast.success('Produit est Bien Enregistré')
        } catch (error) {
            toast.error('Erreur')
        }
    }
    return <>
        <div className=" flex items-center mt-8 gap-10 justify-center">
            <div className=" hover:scale-105 hover:duration-300 hover:cursor-pointer flex gap-4 items-center  p-3 bg-green-500 text-white rounded-xl  hover:bg-orange-500" onClick={() => Navigate('/main')}>
                <IoHome /> Acceuil
            </div>
        </div>
        <div>
            <ToastContainer />
        </div>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-6 items-center">
                <div className=" flex flex-col gap-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nom du Produit
                        </label>
                        <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text"
                            onChange={(e) => setProduct({ ...Product, name: e.target.value })} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Quantité
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number"
                            onChange={(e) => setProduct({ ...Product, quantity: parseInt(e.target.value) })} />
                    </div>
                </div>
                <div className=" flex flex-col gap-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date de Péremption
                        </label>
                        <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date"
                            onChange={(e) => setProduct({ ...Product, expiration: e.target.value })} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Stock de Sécurité
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number"
                            onChange={(e) => setProduct({ ...Product, security: parseInt(e.target.value) })} />
                    </div>
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Entrez</button>
                </div>

            </div>
        </form>
    </>
}