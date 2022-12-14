# Discord Mirror
Make your account behave like a bot and mirror messages from a server to another.\
I take no responsibility for using this bot against Discord TOS.

## Requirements
- [NodeJS](https://nodejs.org/en/download/) (v16.17.0+)

## How to use
1. Install the requirements.
2. Configure `config.json`.
3. Install the dependencies by running: `npm install` inside the project directory from the terminal.
4. Finally run: `node discordMirror.js`.
5. You are now mirroring! >:)

## Configuration guide
`token:` is the token of the discord account that will mirror. Learn how to find your token [here](https://www.androidauthority.com/get-discord-token-3149920/).\
(Note that the token must be that of a personal discord account and not a bot).

`mention_everyone`: every time a message is sent through a webhook, mention @everyone in the channel of the message.

`minutes_online`: how many minutes the bot will stay online before going offline. If you want the bot to never go offline, set this to a high value.

`minutes_offline`: how many minutes the bot will stay offline before going back online (these two options are used to bypass discord anti-bots).

`mirrors:` is a list of:
- `channel_ids:` list of channel ids where when a message is sent, it is mirrored. (you can get the ID of a channel by enabling the **Developer mode** in your discord settings and **Right-Click** -> **Copy ID** on a channel).
- `webhooks_urls`: list of webhooks urls where the mirrored message is sent. (you can create a webhook for a channel in your discord server with **Right-Click** -> **Integrations** -> **Create webhook**).

### An example:
```json
{
  "token": "rMQ3QFqk9sJVq8rQgLT0cB3QQzP9nhp8FpmQ2ZEe95JKscSOg9hAT5UBRps13rODuIUSeg",
  "mention_everyone": true,
  "minutes_online": 120,
  "minutes_offline": 5,
  "mirrors": [
    {
      "channel_ids": [
        "937789483387898821"
      ],
      "webhooks_urls": [
        "https://discord.com/api/webhooks/126244492068114215/famHbkoNLIV_Y2hVYL9YTWoQE7ocpjs_9UrWvVK6yEDjPYw3u3xEe"
      ]
    }
  ]
}
```
Explaination of the config.json above:
- When a message in the channel by the ID: `937789483387898821` is sent, it will be mirrored to the webhook: `https://discord.com/api/webhooks/126244492068114215/famHbkoNLIV_Y2hVYL9YTWoQE7ocpjs_9UrWvVK6yEDjPYw3u3xEe`.
- Upon mirroring a message, **@everyone** is mentioned in the channel of the webhook.
- Every 2 hours the bot will go offline for 5 minutes before going back online.