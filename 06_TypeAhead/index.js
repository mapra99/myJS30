const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

const findMatches = (wordToMatch) => {
  const regex = new RegExp(wordToMatch, 'gi');
  return cities.filter((place) => place.city.match(regex) || place.state.match(regex));
};

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const displayMatches = (e) => {
  const matchArray = findMatches(e.target.value);
  const html = matchArray.map((place) => `
    <li>
      <span class="name">${place.city}, ${place.state}</span>
      <span class="population">${place.population}</span>
    </li>
    `).join('');
  suggestions.innerHTML = html;
};

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
