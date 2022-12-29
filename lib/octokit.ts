import { Octokit } from '@octokit/core'

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_KEY,
})

export default octokit
