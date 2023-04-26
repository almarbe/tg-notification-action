import axios, {AxiosError} from "axios";

export class TelegramSender {

    private readonly _baseUrl: string = 'https://api.telegram.org';
    private readonly _defaultParseMode = 'Markdown';

    public async send(
        token: string,
        chatId: string,
        to: string,
        text: string,
        parseMode?: string,
    ): Promise<boolean> {
        const uri = `${this._baseUrl}/bot${token}/sendMessage`;

        try {
            const requestBody = {
                text: `
                    ${to}
                    ${text}
                `,
                chat_id: chatId,
                parse_mode: this._defaultParseMode,
            }

            if (parseMode) {
                requestBody.parse_mode = parseMode;
            }

            if (parseMode === 'HTML') {
                requestBody.text = `
                    <div><p>${to}</p></div>
                    <div>${text}</div>
                `
            }

            await axios.post(uri, {
                ...requestBody,
            })

            return true;
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.error(e.toJSON());
            } else if (e instanceof Error) {
                console.error(e.message)
            }
        }

        return false;
    }
}
