# Solution Docs

<!-- You can include documentation, additional setup instructions, notes etc. here -->
# What has been updated?
1. The Autocomplete component is now set up to make API calls. Initial data retrieval and data parsing happens inside the class declaration, while any API-specific keys and parsing happen within an onInputChange function passed to the instance as an options property. URLs, query keys, and parameters additional to the input query are passed as properties as well. Because of rate limits on some APIs (specifically GitHub), I used a debounce function to slightly delay the request so it wouldn't call on every letter entered - it waits for a slight pause. This slightly limits the calls.

2. Arrow keys are put to use with an event listener on the root element. I initialized a property of the class called listIndex to keep track of the "active" node in the results list. When an up or down arrow is pressed, the index changes, and a new node gets the "active" class, which highlights it in the list. The class is removed from the previous node.

3. The Enter key finds the active class to determine which node to select, while the click listener determines this through its target.value. On selection, the input value updates with the selected text. The text also appears on the page in the 'select-display' div (also added by me to index.html), and an image appears below if one is available through the specific API.

4. I implemented and passed all tests initially defined. There are notes in the test file that indicate where some could be better. Testing is the area in which I have the least experience - all of this was new for me and a good learning experience. 

# APIs
1. GitHub:
    docs: https://developer.github.com/v3/search/
    This required some query parameter sleuthing. To search just the login property, you have to add +in:login. Avatars can be included by adding a '.png' to the end of the avatar_url property. There is a rate limit for unregistered API requestors: 10 per minute. This can go quickly! I added some code to slightly reduce the number of calls, but I think more can be done.
2. Breweries:
    docs: https://www.openbrewerydb.org/
    With no images, this one is a little less fun. But they do have a data set that is meant specifically for autocompletes!
3. NASA:
    docs: https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
    I implemented searchs by title, though there may be a better way considering the titles apply to image collections rather than single images. With many nested objects and arrays, this one took some parsing (see onInputChange in index.js).

# What can be better?
1. Styling:
    I was hoping to have some time to make the page look nicer but I forwent it for time to learn about testing. The only thing I did was fixed the hanging border on empty results elements!
2. Chrome and autocomplete:
    I ran into an issue where even though autocomplete was set to off on initialization, Chrome still shows some of its own autocomplete on top of mine in my states instance. I could not find a solution for this. 
3. API calls:
    In the NASA API, titles are of collections, so there are several of the same title that sometimes pop up in the search bar. This is not ideal UI!
    This program only works for open APIs that don't require keys. It would be a nice feature to include some code that allowed for API keys.
4. Tests:
    This was my first time doing unit tests, so they are not amazing. I ran into trouble when Mocha was timing out (or so I thought) when fetch was being called. I made a hacky test, but I would love to learn ways to optimize it. I tried changing the timeout which did not work, as well as many versions of asynchronous testing, but this was confusing to me when calling methods inside a class component.

# Summary

I spent quite a bit of time on this project, most of which was learning about testing. It provided an oppotunity for me to expand my skillset! 