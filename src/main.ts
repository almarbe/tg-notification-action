import * as core from '@actions/core';
import { context } from '@actions/github';
import { TelegramSender } from "./sender";
import { checkGithubProviderFormat, fromGithubToProviderNickname, stringToObject } from "./utils";

const telegramSender = new TelegramSender();

/**
 * Invoke config function, parse inputs and send message to telegram
 */
async function run(): Promise<void> {
    try {
        const botToken = core.getInput('TOKEN');
        const chatId = core.getInput('CHAT_ID');
        const msg = core.getInput('MESSAGE');
        const mentions = core.getInput('MENTIONS'); // user1, user2, ...
        const github2providerString = core.getInput('GITHUB2PROVIDER_MAP');
        const parseMod = core.getInput('PARSE_MODE');

        let to = '';

        const isGithubProvidersStringValid = github2providerString && checkGithubProviderFormat(github2providerString)

        if (isGithubProvidersStringValid) {
            const github2provider = stringToObject(github2providerString);

            if (mentions) {
                to = fromGithubToProviderNickname(mentions, github2provider);
            }
        }

        core.debug(`Sending message, payload=${JSON.stringify(context.payload)}`);

        await telegramSender.send(
            botToken,
            chatId,
            to,
            msg,
            parseMod,
        );

        core.debug('Message sent!');
    } catch (error: unknown) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()
