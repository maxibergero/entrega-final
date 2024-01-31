import { useEffect, useState } from "react";
import { getTicketById } from "../functions/getTicketById";


export const Comprobante = ({ isOpen, onClose, ticketNuevo }) => {

    const [ticket, setTicket] = useState(null);
    

    useEffect(() => {
        (async () => {
            try {
                if (ticketNuevo) {
                    const dataTicket = await getTicketById(ticketNuevo._id);
                    setTicket(dataTicket);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        })();
    }, [ticketNuevo]);

    if (isOpen) {
        return (
            <div className="container-comprobante">
                <div className="comprobante">

                    <div style={{ marginBottom: '20px', marginLeft: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <h1>Comprobante</h1>
                        <div style={{marginRight: '20px', marginTop: '20px'}}>
                            <h6>Nombre: {ticket && ticket.nombre}</h6>
                            <h6>Apellido: {ticket && ticket.apellido}</h6>
                            <h6>Email: {ticket && ticket.purcharser}</h6>
                            <h6>Code: {ticket && ticket.code}</h6>
                            <h6>Fecha: {ticket && ticket.purchase_datatime}</h6>
                        </div>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">precio Unitario</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ticket && ticket.cart.products.map((item, index) => (
                                    
                                    <tr key={index}>
                                        <td>{item.id_prod.title}</td>
                                        <td>${item.id_prod.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.quantity * item.id_prod.price}</td>
                                    </tr>
                                ))
                            }
                            
                            <tr className="table-success">
                                <th scope="row">Total</th>
                                <td></td>
                                <td></td>
                                <td>$ {ticket && ticket.amount}</td>
                            </tr>

                        </tbody>
                    </table>

                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        );
    }

    return null; // Si isOpen es false, no renderizar nada
};
