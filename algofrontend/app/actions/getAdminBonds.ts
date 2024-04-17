
import axios from "axios";

export default async function getAdminBonds() {

    try {
        const response = await axios.get("http://localhost:8000/api/v1/admin-bonds/");
        return(response.data) 
    } catch (error) {
        console.error("Erreur lors de la récupération des Admin Bonds :", error);
    }

    return []

}
