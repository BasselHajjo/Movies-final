const moviesURL = 'https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json';
const form = document.querySelector("#searchForm");
const tbodyElement = document.querySelector("#moviesList > tbody")
const table = document.querySelector("#moviesList");
const average = document.querySelector("#average")

function fetchJSONDataNew(url) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            const jsonData = JSON.parse(xhr.responseText);
            resolve(jsonData);
        });
        xhr.open('get', url);
        xhr.send();
    });
    return promise;
}
fetchJSONDataNew(moviesURL).then(movies => {
    
    const taggedMovies = tagMovies(movies);
    
    
    
    /*Add a input field, and a button to perform search. Use .filter method on arrays to filter on the titles.*/
    
    form.addEventListener('submit',(event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const formText = formData.get('searchText').toLocaleLowerCase();
        const formTag = formData.get('moviesRate');
        
        let filteredMovies = taggedMovies.filter(x => x.title.toLocaleLowerCase().includes(formText));
        
        if(formTag !== 'All'){
            filteredMovies = filteredMovies.filter(x => x.tag === formTag);
        }
        
        renderMovies(filteredMovies);
    });
    
});


function tagMovies(movies){
    /*Give each movie a tag: Excellent (>=8.5), Very Good (>=8), Good (<8) based on the ratings.*/
    const taggedMovies = movies.map(movie => {
        if (movie.rating >= 8.5) {
            movie['tag'] = 'Excellent';
        }
        else if (movie.rating >= 8 && movie.rating < 8.5) {
            movie['tag'] = 'Very Good';
        }
        else {
            movie['tag'] = 'Good'
        }
        return movie;
    });
    return taggedMovies;
}


function renderMovies(movies){
    /*Render all the movies as a list*/
    table.style.display = movies.length > 0 ? 'block' : 'none';
    average.style.display = 'block';
    
    if(movies.length === 0){
        average.innerHTML = "No Movies Found !";
    }else if(movies.length === 1){
        average.innerHTML = "One Movie Found";    
    }else{
         average.innerHTML = `${movies.length} Movies Found`;
    };
    
    tbodyElement.innerHTML = "";
    for (const movie of movies){
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td>${movie.rating}</td>
            <td>${movie.votes}</td>
            <td>${movie.tag}</td>
            `;
        tbodyElement.appendChild(tr);
    }
}











