Smart Telegram Action

Can:
- Send message to chat
- Allow map specific nicknames to telegram's

Variables:
- TOKEN: bot token
- CHAT_ID: specific chat id (see, GET https://api.telegram.org/bot<token>/getUpdates)
- MESSAGE: text payload
- MENTIONS: comma-sep list for example github reviewer nicknames
- GITHUB2PROVIDER_MAP: list with mapped telegram nicknames, for example nicknamegh:nicknametg,nickgh:nicktg
