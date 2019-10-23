import { AdminPageLogic } from "../business-layer/admin-logic.js";

export function Renderer() {
    this.pageData = null;
    this.mainContainer = document.getElementById("mainContainer");

    this.pageLogic = new AdminPageLogic();
    
    this.renderAll = function() {
        console.log(this.pageData);

  const e = document.createElement('input');
  e.placeholder = 'email';
  e.id = 'e';
  mainContainer.appendChild(e);

    }

    this.renderAdmin = function() {

    }

    this.init = async function(adminName) {
        this.pageData = await this.pageLogic.getDataForAdminPage(adminName);
        this.mainContainer.innerHTML = "";
        this.renderAll();
    }


}