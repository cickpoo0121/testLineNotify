'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'uSGP9ZDQSDOE9Jt/jz94ukP/XgfKO5flZqs4H6cqrQ8ZZtgLLCqfJSL0PF0oy3u6alKJpK1ZnqdWQt1cztywFxmfvUUlwnlALgI0wNC7yDWBsRxqo4H3XrpXzZS3BII6ZH9mP8zX6FsVhTVSBgYGZwdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'cff01a8fdd4da3b525058ba8b663de6c',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// ========= /callback ==========
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  console.log(req.body);
  console.log(req.body.events[0].source);
  console.log(req.body.events[0].message);
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// ========= /handeEvent function ==========

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// ========= /other route ==========

app.get('/', (req, res) => {
  // res.status(404).send('Oops, page is not found');
  console.log('error')
  res.send('404');
})

app.get('https://api.line.me/v2/bot/followers/ids', (req, res) => {
  // res.status(404).send('Oops, page is not found');
  console.log('error')
  res.send('404');
})



// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
