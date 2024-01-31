import { getMyUser } from '../functions/getMyUser.js';
import { useState, useEffect } from 'react';
import { updateCart } from '../functions/updateCart';
import { deleteProduct } from '../functions/deleteProduct.js';
import { generarTicket } from '../functions/generarTicket.js';
import { Comprobante } from './Comprobante.jsx';
import { limpiarMyCart } from '../functions/limpiarMyCart.js';




export const Cart = () => {

    const [user, setUser] = useState(null)
    const [cart, setCart] = useState(null)
    const [products, setProducts] = useState(null)
    const [isOpenComprobante, setIsOpenComprobante] = useState(false)
    const [ticket, setTicket] = useState(null)



    useEffect(() => {
        (async () => {
            try {
                const user = await getMyUser()
                setUser(user)
                setCart(user.cart)
                setProducts(user.cart.products)
                console.log(user)
            } catch (error) {
                throw new Error(error)
            }
        })()
    }, [])



    const handleChangeQuantity = async (idProduct, e) => {

        try {

            //Verificamos stock

            //Recorrer products y devolver cuando existe una coincidencia
            const prod = products.find(product => product.id_prod._id == idProduct)
            if (prod && prod.id_prod.stock < e.target.value) {
                return Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "No hay stock suficiente",
                    showConfirmButton: false,
                    timer: 1500, // Puedes configurar el temporizador si lo deseas
                    backdrop: false, // Fondo no interactivo
                });
            }
            await updateCart(cart._id, idProduct, e.target.value)

            const user = await getMyUser()
            setCart(user.cart)
            setProducts(user.cart.products)
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Error al actualizar el carrito",
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });
        }

    };

    const handleDeleteProduct = async (idProducto) => {
        try {
            const cartNuevo = await deleteProduct(cart._id, idProducto)
            const user = await getMyUser()
            setCart(user.cart)
            setProducts(user.cart.products)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Producto eliminado",
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });



        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error}`,
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });
        }
    }

    const handleComprar = async () => {
        try {

            if(cart.products.length === 0){
                return Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "No hay productos en el carrito",
                    showConfirmButton: false,
                    timer: 1500, // Puedes configurar el temporizador si lo deseas
                    backdrop: false, // Fondo no interactivo
                });
            }

            const ticket = await generarTicket()
            setTicket(ticket)
            await limpiarMyCart()
            const user = await getMyUser()
            setCart(user.cart)
            setProducts(user.cart.products)
            setIsOpenComprobante(true)




            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Ticket generado",
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });



        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });
        }
    }


    return (

        <div style={{ backgroundImage: `url(./img/fondoNegro.jpg)` }}>
            <Comprobante isOpen={isOpenComprobante} onClose={() => setIsOpenComprobante(false)} ticketNuevo={ticket} />

            <h1 className="fw-bold mb-0 text-black">
                Shopping Cart - {user && user.nombre}
            </h1>

            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12" >
                        <div
                            className="card card-registration card-registration-2"
                            style={{ borderRadius: 15 }}
                        >
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5" >
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                <h6 className="mb-0 text-muted">3 items</h6>
                                            </div>
                                            <hr className="my-4" />
                                            {

                                                products && products.length > 0 && products.map((item, index) => {
                                                    return (<div className="row mb-4 d-flex justify-content-between align-items-center" key={index}>
                                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src="/img/aprobado.png"
                                                                className="img-fluid rounded-3"
                                                                alt="Cotton T-shirt"
                                                            />
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-muted">{item.id_prod.title}</h6>
                                                            <h6 className="text-black mb-0">{item.id_prod.description}</h6>
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">

                                                            <input
                                                                id="quantity"
                                                                min={1}
                                                                name="quantity"
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                value={item.quantity}
                                                                onChange={(e) => handleChangeQuantity(item.id_prod._id, e)}
                                                            />

                                                        </div>
                                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">

                                                            <h6 className="mb-0">$ {item.id_prod.price * item.quantity}</h6>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-xl-1 d-flex align-items-center justify-content-end">
                                                            <button className="btn btn-link" onClick={() => handleDeleteProduct(item.id_prod._id)}>
                                                                <img src="/img/papelera.png" alt="Papelera" width="24px" height="24px" />
                                                            </button>
                                                        </div>
                                                    </div>)
                                                })
                                            }


                                            <hr className="my-4" />
                                            <div className="pt-5">
                                                <h6 className="mb-0">
                                                    <a href="/products-compra" className="text-body">
                                                        <i className="fas fa-long-arrow-alt-left me-2" />
                                                        Back to shop
                                                    </a>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase">Items: {cart && cart.length}</h5>
                                                <h5>$
                                                    {cart &&
                                                        cart.products.reduce((total, item) => {
                                                            return total + item.id_prod.price * item.quantity;
                                                        }, 0)}
                                                </h5>
                                            </div>
                                            <h5 className="text-uppercase mb-3">Shipping</h5>
                                            <div className="mb-4 pb-2">
                                                <select className="select">
                                                    <option value={1}>Standard-Delivery- €5.00</option>
                                                    <option value={2}>Two</option>
                                                    <option value={3}>Three</option>
                                                    <option value={4}>Four</option>
                                                </select>
                                            </div>
                                            <h5 className="text-uppercase mb-3">Give code</h5>
                                            <div className="mb-5">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="form3Examplea2"
                                                        className="form-control form-control-lg"
                                                    />
                                                    <label className="form-label" htmlFor="form3Examplea2">
                                                        Enter your code
                                                    </label>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase">Total price</h5>
                                                <h5>$
                                                    {cart &&
                                                        cart.products.reduce((total, item) => {
                                                            return total + item.id_prod.price * item.quantity;
                                                        }, 0)}
                                                </h5>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-success btn-block btn-lg"
                                                data-mdb-ripple-color="dark"
                                                onClick={() => handleComprar()}
                                            >
                                                Comprar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>





    );
};



