# Searches

This repository contains a searches service implemented using Firebase Functions. The functions are written in TypeScript with Express. The service utilizes the Yarn package manager and integrates with the Firestore database.

## Installation

To set up the project, follow the steps below:

1. Ensure you have Node.js and Yarn installed on your system.
2. Install the Firebase CLI globally by running the following command:

   ```shell
   npm install -g firebase-tools
   ```

3. Clone this repository to your local machine.
4. Navigate to the project directory.
5. Run the following command to install the dependencies:

   ```shell
   yarn install
   ```

## Usage

### Local Development

To run the service locally, perform the following steps:

1. Make sure you have completed the installation steps mentioned above.
2. In the project directory, run the following command:

   ```shell
   yarn serve
   ```

3. The service will start running on `http://127.0.0.1:5001/ateliware-tech-assessment/southamerica-east1/searches` by default.

### API Documentation

To access the documentation, use the following endpoint: ----


### Integration with Firestore

The service utilizes the Firestore database to store and retrieve search information.

## Running Tests

This project uses Jest for unit testing. To run the tests, execute the following command:

```shell
yarn test
```

## Deployment

To deploy the service to Firebase Functions, follow the deployment instructions provided by Firebase. Run the following command:

```shell
yarn deploy
```

