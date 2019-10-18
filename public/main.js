function main() {
  const mainContainer = document.getElementById("mainContainer");

  const getActorsByNames = async () => {
    const getActor = input.value;
    const response = await fetch(`http://localhost:3010/actors/${getActor}`);
    const data = await response.json();
    const artist = data.body.map((item, elem, arr) => {
      let p = document.createElement('p');
      p.innerText = arr[elem].first_name + arr[elem].last_name + arr[elem].birth_date;
      newDiv.appendChild(p);
    });
    console.log(data);
  };

  const input = document.createElement('input');
  input.placeholder = "Enter actor name";
  mainContainer.appendChild(input);

  const btn = document.createElement('button');
  btn.innerHTML = "Submit";
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