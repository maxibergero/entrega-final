export const enviarCorreoUserEliminado = async (email) => {
    
    try {
        const response = await fetch('http://localhost:4000/envioCorreo/userEliminado', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ email: email })
        })

        if (response.status === 200) {
            const emailDondeSeEnvio = await response.json()
            return emailDondeSeEnvio
        }
        
        throw new Error('Error al enviar el correo')
    } catch (error) {
        throw new Error(error)
    }
}