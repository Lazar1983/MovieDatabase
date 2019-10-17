function main() {
  const mainContainer = document.getElementById("mainContainer");

  const getActorsByName = async () => {
    const response = await fetch (`http://localhost:3010/actors/:name`);
    const data = await response.json();
    console.log(data);
  }

  // get single actor from my api
  const form = document.createElement('form');
  form.setAttribute("method", "get");
  form.setAttribute("action", "/actors/:name");
  mainContainer.appendChild(form);
  form.submit();

  // value of this input to be response of http://localhost:3010/actors/:name
  const input = document.createElement('input');
  input.placeholder = "Enter actor name";
  form.appendChild(input);
  input.id = "input";
  input.addEventListener('change', () => {
    const dataInp = input.value;
    console.log(dataInp);
    return dataInp;
  })


  const btn = document.createElement('button');
  btn.innerHTML = "Submit";
  btn.type = "submit";
  btn.value = "submit";
  mainContainer.appendChild(btn);
  btn.addEventListener('click', getActorsByName().value(dataInp));


}

main();