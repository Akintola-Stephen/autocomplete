# Flashpoint Coding Challenge

This test is designed to challenge your abilities as a software engineer. The questions test various skills and are of various difficulty levels.

In a `README.md` file in the top level directory of your code submission, be sure to include:

- your written answers to the questions below
- a brief overview of your `Coding Exercise` submission e.g. what decisions you made and why, what you would do differently if you had more time, etc.
- instructions for setting up and running your `Coding Exercise` submission

In your final submission, please do not include your `node_modules` directory.

Please complete each of these challenges to the best of your ability within the next 48 hours. If you need more time please email us to let us know what’s up. If you can’t complete an exercise, do not assume it disqualifies you - submit what you were able to accomplish and your thought process in your README.

## Javascript

### 1. Does Javascript pass parameters by value or by reference?

Explain your answer in 1-2 sentences.

### 2. What is logged by the following code and why?

	const arr = [10, 12, 15, 21];
	for (var i = 0; i < arr.length; i++) {
	  setTimeout(function() {
	    console.log('Index: ' + i + ', element: ' + arr[i]);
	  }, 3000);
	}

### 3. How would you compare two objects in JavaScript?

Explain your answer and/or give an example implementation.

### 4. Implement a recursive fibonacci function

Save calculation time with a cache.

## React

### 1. List the phases of the React component lifecycle

Describe each phase in 1-2 sentences in your own words.

### 2. What is the role of the reducer in Redux?

### 3. Show how you would embed 2+ components into one in React

## Coding Exercise

Create a web front end to the [Reddit API](https://www.reddit.com/dev/api/) with the features listed below. Adhere to best practices for your code submission.

In case of the Reddit API being unavilable please use the api provided by [Pushshift.IO](https://pushshift.io/api-parameters)

### Features:

### Topic List

Using the following topic list:

> Architecture, Art, Business, Education, Entertainment, Gaming, General, Hobbies and Interests, Law, Lifestyle, Locations, Meta, Music, News and Politics, Science, Social Science and Humanities, Sports, Technology, Travel, Other

- list the top topics by points
- limit the initial topic list to 10 topics and use pagination to view the rest
- give the user the ability to view all topics at once, if they choose

Add a text field to input a topic; it should:

- autocomplete using the topic list above
- allow users to search a custom topic

### Subreddit List

On search/selection of a topic, show:

- the top subreddits for that topic sorted by points (upvotes minus downvotes)

### Subreddit View

On selection of a subreddit, show subreddit details including:

- subscriber count
- last active date
- ranking
- a preview of the subreddits front page

### Bonus: Setup a running demo

Setup a running demonstration of your app. Consider containerizing your application (Docker, etc). Use your preferred hosting provider (Heroku, Google Cloud, AWS, etc).
