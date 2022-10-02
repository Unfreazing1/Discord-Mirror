# Discord Mirror
Make your account behave like a bot and mirror messages from a server to another.\
I take no responsibility for using this bot against Discord TOS.

## Requirements
- [Node](https://nodejs.org/en/download/) (v16.17.0+)
- [discord.js-selfbot-v13](https://www.npmjs.com/package/discord.js-selfbot-v13)

## How to use
1. Install the requirements.
2. Configure `config.json`.
3. Inside the project folder, run: `node discordMirror` from the terminal.
4. You are now mirroring! >:)

## Configuration
`token:` is the token of the discord account that will mirror. Learn how to find your token [here](https://www.androidauthority.com/get-discord-token-3149920/).\
(Note that the token must be that of a personal discord account and not a bot).

`mirrors:` is a list of:
- `channel_ids:` list of channel ids where when a message is sent, it is mirrored. (you can get the ID of a channel by enabling the **Developer mode** in your discord settings and **Right-Click** -> **Copy ID** on a channel).
- `webhooks_urls`: list of webhooks urls where the mirrored message is sent. (you can create a webhook for a channel in your discord server with **Right-Click** -> **Integrations** -> **Create webhook**).

### An example:
```json
{
  "token": "rMQ3QFqk9sJVq8rQgLT0cB3QQzP9nhp8FpmQ2ZEe95JKscSOg9hAT5UBRps13rODuIUSeg",
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
When a message in the channel by the ID: `937789483387898821` is sent, it will be mirrored to the webhook: `https://discord.com/api/webhooks/126244492068114215/famHbkoNLIV_Y2hVYL9YTWoQE7ocpjs_9UrWvVK6yEDjPYw3u3xEe`.
