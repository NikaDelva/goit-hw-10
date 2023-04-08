export function fetchCountries(name) {
    const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(URL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        })
        //.catch(err => console.log(err));

}