import { AdminsPageLogic } from "../business-layer/admins-logic.js";

export function RendererAdmin() {
    this.pageData = null;
    this.pageLogic = new AdminsPageLogic();
    this.mainContainer = document.getElementById("mainContainer");
    
    this.renderAll = function() {

        const signUp = async () => {
            const username = u.value;
            const email = e.value;
            const phonenumber = ph.value;
            const password = p.value;
            this.pageData = await this.pageLogic.createNewAdmin(username, email, phonenumber, password);
        }

        const login = async () => {
          const username = user.value;
          const password = pass.value;
          this.pageData = await this.pageLogic.loginAdminLogic(username, password);
        }

      const u = document.createElement('input');
      u.placeholder = 'user';
      u.id = "u";
      mainContainer.appendChild(u);

      const e = document.createElement('input');
      e.placeholder = 'email';
      e.id = 'e';
      mainContainer.appendChild(e);

      const ph = document.createElement('input');
      ph.placeholder = "phone";
      ph.id = 'ph';
      mainContainer.appendChild(ph);

      const p = document.createElement("input");
      p.placeholder = "pass";
      p.id = "p";
      mainContainer.appendChild(p);

      const create = document.createElement('button');
      create.innerText = "Create";
      create.id = "create";
      create.addEventListener('click', () => {
        signUp();
      });
      mainContainer.appendChild(create);

      const user = document.createElement('input');
      user.placeholder = "Enter username, phonenumber or email";
      user.id = 'user';
      // username.name = "administrator[username]";
      mainContainer.appendChild(user);

      const pass = document.createElement('input');
      pass.placeholder = "Enter password";
      pass.id = 'pass';
      mainContainer.appendChild(pass);

      const btnLogin = document.createElement('button');
      btnLogin.innerHTML = "Submit";
      btnLogin.id = "btnLogin";
      btnLogin.addEventListener('click', () => {
        login();
      });
      mainContainer.appendChild(btnLogin);

    }


    this.renderAll();

}