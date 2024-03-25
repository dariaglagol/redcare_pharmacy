const getURL = (lang?: string) => (lang
  ? `https://api.github.com/search/repositories?q=created:2017-01-10+language:${lang}&sort=stars&order=desc`
  : 'https://api.github.com/search/repositories?q=created:2017-01-10&sort=stars&order=desc');

const getRepos = (lang?: string) => fetch(getURL(lang))
  .then((response) => response.json())
  .catch((error) => console.error(error));

export default getRepos;
