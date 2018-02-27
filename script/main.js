const moviesURL = 'https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json';

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
    /*Give each movie a tag: Excellent (>=8.5), Very Good (>=8), Good (<8) based on the ratings.*/
    movies.map(movie => {
        if (movie.rating >= 8.5) {
            movie['tag'] = 'Excellent';
        }
        else if (movie.rating >= 8 && movie.rating < 8.5) {
            movie['tag'] = 'Very Good';
        }
        else {
            movie['tag'] = 'Good'
        }
    });
  
    
});

