import { AdminRepository } from "../repository-layer/admin-repo.js";

export function AdminPageLogic() {

    this.adminRepo = new AdminRepository();

    this.getDataForAdminPage = async function(adminName) {
        var adminData = await this.adminRepo.getAdminInfo(adminName);
     
        var pageData = {
            administrator: adminData;
        };

        return pageData;
    }

}