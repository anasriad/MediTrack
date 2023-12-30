import { useEffect, useState } from "react"
import axiosAPI from "../api/Configuration"
import { IoHome } from 'react-icons/io5'
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
interface Product {
    ProductID: number,
    Name: string,
    quantity: string,
    LatestEntry: string,
    RegistrationDate: string,
    SecurtyStock: string,
    ExitDate: string,
    Expiration: string
}
export default function History() {
    const [Products, setProducts] = useState<Product[]>([])
    const Navigate = useNavigate()
    useEffect(() => {
        handleGettingAll()
    }, [])
    const handleGettingAll = async () => {
        try {
            const { data } = await axiosAPI.get('/Product/getProducts')
            setProducts(data)
        } catch (error) {
            toast.error('Erreur est produit')
        }
    }
    const handlSearch = async (key: string) => {
        if (key == '') {
            handleGettingAll()
        }
        else {
            try {
                const { data } = await axiosAPI.get(`Product/${key}/searchProduct`)
                setProducts(data)
            } catch (error) {
                toast.error('Erreur de chercher un produit')
            }
        }
    }
    const handleDelete = async (ID: number) => {
        try {
            await axiosAPI.delete(`Product/${ID}/deleteProduct`)
            handleGettingAll()
            toast.success('Produit est bien supprimé')
        } catch (error) {
            toast.error('Erreur est produit')
        }
    }
    return <>
        <div className="hover:duration-300 hover:cursor-pointer mt-3 ml-4 flex gap-4 items-center hover:text-orange-500" onClick={() => Navigate('/main')}>
            <IoHome /> Acceuil
        </div>
        <div className=" flex flex-row gap-28 items-center justify-center">
            <div className=" flex gap-3">
                <button className=" p-3 bg-green-500 text-white rounded-xl hover:duration-300 hover:bg-orange-500" onClick={() => Navigate('/management')}>Gestion Des Produit</button>
                <button className=" p-3 bg-green-500 text-white rounded-xl hover:duration-300 hover:bg-orange-500" onClick={() => Navigate('/form')}>Enregistrez une Nouveau Produit</button>
            </div>
        </div>
        <div>   
            <ToastContainer />
        </div>
        <hr className=" mt-4"></hr>
        <div className=" mt-10 ml-12 flex items-center justify-between">
            <h1 className=" text-xl font-bold">Historique</h1>
            <div className=" flex mr-16">
                <form className=" flex gap-4 items-center">
                    <label>Cherchez un Produit:</label>
                    <input type="search" className=" border border-black w-72 p-2 rounded-xl" onChange={(e) => handlSearch(e.target.value)}></input>
                </form>
            </div>
        </div>
        <div className=" flex flex-wrap gap-2 p-5 ml-5">
            {!Products.length && <h1>Rien est trouvé</h1>}
            {Products?.map((product) => {
                return <div className="max-w-sm p-6 bg-white border border-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-900 flex flex-col gap-7">
                    <a>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{product.Name}</h5>
                    </a>
                    <div className=" flex flex-col gap-1">
                        <div className=" flex gap-4">
                            <h1>Date D'enregistrement: </h1>
                            <h2 className=" text-blue-600">{product.RegistrationDate}</h2>
                        </div>
                        <div className="flex gap-4">
                            <h1>Date De Péremption: </h1>
                            <h2 className=" text-blue-600">{product.Expiration}</h2>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className=" p-2 text-white rounded-xl bg-red-500 hover:duration-300 hover:bg-red-400" onClick={() => handleDelete(product.ProductID)}>Supprimer</button>
                    </div>
                </div>
            })}
        </div>
    </>
}