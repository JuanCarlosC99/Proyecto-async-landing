const API='https://rickandmortyapi.com/api';

const content =null|| document.getElementById('content');
const main =null|| document.getElementById('main');
const mainImg =null|| document.getElementById('mainImg');
const mainName =null|| document.getElementById('name');
const mainStatus =null|| document.getElementById('status');
const mainInfo =null|| document.getElementById('info');


async function fechtData(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
}

async function aleatorio(){
    const characters =await fechtData(`${API}/character`)
    var x = Math.floor(Math.random()*characters.info.count);
    actualizarMain(x);
}


async function actualizarMain(character){
    const maincharacter= await fechtData(`${API}/character/${character}`);
    mainName.innerHTML=maincharacter.name;
    mainStatus.innerHTML=`Status: ${maincharacter.status}`;
    mainInfo.innerHTML=`
    <ol class="list-disc">
    <li>Species : ${maincharacter.species}</li>
    <li>Gender: ${maincharacter.gender}</li>
    <li>Location: ${maincharacter.location.name}</li>
    `
    ;
    mainImg.src=maincharacter.image;
}

 (async () => {
    try{
        const characters =await fechtData(`${API}/character`);
        
        aleatorio();
        let view=` 
        ${characters.results.map(character => `
        
        <div class="group relative">
        <type="submit" Onclick="actualizarMain(${character.id})">
         <div
             class="w-full  text-neutral-50 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
             <img src="${character.image}" alt="${character.name}" class="w-full">
         </div>
         <div class="mt-4 flex justify-between">
             <h3 class="text-2xl  text-neutral-50">
             <span aria-hidden="true" class="absolute inset-0"></span>
             ${character.name}
           </h3>
         </div>
         <button >
       </div>
       
        `).slice(0,5).join('')}        
       `;
       
      
       content.innerHTML=view;
    } catch (error){
        console.error(error);
    }
})();