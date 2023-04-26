//Check out the open tv maze api: http://www.tvmaze.com/api

// We fetch using await:
async function apiGet(str) {
    const b = await fetch(`http://api.tvmaze.com/search/shows?q=${str}`)
    const json = await b.json()
    console.log(json)
    if(json.length > 0)
    {
        showSeries(json);
        document.querySelector("header").innerHTML =" "
    }
    else
    {
        document.querySelector("main").innerHTML = " ";
        document.querySelector("header").innerHTML ="<h1>No results found<h1/>"
    }
    
}

//hook up the search input field
const search = document.querySelector('#search');
const btn = document.querySelector('button');
/*search.addEventListener('change', (e) => {
    
    apiGet(e.target.value)
})*/

/*form.addEventListener('submit',e=>{
  e.preventDefault();
  checkinput();
});*/

function checkinput() {
  const result = search.value.trim();
  apiGet(result);
}
  

// now that we got data, build some html 
function showSeries(json) {
    let html = ""
    json.map(
        item => {
        
        html += `<article>`
        html += item.show.image ? `<img src="${item.show.image.medium}">`: ``
        html += `<div class="info">
                    <h2>${item.show.name}</h2>
                     <ul>`
        html += item.score ? `<li><strong>Language:</strong>`+` `+`${item.show.language}</li>` : `` ;                        
        html += item.show.network ? `<li><strong>Network:</strong>`+` `+`${item.show.network.name}</li>` : ``;
        html += item.show.network ? `<li><strong>Country:</strong>`+` `+`${item.show.network.country.name}<\li>`: ``;                         
        html += item.show.status ? `<li><strong>Status:</strong>`+` `+`${item.show.status}</li>` : ``;
        html += item.show.runtime ? `<li><strong>Runtime:</strong>`+` `+`${item.show.runtime}`+` `+`minutes`+`</li>` : ``;                         
        html += item.show.genres.length > 0 ? `<li><strong>Genre:</strong>`+` `+`${item.show.genres}<\li>` : ``;
        html += `</ul>
                </div>
            </article>`;
        }
    )

    const main = document.querySelector("main")
    main.innerHTML = html
}

