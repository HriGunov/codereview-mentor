# CodeReview Mentor

## Vercel 
Link: https://codereview-mentor-6833.vercel.app/

DISCLAIMER:
Usage is not recommended. 
The project uses SQLite (a local DB) as a Database, at the same time Vercel is serverless which means that we have no guarantee that the operations will be happing on the same server instance. This will result trying to read records that don't exists on specific instances and writing to a server that is going to be shutdown.


## How to run the app

### Locally 

#### 1. Checkout the repo

#### 2. Create a .env file
Create a `.env` file. Use `.env.example` as a reference

#### 3. Initialize the App

Install Dependencies
```bash
npm install
```  

Generate Sqlite DB  
```bash
npm run db:generate
```  

Start the App

```bash
npm run dev
```  

You should be able to access the application on http://localhost:3000/


### Using Docker
There is no publicly available Docker image for the app so you going to have build it yourself.

#### 1. Checkout the repo

#### 2. Setup environment variables
Create a `.env` file. Use `.env.example` as a reference

#### 3. Create the image

```bash
docker build -t codereview-mentor .
```

#### 4. Run the Docker Container
```bash
docker run -p 3000:3000 codereview-mentor
```

You should be able to access the application on http://localhost:3000/


## Key Decisions

### Why I used create-t3-app
create-t3-app perfectly matched the required technologies.
While at the same time being a widely used and well maintained.
When starting a JS project making all the frameworks and tools work together can be quite time consuming, so it was a no-brainer.

## State Management
Decided not to add another dependency. The app does not have too much state, requiring a complex solutions.
React Context with React/Tan Query (part of tRPC) was more than enough.

## Why I Used Next Action for streaming generated responses instead of a tRPC endpoint
When steaming a response through tRPC the UI would receive an incomplete/malformed JSON object as a string. The object could be consumed by writing a parser but I don't think that is the goal of making this app.

When using NextJS Actions you can use createStreamableValue and readStreamableValue which directly give you an object which you can immediately be used.

## Know limitations / Issues

- Feedback area readability can be improved.

- Did not have time to implement feedback for Error states when submitting (Zod validation failing, OpenAI like failing respond, token errors, credits, etc.. )

- Some of the components have become too big, parts of them can be extracted in to smaller components or hooks

- Model used is gpt-4o so the feedback can be improve by changing it

- There are no test 