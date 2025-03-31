

https://github.com/user-attachments/assets/6f9e7a57-dcf6-49f7-aa9b-b0753c6ba068

Dependencies: 
- React (react, react-dom): Used for building the user interface of the application.
- Express: A lightweight Node.js framework for building the backend server and API proxy.
- Axios: A promise-based HTTP client for making API requests.
- dotenv: For managing environment variables securely.
- CORS: Middleware to handle Cross-Origin Resource Sharing in the backend.
- React Transition Group: For adding animations and transitions to React components.

DevDependencies:
- Babel (@babel/core, @babel/preset-env, @babel/preset-react): Used for transpiling modern JavaScript and React code.
- Jest: A testing framework for running unit tests.
- React Testing Library (@testing-library/react, @testing-library/jest-dom, @testing-library/user-event): For testing React components.
- jest-fetch-mock: For mocking fetch requests in tests.
- jsdom: A JavaScript implementation of the DOM for testing purposes.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000] to view it in your browser.

...

### `npm test`

Launches the test runner in the interactive watch mode.\

...

## API Integration

### Search Suggestion API

Endpoint: [https://api.freshop.com/1/product_search_suggestions](https://api.freshop.com/1/product_search_suggestions)

Parameters:

- app_key: Identifies the application.
- department_id: Filters suggestions by department.
- q: The query term entered by the user.
- store_id: Identifies the specific store.
- token: Authentication token.

Expected Response: A list of search terms and variants based on the query. Example: For "bana", it suggests "bananas", "concord banana", etc.

Optional Parameters: department_id may be optional, depending on whether we want to filter suggestions by department.

### Search API

Endpoint: [https://api.freshop.com/1/products](https://api.freshop.com/1/products)

Parameters:

- app_key, store_id, token: Similar to the Search Suggestion API.
- fields: Specifies the product details to be returned (e.g., id, name, price, etc.).
- q: The search query term.
- limit, sort, relevance_sort: Control the number of results and sorting.

Expected Response: Detailed information about products matching the query.

Optional Parameters: Many parameters like relevance_sort, render_id are likely optional.

## Implementation Details

- **Search Input & Button:** Implement a search input field with a submit button. When a user types a query and clicks the submit button, trigger the Search API.

- **Autocomplete Feature:** As the user types in the search input, dynamically fetch suggestions from the Search Suggestion API. Display these suggestions in a dropdown menu below the input field. Implement a debounce mechanism to limit API calls while typing.





- **Handling API Responses:**

  - For autocomplete, parse the q and variants arrays from the response and display them.
  - For product search, handle the more complex structure, extracting relevant details like id, name, price, cover_image, etc., to display to the user.

- **Error Handling:** Implement error handling for cases where the API does not return data or encounters an error.

- **UI Considerations:** Ensure a responsive and user-friendly interface. Consider how the search results and suggestions are displayed on different screen sizes.
