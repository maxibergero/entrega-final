import { useState } from "react"
import { registrarUsuario } from "../functions/registrarUsuario"
import { useNavigate } from "react-router-dom"


export const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [edad, setEdad] = useState('')
    const navigate = useNavigate()


    const HandleClickregistrar = async () => {
        try {

            if (!nombre) throw new Error("Es necesario un nombre válido")
            if (!apellido) throw new Error("Es necesario un apellido")
            if (!email) {
                throw new Error("Es necesario un email");
            }

            // Expresión regular para validar el formato de correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                throw new Error("El formato del email no es válido");
            }
            if (!password) throw new Error("Es necesario una contraseña")
            if (!edad) throw new Error("Es necesario una edad")

            const nuevoUsuario = await registrarUsuario(nombre, apellido, email, edad, password)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Usuario registrado con exito",
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });

            navigate('/login')
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500, // Puedes configurar el temporizador si lo deseas
                backdrop: false, // Fondo no interactivo
            });
            throw new Error(error)
        }
    }
    return (
        <div className="container-inscripcion">

            <div className="inscripcion">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25%' }}>
                    <img src="./img/inscripcion.png" alt="Ícono de inscripción" style={{ width: '100px', height: '100px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '5%', marginRight: '5%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>

                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    />

                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}

                    />

                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />

                    <input
                        type="number"
                        className="form-control"
                        id="edad"
                        placeholder="Edad"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}

                    />

                    <input
                        type="password"
                        className="form-control"
                        id="edad"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />

                </div>

                <div className="d-grid gap-2 " style={{ height: '25%' }}>
                    <button className="btn btn-lg btn-primary" type="button" style={{ marginLeft: '5%', marginRight: '5%', height: '50%', marginTop: 'auto', marginBottom: '5%' }} onClick={() => HandleClickregistrar()}>
                        Registrarme
                    </button>

                </div>


            </div>


        </div>
    )
}