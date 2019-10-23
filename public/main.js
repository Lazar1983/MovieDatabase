// import { Renderer } from "../presentation-layer/admin-render.js";

function main() {





  const mainContainer = document.getElementById("mainContainer");

  const getActorsByNames = async () => {
    const getActor = input.value;
    const response = await fetch(`http://localhost:3000/actors/${getActor}`);
    const data = await response.json();
    const artist = data.body.map((item, i, arr) => {
      let p = document.createElement('p');
      let p1 = document.createElement('p');
      let p2 = document.createElement('p');
      p.innerText = arr[i].first_name;
      p1.innerText = arr[i].last_name;
      p2.innerText = arr[i].birth_date;
      newDiv.appendChild(p);
      newDiv.appendChild(p1);
      newDiv.appendChild(p2);
    });
    console.log(data);
  };

  const login = async () => {
    const response = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: user.value, password: pass.value})
    });
    const loginData = await response.json();
    console.log(loginData);
  };

  const createUser = async () => {
    const response = await fetch (`http://localhost:3000/sign-up`, {
      method: 'POST',
      body: JSON.stringify({username: u.value, email: e.value, phonenumber: ph.value, password: p.value, })
    });
    const createData = await response.json();
    console.log(createData);
  };

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
    createUser();
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
  // password.name = 'administrator[password]';
  mainContainer.appendChild(pass);

  const btnLogin = document.createElement('button');
  btnLogin.innerHTML = "Submit";
  btnLogin.id = "btnLogin";
  btnLogin.addEventListener('click', () => {
    login();
  });
  mainContainer.appendChild(btnLogin);
  
  const input = document.createElement('input');
  input.placeholder = "Enter actor name";
  input.id = "input";
  mainContainer.appendChild(input);



  const btn = document.createElement('button');
  btn.innerHTML = "Search";
  btn.id = 'btn';
  btn.addEventListener('click', () => {
    newDiv.display = "block";
    getActorsByNames();
  });

  mainContainer.appendChild(btn);
  const newDiv = document.createElement('div');
  newDiv.display = "none";
  newDiv.id = "newDiv";
  newDiv.padding = "100px";
  mainContainer.appendChild(newDiv);

  
}

main();