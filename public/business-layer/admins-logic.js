import { AdminsRepository } from "../repository-layer/admins-repo.js";

export function AdminsPageLogic() {

    this.adminsRepo = new AdminsRepository();

    this.createNewAdmin = async function(username, email, phonenumber, password) {
        const adminData = await this.adminsRepo.createAdmin(username, email, phonenumber, password);
     
        const pageData = {
            adminInfo: adminData
        };

        return pageData;
    }

    this.loginAdminLogic = async function (username, password) {
      const loginData = await this.adminsRepo.loginAdmin(username, password);

      const pageData = {
        adminLogin: loginData
      }

      return pageData;
    }

}