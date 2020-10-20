import expect from 'expect';
import jsdom from 'jsdom-global';
import Autocomplete from '../Autocomplete';
import html from '../index.html';
import 'babel-polyfill';

let wrapper;

describe('Autocomplete', () => {
  before(() => {
    document.body.innerHTML = html;
    wrapper = new Autocomplete(document.getElementById('state'));
  });

  describe('States', () => {
    it('should initialize', () => {
      const input = document.querySelector('input');
      const results = document.querySelector('ul');

      expect(input).toBeTruthy();
      expect(input.type).toEqual('search');
      expect(input.name).toEqual('query');
      expect(results.className).toEqual('results');
    });

    it('should handle keyboard input', () => {
      const input = document.querySelector('input');
      input.value = 'mic';

      const keysArr = ['ArrowDown', 'ArrowUp'];
      let arrowEvent;
      let activeClass = document.getElementsByClassName('active')
      keysArr.forEach(key => {
        arrowEvent = new KeyboardEvent('keydown', {'key': key});
        document.dispatchEvent(arrowEvent);  
        expect(activeClass).toBeTruthy();
      })
    });

    it('should populate input on value selection', () => {
      //compare input.value to list item that has active class OR target of the click
      expect(false).toBeTruthy();
    })
  });

  describe('Github Profiles', () => {
    before(() => {
      document.body.innerHTML = html;
      wrapper = new Autocomplete(document.getElementById('state'));
    });

    it('should fetch github user(s) on text input', () => {
      //set input value
      //test that list in dropdown has results - try this.data array? or results ul
      expect(false).toBeTruthy();
    });

    it('should handle no results found', () => {
      //try adding list element that says 'results not found'
      //otherwise hard code input.value that does not return results - llllppk and see that it returns nothing
      expect(false).toBeTruthy();
    });

    it('should display user profile', () => {
      //add name below picture? check if the text input matches text on page and if there is a picture (src property?)
      expect(false).toBeTruthy();
    })
  })
});
