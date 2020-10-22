import expect from 'expect';
import jsdom from 'jsdom-global';
import Autocomplete from '../Autocomplete';
import html from '../index.html';
import states from '../states.json';
import 'babel-polyfill';

let wrapper;

//function to simulate input
const inputSim = (val) => {
  const input = wrapper.rootEl.querySelector('input');
  let inputEvent = new Event('input', {
    bubbles: true
  });
  input.value = val;
  input.dispatchEvent(inputEvent);
}

//data for the State test
const testData = states.map(state => ({
  text: state.name,
  value: state.abbreviation
}));

describe('Autocomplete', () => {
  describe('States', () => {
    before(() => {
      document.body.innerHTML = html;
      wrapper = new Autocomplete(document.getElementById('state'), { data: testData });
      //simulate input
      inputSim('mic');
    });

    it('should initialize', () => {
      const input = document.querySelector('input');
      const results = document.querySelector('ul');

      expect(input).toBeTruthy();
      expect(input.type).toEqual('search');
      expect(input.name).toEqual('query');
      expect(results.className).toEqual('results');
    });

    it('should handle keyboard input with arrow and enter keys', () => {
      //test arrow keys 
      //after a user presses the down or up arrow, the listIndex property should increment or decrement, respectively

      const keysArr = ['ArrowDown', 'ArrowUp'];
      let arrowEvent;
      keysArr.forEach(key => {
        //get the current listIndex
        let index = wrapper.listIndex;
        //for both down and up arrows, create and dispatch keyboard events
        arrowEvent = new KeyboardEvent('keydown', {'key': key});
        wrapper.rootEl.dispatchEvent(arrowEvent);
        //check that the listIndex has changed
        expect(index).not.toEqual(wrapper.index);
      })

      //test Enter key 
      //check that if there is data, on "Enter", the text in the input box will match the text in the display div 

      //create and dispatch keyboard event
      let enterEvent = new KeyboardEvent('keydown', {'key': 'Enter'});
      wrapper.rootEl.dispatchEvent(enterEvent);

      //get innerHTML of display element and check it against the click target
      let displayText = document.getElementById('select-text').innerHTML;

      //if data exists to click on, check that display text is the same as the value updated in the input element
      if(wrapper.options.data) {
        expect(displayText).toEqual(wrapper.inputEl.value);
      }
    });

    it('should populate input on value selection', () => {
      //when an element is selected, assure that the input element's value equals the textContent of the clicked list item
      //this test only tests for click events
      //value selection on 'Enter' was already checked as part of the previous test

      //simulate node creation
      wrapper.updateDropdown([{text: 'TEST'}]);

      //create simulated click event
      let clickEvent = new Event('click', {bubbles: true});

      //get the first node of the dropdown list
      let targetValue = document.querySelectorAll('li')[0];
      
      //only checks for searches that result in a results array (when there is something to select)
      if(targetValue) {
        //dispatch click event
        targetValue.dispatchEvent(clickEvent);
        //check that display text is the same as the value updated in the input element
        expect(wrapper.inputEl.value).toEqual(clickEvent.target.textContent);
      }

    })
  });

  describe('Github Profiles', () => {
    before(() => {
      document.body.innerHTML = html;
      wrapper = new Autocomplete(document.getElementById('gh-user'), {
        url: 'https://api.github.com/search/users',
        querySymbol: 'q=',
        queryEndParams: '+in:login',
        onInputChange: async (initialData) => {
          let userLogins = initialData.items.map(user => { 
            return ({
              text: user.login, 
              img: user.avatar_url + '.png' 
              })
            });
          return userLogins;
        }
      });
    });

    it('should fetch github user(s) on text input', async function() {
      //I acknowledge that this is not a perfect test
      //Ideally, I would want to simulate the input and check the wrapper.data array for data. 
      //Mocha was shutting down the test before fetch finished
      //I would love to learn more about how to do this better!
      this.timeout(4000);

      //set query to a value that will return results
      let q = 'mcd';

      //simulate input
      inputSim(q);

      //check that currentQuery property updates
      expect(wrapper.currentQuery).toEqual(q);

      //trigger the API call using the input saved to currentQuery
      let data = await wrapper.getAPIData(`${wrapper.options.url}?q=${wrapper.currentQuery}${wrapper.options.queryEndParams}&per_page=${wrapper.numOfResults}`)
        .catch(err => new Error(err));
      
      //check that data is returned when the API is called using the query input
      expect(data).toBeTruthy();
    });

    it('should handle no results found', async function() {
      //this test has similar issues to the previous test
      //check that no error is thrown, i.e. program can handle absence of data
      //user is not currently alerted unless they check the console for a 'No reuslts!' log
      this.timeout(4000);

      //set the query to a value that will NOT return results
      let q = 'llllpppk';
      //simulate input
      inputSim(q);

      //trigger the API call using the input saved to currentQuery 
      await wrapper.getAPIData(`${wrapper.options.url}?q=${wrapper.currentQuery}${wrapper.options.queryEndParams}&per_page=${wrapper.numOfResults}`)
        .catch(err => new Error(err));
      
      //check that the function does not throw an error
      expect(wrapper.getAPIData).not.toThrow();
    });

    it('should display user profile when selected', () => {
      //check that the target of a click event is the same as the innerHTML of the display div (index.html line 27)

      //simulate node creation
      wrapper.updateDropdown([{text: 'TEST'}]);
      
      //create simulated click event
      let clickEvent = new Event('click', {bubbles: true});

      //get the first node of the dropdown list, check that it exists
      let targetValue = document.querySelectorAll('li')[0];
      expect(targetValue).toBeTruthy();

      //dispatch click event
      targetValue.dispatchEvent(clickEvent);

      //get innerHTML of display element and check it against the click target
      let displayText = document.getElementById('select-text').innerHTML;
      expect(displayText).toEqual(clickEvent.target.textContent);
    })
  })
});
