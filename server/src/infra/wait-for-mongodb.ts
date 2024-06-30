import { MongoClient } from "mongodb";

function checkMongodb() {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);

  async function tryConnect() {
    console.log("🔴 Aguardando MongoDB Aceitar Conexões...");
    try {
      await client.connect();
      console.log("🟢 MongoDB Aceitando Conexões...");
      return;
    } catch (err) {
      tryConnect();
      return;
    } finally {
      await client.close();
    }
  }

  tryConnect();
}

checkMongodb();
