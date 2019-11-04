import { Admins } from "../entities/admins.js";

export function AdminsRepository() {

    this.createAdmin = async function(username, email, phonenumber, password) {
        try {
            const response =  await fetch(`http://localhost:3080/sign-up`, {
              method: 'POST',
              body: JSON.stringify({username, email, phonenumber, password})
            });
            const data = await response.json();
            console.log("Response from admin sign-up API", data);
            return new Admins(data.admins);
        } catch(error) {
            return error;
        }
    }

    this.loginAdmin = async function (username, password) {
      try {
        const response = await fetch('http://localhost:3080/login', {
          method: 'POST',
          body: JSON.stringify({username, password})
        });
        const data = await response.json();
        console.log("Login user with", data);
        return new Admins(data.admins);
      } catch (error){
          return error;
      }

    }

}

