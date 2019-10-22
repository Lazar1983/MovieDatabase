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
  }


  const user = document.createElement('input');
  user.placeholder = "Enter username, phonenumber or email";
  // username.name = "administrator[username]";
  mainContainer.appendChild(user);

 


  const pass = document.createElement('input');
  pass.placeholder = "Enter password";
  // password.name = 'administrator[password]';
  mainContainer.appendChild(pass);
  
  const input = document.createElement('input');
  input.placeholder = "Enter actor name";
  mainContainer.appendChild(input);

  const btnLogin = document.createElement('button');
  btnLogin.innerHTML = "Submit";
  btnLogin.addEventListener('click', () => {
    login();
  });
  mainContainer.appendChild(btnLogin);


  const btn = document.createElement('button');
  btn.innerHTML = "Search";
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

  const text = document.createElement('p');
  newDiv.appendChild(text);  
  
}

main();