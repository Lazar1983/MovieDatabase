import { Renderer } from "../public/presentation-layer/actors-render.js"
import { RendererAdmin } from '../public/presentation-layer/admins-render.js';

function main() {
    const renderer = new Renderer();
    const adminRender = new RendererAdmin();

  // const getActorsByNames = async () => {
  //   const getActor = input.value;
  //   const response = await fetch(`http://localhost:3000/actors/${getActor}`);
  //   const data = await response.json();

  //   const artist = data.body.map((item, i, arr) => {
  //     let p = document.createElement('p');
  //     let p1 = document.createElement('p');
  //     let p2 = document.createElement('p');
  //     p.innerText = arr[i].first_name;
  //     p1.innerText = arr[i].last_name;
  //     p2.innerText = arr[i].birth_date;
  //     newDiv.appendChild(p);
  //     newDiv.appendChild(p1);
  //     newDiv.appendChild(p2);
  //   });
  
  //   console.log(data);
  // };


}

main();