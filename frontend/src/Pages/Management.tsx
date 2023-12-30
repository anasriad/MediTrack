import { useEffect, useState } from "react"
import axiosAPI from "../api/Configuration"
import { IoHome } from 'react-icons/io5'
import { useNavigate } from "react-router-dom"
import EditDialog from "../components/EditDialog"
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import dayjs from 'dayjs'
import 'dayjs/locale/fr';
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useManager } from "../utils/Context"
interface Product {
    ProductID: number,
    Name: string,
    Quantity: number,
    RegistrationDate: string,
    LatestEntry: string,
    ExitDate: string,
    Expiration: string,
    SecurtyStock: number,
    TimeLeft: string
}
export default function Manager() {
    const [Products, setProducts] = useState<Product[]>([])
    const [UpdatedProduct, setUpdate] = useState<Product>(Products[0])
    const [isOpen, setOpen] = useState(false)
    const { manager } = useManager()
    const Navigate = useNavigate()
    useEffect(() => {
        handleGettingAll()
        toast.success("Le status 'PROCHE' indique que le produit reste un seul Mois pour sa péremption")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const GeneratePDF = () => {
        const pdf = new jsPDF()
        dayjs.locale('fr')
        pdf.text(`le ${dayjs().format('D MMMM YYYY')}`, 10, 10)
        pdf.text(`Gestionnaire: ${manager?.FirstName} ${manager?.LastName}`, 10, 20)
        autoTable(pdf, {
            startY: 30,
            head: [["N", "Nom", "Quantité", "S.D.S", "Péremption", "Dérnière Entrée", "Dérnière Sortie", "Enregistrée le", "Temps Restant"]],
            body: Products.map((prod) => {
                if (!parseInt(prod.TimeLeft)) {
                    prod.TimeLeft = 'PROCHE'
                }
                if (prod.ExitDate == '') {
                    prod.ExitDate = 'Aucune Sortie'
                }
                return Object.values(prod)
            }),
            columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 20 }, 2: { cellWidth: 20 }, 3: { cellWidth: 10 }, 4: { cellWidth: 30 }, 5: { cellWidth: 30 }, 6: { cellWidth: 30 }, 7: { cellWidth: 30 }, 8: { cellWidth: 20 } },
        })
        pdf.save('myFile.pdf')
    }
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
    const handleEntryChange = async (id: number, expired: string) => {
        UpdatedProduct.ProductID = id
        UpdatedProduct.Expiration = expired
        try {
            await axiosAPI.post(`Product/RegisterEntry`, UpdatedProduct)
            handleGettingAll()
            toast.success("L'entrée était enregistrée")
        } catch (error) {
            toast.error("Erreur d'enregistrer l'entrée")
        }
    }
    const handleExitChange = async (id: number) => {
        UpdatedProduct.ProductID = id
        try {
            await axiosAPI.post(`Product/RegisterExit`, UpdatedProduct)
            handleGettingAll()
            toast.success("La sortie était enregistrée")
        } catch (error) {
            toast.error('Error')
        }
    }
    const handleSent = async (status: boolean) => {
        if (status) {
            handleGettingAll()
            toast.success('Produit est bien modifié')
        }
        else {
            toast.error('un erreur est produit')
        }
    }
    return <>
        {
            isOpen && <EditDialog product={UpdatedProduct} onClose={() => setOpen(false)} onSent={(value: boolean) => handleSent(value)} />
        }
        <div className="hover:duration-300 hover:cursor-pointer mt-3 ml-4 flex gap-4 items-center hover:text-orange-500" onClick={() => Navigate('/main')}>
            <IoHome /> Acceuil
        </div>
        <div className=" flex justify-center">
            <ToastContainer />
        </div>
        <hr className=" mt-4"></hr>
        <div className=" mt-10 ml-12 flex items-center justify-between">
            <h1 className=" text-xl font-bold">Gestion</h1>
            <div>
                <button className=" bg-green-400 text-white rounded-xl p-2 hover:bg-orange-500 hover:duration-300" onClick={() => GeneratePDF()}>Générez un PDF</button>
            </div>
            <div className=" flex mr-16">
                <form className=" flex gap-4 items-center">
                    <label>Cherchez un Produit:</label>
                    <input type="search" className=" border border-black w-72 p-2 rounded-xl" onChange={(e) => handlSearch(e.target.value)}></input>
                </form>
            </div>
        </div>
        <div className=" flex flex-wrap gap-2 p-7 ml-5">
            {!Products.length && <h1>Rien est trouvé</h1>}
            {Products?.map((product) => {
                return <div className="max-w-sm p-6 bg-white border border-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-900 flex flex-col gap-7">
                    <a>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{product.Name}</h5>
                    </a>
                    <div className=" flex flex-col gap-1">
                        <div className="flex justify-between">
                            <h1>Date D'enregistrement: </h1>
                            <h2 className=" text-blue-600">{product.RegistrationDate}</h2>
                        </div>
                        <div className="flex justify-between">
                            <h1>Dérnière Sortie: </h1>
                            <h2 className=" text-red-600">{product.ExitDate == null ? 'Aucune Sortie' : product.ExitDate}</h2>
                        </div>
                        <div className="flex justify-between">
                            <h1>Dérnière Entrée: </h1>
                            <h2 className=" text-red-600">{product.LatestEntry}</h2>
                        </div>
                        <div className="flex justify-between">
                            <h1>Date De Péremption: </h1>
                            <h2 className=" text-blue-600">{product.Expiration}</h2>
                        </div>
                        <div className="flex justify-between">
                            <h1>Temps restant pour la péremption: </h1>
                            <h2 className={`${!parseInt(product.TimeLeft) ? 'text-white bg-red-500 p-1 rounded-xl' : 'text-blue-600'}`}>{!parseInt(product.TimeLeft) ? 'PROCHE' : `${product.TimeLeft} jours..`}</h2>
                        </div>
                        <div className="flex justify-between">
                            <h1>Quantity: </h1>
                            <h2 className=" text-blue-600">{product.Quantity}</h2>
                        </div>
                        <div className="flex justify-between">
                            <h1>Stock de Sécurité </h1>
                            <h2 className=" text-blue-600">{product.SecurtyStock}</h2>
                        </div>
                        <div className="flex justify-between">
                            <h1>Statut du Stock</h1>
                            <h2 className={`${product.SecurtyStock == product.Quantity ? 'text-white bg-red-500 p-1 rounded-xl' : 'text-green-500'}`}>{product.SecurtyStock == product.Quantity ? 'Stock est Rempli' : "Stock n'est pas rempli"}</h2>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-2">
                        <div className=" flex gap-6 items-center font-bold">
                            <div className=" flex flex-col">
                                <h3>date:</h3>
                                <input type="date" className="p-2 border-2" onChange={(e) => setUpdate({ ...UpdatedProduct, LatestEntry: e.target.value })}></input>
                            </div>
                            <div className=" flex flex-col">
                                <h3>quantité:</h3>
                                <input type="number" className="p-2 border-2 w-20" onChange={(e) => setUpdate({ ...UpdatedProduct, Quantity: parseInt(e.target.value) })}></input>
                            </div>
                            <div>
                                <button className=" bg-green-500 p-2 rounded-2xl text-white hover:duration-300 hover:bg-orange-400" onClick={() => {
                                    handleEntryChange(product.ProductID, product.Expiration)
                                }}>Entrée</button>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-2">
                        <div className=" flex gap-6 items-center font-bold">
                            <div className=" flex flex-col">
                                <h3>date:</h3>
                                <input type="date" className="p-2 border-2" onChange={(e) => setUpdate({ ...UpdatedProduct, ExitDate: e.target.value })}></input>
                            </div>
                            <div className=" flex flex-col">
                                <h3>quantité:</h3>
                                <input type="number" className="p-2 border-2 w-20" onChange={(e) => setUpdate({ ...UpdatedProduct, Quantity: parseInt(e.target.value) })}></input>
                            </div>
                            <div>
                                <button className=" bg-red-500 p-2 rounded-2xl text-white hover:duration-300 hover:bg-orange-400" onClick={() => handleExitChange(product.ProductID)}>Sortie</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className=" p-2 bg-green-600 text-white rounded-xl hover:bg-orange-500 hover:duration-300" onClick={() => {
                            setUpdate({ ...product })
                            setOpen(true)
                        }}>Modifiez</button>
                    </div>
                </div>
            })}
        </div>
    </>
}