// fetch data
const aiUniverse=async()=>{
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  loadAiUniverseData(data.data.tools)
}

// api data for display with card
const loadAiUniverseData=(apidata)=>{
  const aiUniverseContainer = document.getElementById('ai-universe-container');

  // slice six data
  apidata = apidata.slice(0, 6)
  apidata.forEach(api=>{
    const div = document.createElement('div');
    div.classList.add('col-md-4')
    div.innerHTML = `
                  <div class="card p-2">
                    <img class="card-img-top image-fluid" src="${api.image}" alt="Card image cap">
                    <div class="card-body">
                    <h3 class="card-title">Features</h3>
                    </div>
                    <ol type="1">
                      <li>${api.features[0]}</li>
                      <li>${api.features[1]}</li>
                      <li>${api.features[2]}</li>
                    </ol>
                    <div class=" card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5>${api.name}</h5>
                        <span> ${api.published_in} </span>
                      </div>
                
                      <button onClick="loadSingleApi('${api.id}')" type="button" class="btn modal-btn" data-bs-toggle="modal" data-bs-target="#aiModalLauncher">
                        <span  style="font-size: 1.5em; color: Tomato;">
                        <i class="fa-solid fa-arrow-right"></i>
                        </span>
                        
                      </button>
                    </div>
                  </div>
                  `
      aiUniverseContainer.appendChild(div)
  })
console.log(apidata)
}





// load single data for modal 
const loadSingleApi=async(apiId)=>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${apiId}`;
  const res = await fetch(url);
  const data = await res.json();
  singleApiData(data.data)
}

// dynamic api data for display with modal
const singleApiData=(singleApi)=>{
console.log(singleApi)
const image = singleApi.image_link[0]?singleApi.image_link[0]:singleApi.image_link[1]
console.log(image)

document.getElementById('modal-image').innerHTML =`<img src=${image} class="img-fluid rounded-start" alt="">`
}

//load api
aiUniverse();