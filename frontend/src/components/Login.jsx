import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../functions/getToken'

export const Login = () => {


    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleClkIniciarSesion = async () => {

        try {
            const token = await getToken(email, password)

            localStorage.setItem('token', token)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Login validado",
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });

            navigate('/products-compra')

        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Usuario o contraseña incorrectos",
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });
        }
    }



    return (

        <div className="container-login">
            <div className="login">
                <div className='logo'>
                    <img src="./img/acceso.png" alt="imagen de acceso para login" style={{ width: '35%', height: '90%' }} />
                </div>
                <div className='cuerpo-login'>
                    <input
                        className="form-control form-control-lg "
                        type="text"
                        placeholder="Email"
                        id="inputLarge"
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <input
                        className="form-control form-control-lg "
                        type="password"
                        placeholder="Password"
                        id="inputLarge"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>
                <div className='footer-login' style={{ display: 'flex', flexDirection: 'column' }}>
                    <button className="btn btn-lg btn-primary" type="button" onClick={handleClkIniciarSesion}>Iniciar Sesión</button>
                    <button type="button" className="btn btn-link" onClick={() => navigate('/registrar')}>
                        Registrate
                    </button>

                </div>




            </div>

        </div>


    )
}