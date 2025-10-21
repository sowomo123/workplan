# Local Review

You are tasked with setting up a local review environment for a colleague's branch. This involves creating a worktree, setting up dependencies, and launching a new Claude Code session.

## Process

When invoked with a parameter like `gh_username:branchName`:

1. **Parse the input**:
   - Extract GitHub username and branch name from the format `username:branchname`
   - If no parameter provided, ask for it in the format: `gh_username:branchName`

2. **Extract ticket information**:
   - Look for ticket numbers in the branch name (e.g., `quiz-1696`, `TICKET-1696`)
   - Use this to create a short worktree directory name
   - If no ticket found, use a sanitized version of the branch name

3. **Set up the remote and branch**:
   - Check if the remote already exists using `git remote -v`
   - If not, add it: `git remote add USERNAME git@github.com:USERNAME/[repository-name]`
   - Fetch from the remote: `git fetch USERNAME`
   - Create and checkout branch: `git checkout -b BRANCHNAME USERNAME/BRANCHNAME`

4. **Configure the environment**:
   - Ensure all dependencies are installed
   - Run any necessary setup commands for the project
   - Verify the branch is ready for review

## Error Handling

- If branch already exists locally, inform the user they need to remove it first
- If remote fetch fails, check if the username/repo exists
- If setup fails, provide the error but continue

## Example Usage

```
/local_review username:feature/quiz-1696-new-feature
```

This will:
- Add 'username' as a remote
- Create and checkout the branch locally
- Set up the environment
