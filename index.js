import "regenerator-runtime/runtime.js";
import Autocomplete from './Autocomplete';
import states from './states';
import './main.css';

// US States
const data = states.map(state => ({
  text: state.name,
  value: state.abbreviation
}));

new Autocomplete(document.getElementById('state'), {
  data: data,
  onSelect: (state) => {
    console.log('selected state:', state.otherValue);
  },
});

//GitHub Users
new Autocomplete(document.getElementById('gh-user'), {
  url: 'https://api.github.com/search/users',
  querySymbol: 'q=',
  queryEndParams: '+in:login', //specific to GitHub's API - search just login property
  onInputChange: async (initialData) => {
    let userLogins = initialData.items.map(user => { 
      return ({
        text: user.login, 
        img: user.avatar_url + '.png' 
        })
      });
    return userLogins;
  },
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
});

//Breweries
new Autocomplete(document.getElementById('brewery'), {
  url: 'https://api.openbrewerydb.org/breweries/search',
  querySymbol: 'query=',
  onInputChange: async (initialData) => {
    let breweries = initialData.map(brew => ({ text: brew.name}));   
    return breweries;
  },
  onSelect: (brewery) => {
    console.log('selected brewery name: ', brewery);
  },
});

// //Composers
// new Autocomplete(document.getElementById('brewery'), {
//   url: 'http://api.openopus.org/composer/list/search',
//   querySymbol: '',
//   queryEndParams: '.json',
//   onInputChange: async (initialData) => {
//     let breweries = initialData.map(brew => ({ text: brew.name}));   
//     return breweries;
//   },
//   onSelect: (brewery) => {
//     console.log('selected brewery name: ', brewery);
//   },
// });


// https://itunes.apple.com/search?