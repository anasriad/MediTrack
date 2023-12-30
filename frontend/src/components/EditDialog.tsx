
import axiosAPI from "../api/Configuration";

interface Product {
    ProductID: number,
    Name: string,
    Quantity: number,
    LatestEntry: string,
    RegistrationDate: string,
    SecurtyStock: number,
    ExitDate: string,
    Expiration: string,
    TimeLeft: string
}
interface Props {
    onClose: () => void,
    product: Product,
    onSent: (status: boolean) => void
}

export default function EditDialog(Properties: Props) {
    const { onClose, product, onSent } = Properties
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            await axiosAPI.put('Product/updateProduct', product)
            onSent(true)
            onClose()
        } catch (error) {
            onSent(false)
        }
    }
    return <>
        <div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-white shadow-md">
            <div className=" p-2 flex flex-col gap-5">
                <div>
                    <button className=" p-2 bg-red-600 text-white rounded-xl hover:bg-orange-500 hover:duration-300" onClick={() => onClose()}>Quittez</button>
                </div>
                <hr></hr>
                <div>
                    <div className=" font-bold underline">
                        Modifiez Produit: {product.Name}
                    </div>
                    <div>
                        <form className=" rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                            <div className=" flex flex-col gap-6 items-center">
                                <div className=" flex flex-col gap-6">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Nom du Produit
                                        </label>
                                        <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" defaultValue={product.Name} onChange={(e) => product.Name = e.target.value} />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Quantité
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" defaultValue={product.Quantity} onChange={(e) => product.Quantity = parseInt(e.target.value)} />
                                    </div>
                                </div>
                                <div className=" flex flex-col gap-6">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Date de Péremption
                                        </label>
                                        <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" defaultValue={product.Expiration} onChange={(e) => product.Expiration = e.target.value} />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Stock de Sécurité
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" defaultValue={product.SecurtyStock} onChange={(e) => product.SecurtyStock = parseInt(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Modifiez</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </>
}