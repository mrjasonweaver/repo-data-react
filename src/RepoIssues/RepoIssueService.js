const root = 'https://api.github.com';

export default {
  async getIssues(props, callback) {
    const { username, repo } = props;
    try {
      const response = await fetch(`${root}/repos/${username}/${repo}/issues`);
      const data = await response.json();
      const issues = data.filter(x => x.comments > 1);
      return callback(issues);
    } catch(error) {
      return console.error(error);
    }
  }
};