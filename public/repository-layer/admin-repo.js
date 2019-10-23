import { Admins } from "../entities/admin.js";

export function AdminsRepository() {

    this.getAdminInfo = async function(adminName) {
        try {
            var response =  await fetch(`http://localhost:3000/actors/${adminName}`);
            var data = await response.json();
            console.log("Response from getAdminInfo API", data);
            return new Admin(data.admin);
        } catch(error) {
            return error;
        }
    }

}