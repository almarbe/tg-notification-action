/**
 * Check if the github-provider-map string is in correct format
 * @param {String} str String to be checked to be in correct format
 * @return {Boolean} String validity as boolean
 */
export const checkGithubProviderFormat = (str: string) => {
  const az09 = '[A-z0-9_\\-@\\.]+';
  const pattern = new RegExp(`^${az09}:${az09}(,\\s*${az09}:${az09})*$`, 'm');
  return pattern.test(str);
};

/**
 * Convert a string like "name1:ID123,name2:ID456" to an Object { name1: "ID123", name2: "ID456"}
 * @param {String} str String to convert to Object
 * @return {Object} Object with usernames as properties and IDs as values
 */
export const stringToObject = (str: string): Record<string, string> => {
  const map: Record<string, string> = {};

  if (!str) {
    return map;
  }

  const users = str.replace(/[\s\r\n]+/g, '').split(',');

  users.forEach((user) => {
    const [github, provider] = user.split(':');
    map[github] = provider;
  });

  return map;
};

// eslint-disable-next-line valid-jsdoc
/**
 * Convert and parse github nicknames to provided
 * @param { String } pr2user String users comma separated
 * @param { Object } github2provider Record { nickname1: nickname2 }
 */
export const fromGithubToProviderNickname = (pr2user: string, github2provider: Record<string, string>) => {
  let message = '';
  const parsed = JSON.parse(pr2user);

  for (const obj of parsed) {
      const mention = github2provider[obj?.login] ?
          `@${github2provider[obj?.login]}` :
          `@${obj?.login}`;
      message += `${mention} `;
  }

  return message;
};
