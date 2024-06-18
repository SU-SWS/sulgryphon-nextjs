# Stanford University Library

## Development
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