const root = 'https://api.github.com';

const getIssuesData = (props) => {
  // console.log("getIssuesData", props);
  const { username, repo } = props;
  fetch(`${root}/repos/${username}/${repo}/issues`)
    .then(res => res.json())
    .then(res => {
      const issues = res.filter(x => x.comments > 1);
      // console.log(issues);
      return issues;
    });
}

export {
  getIssuesData
}