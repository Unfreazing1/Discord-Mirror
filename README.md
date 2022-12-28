# Discord Mirror
Make your account behave like a bot and mirror messages from a server to another.\
I take no responsibility for using this bot against Discord TOS.

## Features
- **Send messages disguised as the original sender.**
- **Replace mentions from mirrored messages to match a valid mention on your server.**
- **Allow customization of status (online, invisible, idle, busy).**
- **Allow mirroring one or more messages to one or more webhooks.**
- **Optimized and lightweight.**

## Showcase
> Original message:\
![](https://i.imgur.com/ogelJ23.png)\
Mirrored message:\
![](https://i.imgur.com/C42OT64.png)

## Requirements
- [NodeJS](https://nodejs.org/en/download/) (v16.17.0 or higher)

## How to use
1. Install the requirements.
2. Enter the project folder and:
3. Run: `npm install` to install the dependencies.
4. Configure `config.json` (see below).
4. Run: `node discordMirror.js`.
5. You are now mirroring! >:)

## Configuration guide
```json
{
  "token": "INSERT_YOUR_TOKEN_HERE",
  "status": "offline",
  "mirrors": [
    {
      "channel_ids": [
        "INSERT_CHANNEL_ID_HERE"
      ],
      "webhooks_urls": [
        "INSERT_WEBHOOK_URL_HERE"
      ]
    }
  ],
  "mentions": {
    "INSERT_SERVER_ID_HERE": [
      {
        "original": "INSERT_ORIGINAL_ID_HERE",
        "replaced": "INSERT_NEW_ID_HERE"
      }
    ]
  }
}
```

`token:` is the token of the discord account that will mirror. Learn how to find your token [here](https://www.androidauthority.com/get-discord-token-3149920/).\
(Note that the token must be that of a personal discord account and not a bot).

`status:` is the status of the account that will mirror: online, offline, idle or dnd. (Note that you must not be logged in the account while the bot starts for this option to take place).

`mirrors:`
- `channel_ids:` list of channel IDs where when a message is sent, it is mirrored. (you can get the ID of a channel by enabling the **Developer mode** in your discord settings and **Right-Click** -> **Copy ID** on a channel).
- `webhooks_urls`: list of webhooks URLs where the mirrored message is sent. (you can create a webhook for a channel in your discord server with **Right-Click** -> **Integrations** -> **Create webhook**).

`mentions:`
- `"INSERT_SERVER_ID_HERE":` ID of the server where the mention must be replaced. 
  - `original:` ID of the role/channel in the original server.
  - `replaced:` ID of the role/channel in the destination server.

### An example:
```json
{
  "token": "rMQ3QFqk9sJVqpmQ2ZEe95JKscSOg9hAT5UBRps13rODuIUSeg",
  "status": "offline",
  "mirrors": [
    {
      "channel_ids": [
        "937789483387898821"
      ],
      "webhooks_urls": [
        "https://discord.com/api/webhooks/1262444920615UrWvVK6yEDjPYw3u3xEe"
      ]
    }
  ],
  "mentions": {
    "238572387938571039": [
      {
        "original": "712972387912041481",
        "replaced": "533971387929810147"
      }
    ]
  }
}
```
Explaination of the configuration above:
- When the bot starts it will set its status to offline (invisible).
- When a message is sent in the channel with ID: `937789483387898821`, it will be mirrored to the channel having the webhook: `https://discord.com/api/webhooks/1262444920615UrWvVK6yEDjPYw3u3xEe`.
- If the message is mirrored in the server with ID: `238572387938571039` and contains a mention to a role/channel with ID: `712972387912041481`, the mention will be replaced with a mention of the role/channel with ID: `533971387929810147`.