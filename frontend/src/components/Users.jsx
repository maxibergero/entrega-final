import { useEffect, useState } from "react"
import { getAllUsers } from "../functions/getAllUsers"
import { deleteUserById } from "../functions/deleteUserById"
import { deleteUsersPorUltimaSesion } from "../functions/deleteUsersPorUltimaSesion"
import { enviarCorreoUserEliminado } from "../functions/enviarCorreoUserEliminado"

export const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const usersNuevos = await getAllUsers()
                setUsers(usersNuevos)
            } catch (error) {
                throw new Error(error.message)
            }
        })()
    }, [])

    const handleClickDeleteUser = async (idUser) => {
        try {
            const userEliminado = await deleteUserById(idUser)
            setUsers(users.filter(user => user._id !== userEliminado._id))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Usuario eliminado con éxito!!",
                showConfirmButton: false,
                timer: 3000, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });
        } catch (error) {

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "No fue posible eliminar al usuario",
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });

            throw new Error(error)
        }
    }


    const handleClickDeleteUserPorInactividad = async () => {
        try {
            const usersEliminados = await deleteUsersPorUltimaSesion()

            const usuariosNoEliminados = users.filter(user => {
                return !usersEliminados.some(userEliminado => user._id === userEliminado._id);
            });

            setUsers(usuariosNoEliminados);

            usersEliminados.forEach( (user) => {

                enviarCorreoUserEliminado(user.email);
               
            });
            


            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Usuarios eliminados con éxito!!",
                showConfirmButton: false,
                timer: 3000,
                backdrop: false, // Fondo no interactivo
            });
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 3000,
                backdrop: false, // Fondo no interactivo
            });
        }
    }

    return (
        <div>

            <div className="col-12">
                <h1 style={{ textAlign: 'center', height: '100px' }}>Gestión de Usuarios</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', marginRight: '10px' }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="col-3">Nombre</th>
                            <th scope="col" className="col-3">Apellido</th>
                            <th scope="col" className="col-5">Email</th>
                            <th scope="col" className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody >
                        {users.length > 0 && users.map((user, index) => (
                            <tr key={index} className="table-active" style={{ border: '1px solid transparent' }}>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleClickDeleteUser(user._id)} style={{ backgroundColor: 'transparent', backgroundImage: 'url(/img/cruzRoja.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '20px', height: '20px', border: 'none' }}></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>

            <div className="d-grid gap-2" style={{ width: "100%" }}>
                <button onClick={() => handleClickDeleteUserPorInactividad()} className="btn btn-lg btn-primary" type="button" style={{ marginLeft: '10px', marginRight: '10px', }}>
                    Eliminar Usuarios por Inactividad
                </button>
            </div>


        </div>
    )
}