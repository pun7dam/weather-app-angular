const { writeFileSync } = require('fs');
const { resolve } = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Define path to the environment.ts file
const targetPath = resolve(__dirname, './src/environments/environment.ts');

// Create environment file content
const envConfigFile = `
export const environment = {
  production: false,
  apiKey: '${process.env.apiKey}',
};
`;

// Write environment file content to environment.ts
writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });
