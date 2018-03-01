const form = document.getElementById("search-form");
const searchField = document.getElementById("search-keyword");
const responseContainer = document.getElementById("response-container");
let searchedForText;

//Evento submit
form.addEventListener("submit", (e) =>{
  e.preventDefault();
  responseContainer.innerHTML = " ";
  searchedForText = searchField.value;
  getNews();
});

//Hacemos la petición
function getNews(){
  const xhr = new XMLHttpRequest();
  xhr.open( "GET", `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=dbc4e3e5dd66440ab826a9887bb84cd7`)
  xhr.onload = addNews;
  xhr.onerror = handleError;
  xhr.send();
}


function addNews(){
  const data = JSON.parse(this.responseText);
  const response = data.response;
  const articule = data.response.docs;
  console.log(articule);

  let notice = articule.map((element, index) =>{
    if(index <= 4){
      return element
    }
  })
  notice.forEach((element, index) =>{
    console.log(element);
    let title = element.headline.main;
    let snippet = element.snippet;
   // let img = element.multimedia[index].url;
    let link = element.web_url;


    let li = document.createElement("li");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let a = document.createElement("a");
    //let image = document.createElement("img");
    h2.innerHTML = title; 
    p.innerHTML = snippet;
    a.href = link;                     
    a.innerHTML = "Noticia completa";
   // image.src = img;    

    li.appendChild(h2);
    li.appendChild(p);
    li.appendChild(a);
    //li.appendChild(image);
    responseContainer.appendChild(li);

    // let li = `<li>${snippet}</li>`;
    // responseContainer.innerHTML = li;

  })
}

function handleError(){
  console.log("Hay un error");
}
