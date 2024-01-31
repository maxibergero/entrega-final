export async function getUserDate(token) {
    try {

        let userDate = "";
        
        const response = await fetch('http://localhost:4000/api/sessions/getUserDate', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-type': 'application/json'
            }
        });

        if (response.status === 200) {
            userDate = await response.json();
            
            return userDate;
        }
    } catch (error) {
        throw new Error("Error Desde función getNombreUser:", error);
    }
}