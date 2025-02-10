# CodeReview Mentor

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