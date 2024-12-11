declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      DATABASE_URL: string;
      // Add more variables as needed
      MONGO_URI: string;
    }
  }
}

export {}; // Prevent issues with automatic merging
