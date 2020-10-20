class Autocomplete {
  constructor(rootEl, options = {}) {
    Object.assign(this, { rootEl, numOfResults: 10, data: [], options });
    this.init();
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl, { className: 'results' });
    this.rootEl.appendChild(this.listEl);

    //initialize list index as a reference for arrow keys
    this.listIndex = -1;

    //timeout variable allows slight delay in api call to account for continuous typing with debounce function
    this.timeout = null;

    //added event listener for arrow keys to the root element
    this.rootEl.addEventListener('keydown', this.onKeyboardEvent);
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
    });

    //reduce the number of api calls
    inputEl.addEventListener('input', event =>
      this.debounce(() => this.onQueryChange(event.target.value)));

    return inputEl;
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result, i) => {
      const el = document.createElement('li');

      //added otherValue property so value can be accessed from the node list and not just the results array
      Object.assign(el, {
        className: 'result',
        textContent: result.text,
        imgKey: result.img,
        otherValue: result.value
      });

      // Event listener callback moved to accomodate both click and Enter events
      el.addEventListener('click', this.onSelectElement);
      fragment.appendChild(el);
    });

    this.listIndex = -1;
    return fragment;
  }

  onQueryChange(query) {
    if(!query) {
      this.updateDropdown([]);
      return;
    } 

    // Get data for the dropdown
    const parseResults = () => {
      let results = this.getResults(query, (this.options.data || this.data));
      results = results.slice(0, this.numOfResults);

      this.updateDropdown(results);
    }

    const { onInputChange, url, queryEndParams, querySymbol  } = this.options;
    if(typeof onInputChange === 'function') {
      (async () => {
        let specQuery = queryEndParams ? query + queryEndParams : query; 

        const initialData = await this.getAPIData(`${url}?${querySymbol}${specQuery}&per_page=${this.numOfResults}`).catch(err => new Error(err));
        this.data = initialData ? await onInputChange(initialData).catch(err => new Error(err)) : [];
        parseResults();
        
      })();
    } else {
      parseResults();
    }
  }

  getResults(query, data) {
    if (!query) return [];
    if(!data.length) {
      console.log('No data!')
      return [];
    }
    // Filter for matching strings
    let results = data.filter(item => item.text.toLowerCase().includes(query.toLowerCase()));

    return results;
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  getAPIData = async (endpoint) => {
  
    const results = await fetch(endpoint).catch(err => new Error("Could not get data. " + err));
    const jsonResults = await results.json().catch(err => new Error("Could not parse data. " + err));
    if(!jsonResults.length) console.log("No data found.")
    console.log(jsonResults)
    return jsonResults;
  };

  //runs for every Enter or click on a list element
  onSelectElement = (event) => {
    const { onSelect } = this.options;

    let eventNode;
    if(event.type === 'click') {
      eventNode = event.target;
    } else {
      let nodeList = this.listEl.querySelectorAll('li'); 
      eventNode = {};
      nodeList.forEach(node => { if(node.classList.value.includes('active')) {
        eventNode = node;      
      }});
    }
    this.inputEl.value = eventNode.textContent;

    this.updateDropdown([]);
    if (typeof onSelect === 'function') onSelect(eventNode);

    //set the display to show text and image, if available
    let textDisplay = document.getElementById('select-text');
    textDisplay.innerHTML = eventNode.textContent;
    
    if(eventNode.imgKey) {
      let avatar = document.getElementById('select-img');
      avatar.src = eventNode.imgKey; 
      //console.log(avatar.src);
      avatar.alt = eventNode.textContent;
    }
  }

  onKeyboardEvent = (event) => {
    let nodeList = this.listEl.querySelectorAll('li');
    let length = nodeList.length;
    switch(event.key) {
      case 'ArrowDown':
        this.listIndex = this.listIndex === length - 1 ? 0 : this.listIndex + 1;
        if(this.listIndex > -1 && this.listIndex < length) {
          nodeList[this.listIndex].classList.add('active');
          console.log(nodeList[this.listIndex]);
          if(this.listIndex !== 0) {
            nodeList[this.listIndex - 1].classList.remove('active');
          } else {
            if(length > 1) nodeList[length - 1].classList.remove('active');
          }
        }
        if(this.listIndex === length) this.listIndex = 0;
        break;
        case 'ArrowUp':
          //console.log(nodeList[this.listIndex]) 
          this.listIndex = this.listIndex === -1 ? length - 1 : this.listIndex - 1;
          if(this.listIndex < 0) this.listIndex = length - 1;
          if(this.listIndex > -1 && this.listIndex < length) {
            nodeList[this.listIndex].classList.add('active');
            if(this.listIndex !== length - 1) {
              nodeList[this.listIndex + 1].classList.remove('active');
            } else {
              nodeList[0].classList.remove('active');
            }
          }
          break;
      case "Enter":
        this.onSelectElement(event);
        break;
    }
  }
//help from: https://dev.to/otamnitram/throttling-and-debouncing-avoiding-unnecessary-api-calls-2god
  debounce(callback) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(callback, 300);
  }
};

export default Autocomplete;

