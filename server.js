'use strict';

const express = require('express');
const fs = require('fs');

run().catch(err => console.log(err));

async function run() {
  const app = express();

  app.get('/unique/id/events', async function(req, res) {
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive'
    });
    res.flushHeaders();

    // Tell the client to retry every 10 seconds if connectivity is lost
    res.write('retry: 10000\n\n');
    let count = 0;

    while (true) {
      await new Promise(resolve => setTimeout(resolve, 10));
      // Emit an SSE that contains the current 'count' as a string
      count++;
      res.write(`data: ${count}\n\n`);
    }
  });

  const port = 8000
  await app.listen(port);
  console.log(`Listening on port ${port}`);
}
