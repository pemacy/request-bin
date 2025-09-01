const gitHubResponse = {
  "method": "POST",
  "path": 'abc123',
  "originalUrl": 'https://ebbce4a0a0c4.ngrok-free.app/abc123',
  "date": 1756391475219,
  "headers": {
    "Accept": [
      "*/*"
    ],
    "Connection": [
      "close"
    ],
    "Content-Length": [
      "8050"
    ],
    "Content-Type": [
      "application/json"
    ],
    "User-Agent": [
      "GitHub-Hookshot/bebe1c7"
    ],
    "X-Country": [
      "US"
    ],
    "X-Forwarded-For": [
      "140.82.115.113"
    ],
    "X-Github-Delivery": [
      "a6cf66f0-841b-11f0-9c26-38ca8569f1e2"
    ],
    "X-Github-Event": [
      "push"
    ],
    "X-Github-Hook-Id": [
      "566387609"
    ],
    "X-Github-Hook-Installation-Target-Id": [
      "1045869160"
    ],
    "X-Github-Hook-Installation-Target-Type": [
      "repository"
    ],
    "X-Real-Ip": [
      "140.82.115.113"
    ]
  },
  "content_length": 8050,
  "body": "{\"ref\":\"refs/heads/main\",\"before\":\"1d3fe974d5a293854d51234e126acca14ec8701c\",\"after\":\"c242b95b8ce94f7dc23749a584bdbd5637ef54a4\",\"repository\":{\"id\":1045869160,\"node_id\":\"R_kgDOPlayaA\",\"name\":\"tacklebox_test\",\"full_name\":\"pemacy/tacklebox_test\",\"private\":false,\"owner\":{\"name\":\"pemacy\",\"email\":\"preston.macy@gmail.com\",\"login\":\"pemacy\",\"id\":23424169,\"node_id\":\"MDQ6VXNlcjIzNDI0MTY5\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/23424169?v=4\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/pemacy\",\"html_url\":\"https://github.com/pemacy\",\"followers_url\":\"https://api.github.com/users/pemacy/followers\",\"following_url\":\"https://api.github.com/users/pemacy/following{/other_user}\",\"gists_url\":\"https://api.github.com/users/pemacy/gists{/gist_id}\",\"starred_url\":\"https://api.github.com/users/pemacy/starred{/owner}{/repo}\",\"subscriptions_url\":\"https://api.github.com/users/pemacy/subscriptions\",\"organizations_url\":\"https://api.github.com/users/pemacy/orgs\",\"repos_url\":\"https://api.github.com/users/pemacy/repos\",\"events_url\":\"https://api.github.com/users/pemacy/events{/privacy}\",\"received_events_url\":\"https://api.github.com/users/pemacy/received_events\",\"type\":\"User\",\"user_view_type\":\"public\",\"site_admin\":false},\"html_url\":\"https://github.com/pemacy/tacklebox_test\",\"description\":\"testing webhooks\",\"fork\":false,\"url\":\"https://api.github.com/repos/pemacy/tacklebox_test\",\"forks_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/forks\",\"keys_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/keys{/key_id}\",\"collaborators_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/collaborators{/collaborator}\",\"teams_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/teams\",\"hooks_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/hooks\",\"issue_events_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/issues/events{/number}\",\"events_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/events\",\"assignees_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/assignees{/user}\",\"branches_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/branches{/branch}\",\"tags_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/tags\",\"blobs_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/git/blobs{/sha}\",\"git_tags_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/git/tags{/sha}\",\"git_refs_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/git/refs{/sha}\",\"trees_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/git/trees{/sha}\",\"statuses_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/statuses/{sha}\",\"languages_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/languages\",\"stargazers_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/stargazers\",\"contributors_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/contributors\",\"subscribers_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/subscribers\",\"subscription_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/subscription\",\"commits_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/commits{/sha}\",\"git_commits_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/git/commits{/sha}\",\"comments_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/comments{/number}\",\"issue_comment_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/issues/comments{/number}\",\"contents_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/contents/{+path}\",\"compare_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/compare/{base}...{head}\",\"merges_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/merges\",\"archive_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/{archive_format}{/ref}\",\"downloads_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/downloads\",\"issues_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/issues{/number}\",\"pulls_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/pulls{/number}\",\"milestones_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/milestones{/number}\",\"notifications_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/notifications{?since,all,participating}\",\"labels_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/labels{/name}\",\"releases_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/releases{/id}\",\"deployments_url\":\"https://api.github.com/repos/pemacy/tacklebox_test/deployments\",\"created_at\":1756327519,\"updated_at\":\"2025-08-27T21:44:13Z\",\"pushed_at\":1756391474,\"git_url\":\"git://github.com/pemacy/tacklebox_test.git\",\"ssh_url\":\"git@github.com:pemacy/tacklebox_test.git\",\"clone_url\":\"https://github.com/pemacy/tacklebox_test.git\",\"svn_url\":\"https://github.com/pemacy/tacklebox_test\",\"homepage\":null,\"size\":1,\"stargazers_count\":0,\"watchers_count\":0,\"language\":null,\"has_issues\":true,\"has_projects\":true,\"has_downloads\":true,\"has_wiki\":true,\"has_pages\":false,\"has_discussions\":false,\"forks_count\":0,\"mirror_url\":null,\"archived\":false,\"disabled\":false,\"open_issues_count\":0,\"license\":null,\"allow_forking\":true,\"is_template\":false,\"web_commit_signoff_required\":false,\"topics\":[],\"visibility\":\"public\",\"forks\":0,\"open_issues\":0,\"watchers\":0,\"default_branch\":\"main\",\"stargazers\":0,\"master_branch\":\"main\"},\"pusher\":{\"name\":\"pemacy\",\"email\":\"preston.macy@gmail.com\"},\"sender\":{\"login\":\"pemacy\",\"id\":23424169,\"node_id\":\"MDQ6VXNlcjIzNDI0MTY5\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/23424169?v=4\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/pemacy\",\"html_url\":\"https://github.com/pemacy\",\"followers_url\":\"https://api.github.com/users/pemacy/followers\",\"following_url\":\"https://api.github.com/users/pemacy/following{/other_user}\",\"gists_url\":\"https://api.github.com/users/pemacy/gists{/gist_id}\",\"starred_url\":\"https://api.github.com/users/pemacy/starred{/owner}{/repo}\",\"subscriptions_url\":\"https://api.github.com/users/pemacy/subscriptions\",\"organizations_url\":\"https://api.github.com/users/pemacy/orgs\",\"repos_url\":\"https://api.github.com/users/pemacy/repos\",\"events_url\":\"https://api.github.com/users/pemacy/events{/privacy}\",\"received_events_url\":\"https://api.github.com/users/pemacy/received_events\",\"type\":\"User\",\"user_view_type\":\"public\",\"site_admin\":false},\"created\":false,\"deleted\":false,\"forced\":false,\"base_ref\":null,\"compare\":\"https://github.com/pemacy/tacklebox_test/compare/1d3fe974d5a2...c242b95b8ce9\",\"commits\":[{\"id\":\"d75e8ce15c1d5565a3859c3715bc96cc61b512d4\",\"tree_id\":\"63c13884072d90589cce6c5c06cc7075cb83382f\",\"distinct\":true,\"message\":\"added new line\",\"timestamp\":\"2025-08-28T10:28:32-04:00\",\"url\":\"https://github.com/pemacy/tacklebox_test/commit/d75e8ce15c1d5565a3859c3715bc96cc61b512d4\",\"author\":{\"name\":\"Preston Macy\",\"email\":\"preston.macy@gmail.com\",\"username\":\"pemacy\"},\"committer\":{\"name\":\"Preston Macy\",\"email\":\"preston.macy@gmail.com\",\"username\":\"pemacy\"},\"added\":[],\"removed\":[],\"modified\":[\"README.md\"]},{\"id\":\"c242b95b8ce94f7dc23749a584bdbd5637ef54a4\",\"tree_id\":\"d5911bcda66b40698bc3249a7ba066baddb150e2\",\"distinct\":true,\"message\":\"Merge branch 'main' of https://github.com/pemacy/tacklebox_test\",\"timestamp\":\"2025-08-28T10:31:02-04:00\",\"url\":\"https://github.com/pemacy/tacklebox_test/commit/c242b95b8ce94f7dc23749a584bdbd5637ef54a4\",\"author\":{\"name\":\"Preston Macy\",\"email\":\"preston.macy@gmail.com\",\"username\":\"pemacy\"},\"committer\":{\"name\":\"Preston Macy\",\"email\":\"preston.macy@gmail.com\",\"username\":\"pemacy\"},\"added\":[\"aj_test_commit.md\",\"sandy_test_commit.md\"],\"removed\":[],\"modified\":[]}],\"head_commit\":{\"id\":\"c242b95b8ce94f7dc23749a584bdbd5637ef54a4\",\"tree_id\":\"d5911bcda66b40698bc3249a7ba066baddb150e2\",\"distinct\":true,\"message\":\"Merge branch 'main' of https://github.com/pemacy/tacklebox_test\",\"timestamp\":\"2025-08-28T10:31:02-04:00\",\"url\":\"https://github.com/pemacy/tacklebox_test/commit/c242b95b8ce94f7dc23749a584bdbd5637ef54a4\",\"author\":{\"name\":\"Preston Macy\",\"email\":\"preston.macy@gmail.com\",\"username\":\"pemacy\"},\"committer\":{\"name\":\"Preston Macy\",\"email\":\"preston.macy@gmail.com\",\"username\":\"pemacy\"},\"added\":[\"aj_test_commit.md\",\"sandy_test_commit.md\"],\"removed\":[],\"modified\":[]}}",
  "method": "POST",
  "path": "/2fuz84p",
  "query": ""
}

export default gitHubResponse
