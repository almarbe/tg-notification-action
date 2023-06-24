Smart Telegram Action

Can:
- Send message to chat
- Allow map specific nicknames to telegram's

Variables:
- TOKEN: bot token
- CHAT_ID: specific chat id (see, GET https://api.telegram.org/bot<token>/getUpdates)
- MESSAGE: text payload
- MENTIONS: string json array like '[{"login":"WildEgor"}]'
- GITHUB2PROVIDER_MAP: github_nickname:telegram_nickname (for example: WildEgor:WILDEGOR)
