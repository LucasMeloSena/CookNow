import retry from "async-retry";
import { MigrationStatus } from "../controllers/migrations.controller";

async function waitForAllServices() {
  const fetchStatusPage = async () => {
    const url = "http://localhost:3002/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(`HTTP Error ${response.status}`);
      }
      await response.json();
    } catch (err) {
      throw err;
    }
  };

  const waitForServer = async () => {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      onRetry: (error, attempt) => {
        console.log(`Attempt ${attempt} - Failed to fetch server main endpoint: ${error.message}`);
      },
    });
  };

  await waitForServer();
}

export default {
  waitForAllServices,
};
