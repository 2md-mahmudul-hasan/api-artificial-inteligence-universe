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
  // apidata = apidata.slice(0, 6)
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
const input_examples = singleApi.input_output_examples[0].input;
const output_examples = singleApi.input_output_examples[0].output;

// if integration value is null 
const dataNotFound = {
  noINtegratin:"no integration",
}

if(singleApi.integrations===null){
  singleApi.integrations === "data not found"
}

document.getElementById('card-Body').innerHTML = `
<h5 class="card-text">${singleApi.description}</h5>
  <div class="d-flex align-items-center">
    <div> 
      <p  class="px-2 text-success"> ${singleApi.pricing[0].plan}/<br> ${singleApi.pricing[0].price}</p>
    </div>
    <div class="mx-2"> 
      <p class="px-2 text-danger"> ${singleApi.pricing[1].plan}/<br> ${singleApi.pricing[1].price}  </p>
    </div>
    <div> 
      <p class="px-2 text-warning"> ${singleApi.pricing[2].plan}/ <br> ${singleApi.pricing[2].price}  </p>
    </div>
  </div>
  <div class="d-flex align-items-center justify-content-around">
    <div> 
      <h6>Features</h6>
      <ul>
      <li>${singleApi.features["1"].feature_name}</li>
      <li>${singleApi.features["2"].feature_name}</li>
      <li>${singleApi.features["3"].feature_name}</li>
      </ul>
    </div>
    <div> 
      <h6>Integrations</h6>
      <li>${singleApi.integrations[0]}</li>
      <li>${singleApi.integrations[1]?singleApi.integrations[1]:dataNotFound.noINtegratin}</li>
      <li>${singleApi.integrations[2]?singleApi.integrations[2]:dataNotFound.noINtegratin}</li>
      <ul>
      </ul>
    </div>
  </div>




`
document.getElementById('modal-image').innerHTML =`<img src=${image} class="img-fluid rounded-start" alt="">
    <div class="py-4 text-center">
        <h5>${input_examples}</h5>
        <p>${output_examples.slice(0,50)}<p>
    </div>
  
`
}

//load api
aiUniverse();