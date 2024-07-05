# Fine-Grained Bot Protection Demo
This project is a simple Node.js application that demonstrate how to protect web application from bots without blocking all the traffic. The application uses Arcjet Security's bot protection service to detect and block malicious bots and Permit.io Fine-Grained authorization service to allow or block specific requests based on the user's permissions.

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
5. Start the application
```bash
npm run dev
```

## Usage
1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
    As you can see, you are able to access Public, Shared, and Private items
2. Try to call the API using curl
    ```bash
    curl http://localhost:3000/api/private
    ```
    You will get only Public items
