const root = 'https://api.github.com';

export default {
  async getIssues(props, callback) {
    const { username, repo } = props;
    const responseObj = { issues: [], error: ''};
    try {
      const response = await fetch(`${root}/repos/${username}/${repo}/issues`);
      const data = await response.json();
      const issues = data.filter(x => x.comments > 1);
      responseObj.issues = issues;
      return callback(responseObj);
    } catch(error) {
      responseObj.error = error;
      return callback(responseObj);
    }
  }
};