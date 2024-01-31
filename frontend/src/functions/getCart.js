//Obtiene el cart del usuario que lo consulta


export const getCart = async () => {

    try {
        const response = await fetch('http://localhost:4000/api/carts', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        
        if(response.status === 200){
            return data
        }else{
            throw new Error('Cart not found')
        }
    } catch (error) {
        
    }
}