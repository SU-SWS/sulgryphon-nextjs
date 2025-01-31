# Stanford University Library

## Get Started on Development
1. Copy `.env.example` to `.env.local`
2. Configure the environment variables using the `.env.local`. The credentials can be found in the Vercel UI.
3. `yarn dev`

### Development Notes
The Drupal environment uses a customized paragraph preview implementation that uses an iframe. That preview is in the 
`app/(admin)` route group. The reason it is in a different route group is to allow the `(public)` group to have the
layout component for the home page and all slug pages, but not in the preview route.

### Vercel
Production environment uses the `main` branch. `1.x` branch is used as a release branch for all features. Any commits
made to the `1.x` branch will trigger GitHub actions to update the `dev` and `test` branches which are then deployed
on Vercel for their respective Drupal environments.

## Pull Request and Development Workflow Guide

### Development Workflows

All general development work should be based off of the `1.x` branch. To maintain organization and consistency, we suggest the follow this naming convention for branches:

```markdown

{branch-type}/JIRA-###--optional-description-of-task

```

- **branch-type**: Use `feature/`, `task/`, or `bug/` to describe the branch purpose.

- **JIRA-###**: Corresponds to the Jira ticket number.

- **optional-description-of-task**: A brief description of the task or feature being implemented.

This structure ensures proper labeling and integration with Jira.

#### Steps:

1\. **Create a Branch**

   - Start your branch from `1.x`.

   - Feel free to follow the suggested naming conventions outlined above.

2\. **Complete Work**

   - Implement the required changes or features in your branch.

3\. **Create a Pull Request**

   - Open a pull request (PR) from your branch into the `1.x` branch.

   - This action will trigger a Vercel preview deployment for your branch.

4\. **PR Approval and Merge**

   - Once the PR is approved, squash merge your branch into `1.x`.

   - Use this commit message format: `JIRA-### | Brief description of work completed.`

#### PR Requirements:

Pull requests into `1.x` must pass the following checks:

- **Linting**

- **Tests**

- **Branch up-to-date with `1.x`**

- **Successful Vercel build and preview deployment**

When a PR is merged into `1.x`, a Vercel branch deploy will be triggered for `1.x`.

---

### Release Workflow

To release code to production, create a release branch from `1.x` and make a pull request to `main`.

#### Steps:

1\. **Create a Release Branch**

   - Start from `1.x` (or a specific commit ref from `1.x`).

   - We suggest naming your branch with the `release/` prefix, optionally followed by a semver tag (e.g., `release/refactor-everything[major]`). Note: Commit messages are more important than branch names.

2\. **Create a Pull Request**

   - Open a PR from your `release/` branch into `main`.

3\. **PR Approval and Merge**

   - On approval, perform a standard merge commit into `main`.

---

### Hotfix Workflow

Use the hotfix workflow for urgent production bug fixes when there are pending changes in `1.x` that are not ready for deployment.

#### Steps:

1\. **Create a Hotfix Branch**

   - Start your branch from `main`.

2\. **Complete the Fix**

   - Implement the required changes in your hotfix branch.

3\. **Create a Pull Request**

   - Open a PR from your `hotfix/` branch into `main`.

4\. **PR Approval and Merge**

   - Once the PR is approved, squash merge your branch into `main`.

   - Use this commit message format: `JIRA-### | Brief description of hotfix.`

#### Post-Merge Considerations:

- Depending on the state of `1.x`, you may need to manually merge `main` back into `1.x` to resolve conflicts and sync changes.
