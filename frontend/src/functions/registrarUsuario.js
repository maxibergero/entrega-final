export const registrarUsuario = async (nombre, apellido, email, edad, password) => {
    try {
        const response = await fetch('http://localhost:4000/api/sessions/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre, apellido: apellido, email: email, edad: edad, password: password })
        })
        const data = await response.json()
        
        if(response.status === 200){
            return data.mensaje
        }
        else{
            throw new Error(data.mensaje)
        }
    } catch (error) {
        throw new Error(error)
    }
}