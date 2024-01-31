export const generarTicket = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/tickets', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        
        if(response.status === 200){
            return data
        }else{
            throw new Error(response.error.message)
        }
    } catch (error) {
        throw new Error(error.message)
    }
}