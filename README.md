# Stanford University Library

# Prerequisites

* Git
* NVM
* Yarn
* A privileged account on https://library.sites-pro.stanford.edu

## Installation

1. Clone this repository
2. Run `nvm use` or `nvm install` if it is your first time
3. Run `yarn install`
4. Copy `.env.example` to `.env`
5. Get the environment variables from https://library.sites-pro.stanford.edu/admin/config/services/next/sites/netlify/env and add them to your `.env` file
6. Get DRUPAL_CLIENT_SECRET from Mike or Marc
7. Run `yarn dev`

### Development Notes
The Drupal environment uses a customized paragraph preview implementation that uses an iframe. That preview is in the 
`app/(admin)` route group. The reason it is in a different route group is to allow the `(public)` group to have the
layout component for the home page and all slug pages, but not in the preview route.
