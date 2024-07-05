# Fine-Grained Bot Protection Demo
This project demonstrates an effective way to handle bots in your application using fine-grained authorization.

By integrating Permit.io and Arcjet, this application showcases how to serve different types of data to various bots and human users, ensuring optimal readiness for GenAI and other bots.

Read more about it in the following blog post: [TBD - Add the link to the blog post](#)

## Prerequisites
- Node.js
- npm
- Arcjet Security API Key
- Permit.io API Key
- Docker

## Installation
1. Clone the repository
2. Install dependencies
    ```bash
    npm install
    ```
3. Copy the .env.template file to .env and update the values
    ```bash
    cp .env.template .env
    ```
4. Follow the instructions in the following blog post to set your application policy in Permit.io
[TBD - Add the link to the blog post](#)
5. Run the Permit PDP using your Permit.io API Key
    ```bash
    docker run -p 7766:7000 --env PDP_API_KEY=<YOUR_PERMIT_API_KEY> --env PDP_DEBUG=true permitio/pdp-v2:latest
    ```
5. Start the application
    ```bash
    npm run dev
    ```

## Usage
1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000). As you can see, you are able to access Public, Shared, and Private items.
2. Try to call the API using curl
    ```bash
    curl http://localhost:3000
    ```
    You will get only Public items
