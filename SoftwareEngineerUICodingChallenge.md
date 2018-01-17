# Flashpoint Coding Challenge
This test is designed to challenge your abilities as a software engineer. The questions test various skills and are of various difficulty levels. Please complete each of these challenges to the best of your ability within the next 48 hours. 

If you need more time please email us to let us know what’s up. If you can’t complete an exercise, do not assume it disqualifies you - please submit what you were able to accomplish and your thought process. 

## Javascript

### JavaScript parameter passing
Does Javascript pass parameters by value or by reference?

### what is the result of the following code?
	const arr = [10, 12, 15, 21];
	for (var i = 0; i < arr.length; i++) {
	  setTimeout(function() {
	    console.log('Index: ' + i + ', element: ' + arr[i]);
	  }, 3000);
	}
	
### Compare two objects in JavaScript?
How would you compare two objects in JavaScript?

###  Implement a recursive fibonacci function. 
Implement the fibonacci function. Save calculation time with a cache.

## React 

### React component lifecycle.
List the phases of the React component lifecycle.

### Redux
Explain the role of the Reducer.

### Embedded Components
Embed two or more components into one.

## Exercise
Create a front-end to the [reddit api](https://www.reddit.com/dev/api/). Adhere to best-practices for your code submission. 

### Features:

#### *Topic list*. 

List of relevant subreddits.

Using the following topic list

> Architecture, Art, Business, Education, Entertainment, Gaming, General, Hobbies and Interests, Law, Lifestyle, Locations, Meta, Music, News and Politics, Science, Social Science and Humanities, Sports, Technology, Travel, Other

List top topics by points. Subreddits for a given topic sorted by points (upvotes minus downvotes). Limit the topic list to 20 and paginate results.

#### *subreddit list*

On selection of a topic list the subreddits within. Allow selection of 'all topics' to display all topics.

#### *subreddit view*
On selection of a subreddit display the subreddit details. Include subscriber count, Last active (date), and ranking.

Below the details show a preview of the subreddits front page.

#### Add topic
Add a text field to input a topic. Either select a topic from the topic list (auto-complete).

Search for topic. 
Using the same text field search for subreddits by entered topic. List the results of the search on the topic list page.

### Bonus: Setup a running demo
Setup a running demonstration of the app. Using docker container or your preferred hosting provider (Heroku, google cloud, AWS, etc).


