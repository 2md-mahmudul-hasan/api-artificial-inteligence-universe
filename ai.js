//spinner loader 
const spinnerLoader = (isLoading)=>{
  if(isLoading){
    document.getElementById('spinner-area').classList.remove('d-none')
   }else{
    document.getElementById('spinner-area').classList.add('d-none')
  }
}

// fetch data
const aiUniverse=async()=>{
  spinnerLoader(true)
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  loadAiUniverseData(data.data.tools)
}


// api data for display with card
const loadAiUniverseData=(apidata)=>{
  const aiUniverseContainer = document.getElementById('ai-universe-container');
  // sorting:
   document.getElementById('short-data').addEventListener('click', function(){
    const arr1 = apidata.map(obj => {
      return {...obj, published_in: new Date(obj.published_in)};
    });
    arr1.sort(
      (objA, objB) => new Date(objA.published_in.getTime()) - Number(objB.published_in.getTime()),
    );
   })
 

  

  // apidata =apidata.slice(0, 6)
//display cards
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
  spinnerLoader(false)
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
const input_examples = singleApi.input_output_examples?singleApi.input_output_examples[0].input:"not found";
//const input_examples = singleApi.input_output_examples[0].input;
//const output_examples = singleApi.input_output_examples[0].output;
const output_examples = singleApi.input_output_examples?singleApi.input_output_examples[0].output:"not found";
const accuracy = singleApi.accuracy.score?singleApi.accuracy.score:("accuracy not found");



// if integration value is null 
const dataNotFound = {
  noINtegratin:"no integration",
}

document.getElementById('card-Body').innerHTML = `
<h5 class="card-text">${singleApi.description}</h5>
  <div class="d-flex align-items-center">
    <div> 
      <p  class="px-2 text-success"> ${singleApi.pricing?singleApi.pricing[0].plan:'not found'}/<br> ${singleApi.pricing?singleApi.pricing[0].price:"no found"}</p>
    </div>
    <div class="mx-2"> 
      <p class="px-2 text-danger"> ${singleApi.pricing?singleApi.pricing[1].plan:"not found"}/<br> ${singleApi.pricing?singleApi.pricing[1].price:'not found'}  </p>
    </div>
    <div> 
      <p class="px-2 text-warning"> ${singleApi.pricing?singleApi.pricing[2].plan:"not found"}/ <br> ${singleApi.pricing?singleApi.pricing[2].price:"not found"}  </p>
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
      <li>${singleApi.integrations?singleApi.integrations[0]:dataNotFound.noINtegratin}</li>
      <li>${singleApi.integrations?singleApi.integrations[1]:dataNotFound.noINtegratin}</li>
      <li>${singleApi.integrations?singleApi.integrations[2]:dataNotFound.noINtegratin}</li>
      <ul>
      </ul>
    </div>
  </div>

`
document.getElementById('modal-image').innerHTML =
  `<img src=${image} class="img-fluid rounded-start" alt="">
  <p class="accuracy">${accuracy*100?accuracy*100 +'%accuracy':"accuracy not found"}</p>
  <div class="py-4 text-center">
        <h5>${input_examples}</h5>
        <p>${output_examples}<p>
    </div>
  
`
}

// date
const shortFunction=()=>{

}

//load api
aiUniverse();