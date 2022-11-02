# Contributing

Feel free to submit issues and/or PRs if you found bugs 🐞 or have some features
in mind! The documentation improvements will be super appreciated, if you feel
that docs are lacking in some places 📝👩‍🔬

# Developing locally (Quick Start)

If you want to work on the library locally:

1. Fork this repository and clone your version of the repo
2. Switch to correct node version

```sh
nvm use
```

3. Install npm dependencies

```sh
npm install
```

4. Start storybook server locally

```sh
npm run sb:dev
```

If everything went well, you now have documentation running on
`http://localhost:6006`

Now you can make changes to the library and see them applied to the storybook in
real time.

When you commit changes, eslint will make sure that there are no linting errors
and prettier will format your code based on the repo settings.

When you push changes, jest will run a set of unit tests to make sure that all
of them are passing.
