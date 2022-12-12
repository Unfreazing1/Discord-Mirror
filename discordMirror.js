const { Client, WebhookClient, MessageFlags } = require('discord.js-selfbot-v13');
const config = require('./config.json');

/*
* Return the token portion from a webhook url.
* URL: https://discord.com/api/webhooks/123/abcdef
*                                              ↳ TOKEN
*/
function parseWebhookToken(webhookUrl) {
  const index = webhookUrl.lastIndexOf('/');

  if (index == -1) {
    throw 'Invalid Webhook URL';
  }

  return webhookUrl.substring(index + 1, webhookUrl.length);
}

/*
* Return the id portion from a webhook url.
* URL: https://discord.com/api/webhooks/123/abcdef
*                                        ↳ ID
*/
function parseWebhookId(webhookUrl) {
  const indexEnd = webhookUrl.lastIndexOf('/');

  if (indexEnd == -1) {
    throw 'Invalid Webhook URL';
  }

  const indexStart = webhookUrl.lastIndexOf('/', indexEnd - 1);

  if (indexStart == -1) {
    throw 'Invalid Webhook URL';
  }

  return webhookUrl.substring(indexStart + 1, indexEnd);
}

/*
* Key = Channel id where when a message is sent, it is replicated to the webhooks.
* Value = Array of webhooks where the message is replicated.
*/
const channelWebhookMapping = {};

function loadConfigValues() {
  for (const mirror of config['mirrors']) {
    const webhooks = [];
  
    for (const webhookUrl of mirror['webhooks_urls']) {
      webhooks.push(new WebhookClient({
        token: parseWebhookToken(webhookUrl),
        id: parseWebhookId(webhookUrl)
      }));
    }
  
    for (const channelId of mirror['channel_ids']) {
      channelWebhookMapping[channelId] = webhooks;
    }
  }
}

loadConfigValues();

function bindClientEvents(client) {
  client.on('ready', async () => {
    console.log(`${client.user.username} is now mirroring >:)! (will stay online for ${config['minutes_online']} minutes.`);
  });
  
  client.on('messageCreate', async (message) => {
    // Skip empty messages.
    if (!message.content.length && !message.embeds.length && !message.attachments.length) {
      return;
    }
  
    // Skip 'Only you can see this' messages.
    if (message.flags & MessageFlags.Ephemeral) {
      return;
    }
  
    // Optionally mention everyone when a message from a webhook is sent.
    if (config['mention_everyone'] && message.webhookId) {
      message.channel.send('@everyone');
    }
    
    const webhooks = channelWebhookMapping[message.channelId];
    
    if (!webhooks) {
      return;
    }
  
    // Prevent 'Message content must be a non-empty string' with embeds.
    let content = message.content.length ? message.content : ' ';
    
    // Prevent 'MessageEmbed field values must be non-empty strings'.
    const emptyChar = '᲼';
  
    for (const embed of message.embeds) {
      for (const field of embed.fields) {
        if (!field.name.length) {
          field.name = emptyChar;
        }
        if (!field.value.length) {
          field.value = emptyChar;
        }
      }
    }
  
    for (const attachment of message.attachments) {
      content += '\n' + attachment[1].url;
    }
  
    for (const webhook of webhooks) {
      webhook.send({
        content: content,
        username: message.author.username,
        avatarURL: message.author.avatarURL(),
        embeds: message.embeds
      }).catch(console.error);
    }
  });
}

/*
* Switch between online and offline to bypass discord anti-bots.
*/
function doLifeCycle() {
  const msOnline = Math.max(2147483647, config['minutes_online'] * 60000);
  const msOffline = Math.max(2147483647, config['minutes_offline'] * 60000);

  const client = new Client({ checkUpdate: false });
  bindClientEvents(client);
  client.login(config['token']);

  setTimeout(() => {
    client.destroy();
    console.log(`${client.user.username} is no longer mirroring (will stay offline for ${config['minutes_offline']} minutes).`);
  
    setTimeout(() => {
      doLifeCycle();
    }, msOffline);

  }, msOnline);
}

doLifeCycle();