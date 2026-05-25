import { Suspense } from "react"

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/home/github-repro/github-contributions"
import { getCachedContributions } from "@/lib/get-cached-contributions"

const GITHUB_USERNAME = "hypeover"
const GITHUB_PROFILE_URL = "https://github.com/hypeover"

export default function GitHubContributionsDemo() {
  const contributions = getCachedContributions(GITHUB_USERNAME)

  return (
    <Suspense fallback={<GitHubContributionsFallback />}>
      <GitHubContributions
        contributions={contributions}
        githubProfileUrl={GITHUB_PROFILE_URL}
      />
    </Suspense>
  )
}

