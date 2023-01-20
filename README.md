This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the development server:

```bash
yarn install
yarn dev
```

Running `yarn dev` will first generate the graphql types, then begin the dev process. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app 🚀.

#### Other Scripts

<table>
   <thead>
      <tr>
        <th>Script</th>
        <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
        <td><code>yarn codegen</code></td>
        <td>Generates the graphql types from the pokemon graphql endpoint and locally inspects the application to type its queries/mutations.</td>
      </tr>
      <tr>
        <td><code>yarn build</code></td>
        <td>Builds a deployable version of the application.</td>
      </tr>
      <tr>
        <td><code>yarn test</code></td>
        <td>Runs all jest unit tests once</td>
      </tr>
      <tr>
        <td><code>yarn test:watch</code></td>
        <td>Runs all jest unit tests and refreshes on changes.</td>
      </tr>
      <tr>
        <td><code>yarn start</code></td>
        <td>Starts a production-like server from the build output.</td>
      </tr>
      <tr>
        <td><code>yarn lint</code></td>
        <td>Runs an eslint check over the app</td>
      </tr>
      <tr>
        <td><code>yarn prettier</code></td>
        <td>Runs an prettier code style check over the app</td>
      </tr>
      <tr>
        <td><code>yarn analyze</code></td>
        <td>Outputs a visualization of the build output.</td>
      </tr>
  </tbody>
</table>

---

## Technologies

#### React

At its core, this is a React 18 application. I chose React primarily because I am most familiar with it. I find the React library better suited for these smaller applications plus the devtools (like react profiler) are preferred.

#### Next.js

I chose the Next.js framework for it's compilation process and developer experience. It's simple but powerful router is a main reason, and the optional server and static render is another. Plus this is right off the v13 announcement and I wanted to test out some of the new features.

#### GraphQL with Apollo Client

I like GraphQL's ability to only request what is needed and its ability to request data on the mutation response (compared to POST then GET). I chose to use it with Apollo Client to leverage it's powerful cache-first method for state management. Since this application does not have a lot of state, I didn't need something like Redux.

#### MUI/base Component Library

I went between a few component libraries but landed on MUI/base. First, I started with Carbon (for obvious reasons), but needed React 18+ and typescript support. Then I reluctantly went to MUI, since I am familiar with that library, but wanted something lighter weight so I tried their MUI/joy package. It doesn't have the best documentation yet, plus still requires the emotion styling dependency. So I stripped that out and used their unstyled components from MUI/base. This way I don't have the extra bloat and can much more easily style my components.

#### Jest with @testing-library/react

As far as I'm aware, this is effectively the standard for React unit testing. I also have the most familiarity with it.

#### SASS Modules

This is my preferred styling solution. I've tried JSS, emotion/styled-components, and Tailwind, but find the cleanest and most performant solution is to use external styles. I chose SASS over CSS modules simply because I enjoy the addons it provides.

#### graphql-codegen

With typescript and Apollo, it's best to have typings synched with the server. graphql-codegen enables that generation. I am using it to generate `TypedDocumentNodes`. I've used this package differently in the past, but their docs described this method as the ["next evolution"](https://the-guild.dev/blog/typed-document-node#2020-new-typeddocumentnodes). Basically, instead of generating a bunch of types that may not get used, it compiles types based on what your app is using. After using it, I am lukewarm about it. I appreciate the lack of generated bloat, but it doesn't create or allow for easy access to some essential types.

## Patterns

#### Data Fetching

Considering the only client-specific value is `isFavorite`, everything else could be rendered off the client. I had thought about static generation, or using Next 13's new server components architecture. With the `ListPokemons` query only returning (max) 20 items at a time, and the `isFavorite` handling, the performance gains were getting outweighed by the complexity. It can still be a performance and stability improvement, but perhaps in v2 of this app.

Instead, I use a client caching pattern that is mostly default behavior with Apollo Client but there is special handling for the `pokemons` list. With this being a cache-first policy, the obvious trade-off is the potential for stale data. Given the static nature of this dataset I assumed it to be negligible. If consuming data changes later becomes a requirement, a [cache invalidation policy](https://www.npmjs.com/package/apollo-invalidation-policies) can be added. Or at that point we could migrate to use Next.js server side rendering with either increment static regeneration (excluding `isFavorite`) or just client side render depending on the realtime need for this data.

#### Caching Strategy

The need for pagination with filters requires a unique cache strategy for the pokemons list. Without it, no results besides the initial set would be displayed.

To enable pagination, the subsequent calls to `ListPokemons` simply concats it's results to the existing cache list.

To enable filtering, lists are cached on a per-filter basis. Meaning, a separate list exists in cache depending on which filters are applied.

For example:<br/>
Going from "All" to "Favorites" makes 2 queries and creates 2 cached lists. Now navigating between those two lists will both pull from cache. If you go to favorites and add a filter for "Grass", that will make a new request, and cache it separately since it is a filter combo that has yet to be requested.

This is required because we cant rely on client-side filtering since we don't have the whole dataset.

Favoriting a pokemon triggers a cache update on success. It will check each cached list and see if it needs to add the favorited item to it. Un-favoriting does the same but will instead remove an item.

#### Contextual Routing

As a UX decision, I wanted to try and follow the pattern with popular apps (primarily instagram) where the app opens a modal but causes a route change. This apparently called "contextual routing". Since the detail page doesn't necessitate a full width page, it can be popped in a modal for users to browse faster. If accessed directly (either refresh or by link) the detail page displays the single item (like an instagram/twitter post) with a back link to the list page 🚀. I think it's pretty neat, tbh.

#### Inline SVG Icons

I was originally using MUI/icons but once I migrated away to use MUI/base, the icons library still required the MUI/material and emotion dependency. I was not a fan of this. Since I only needed a few icons, I decided to download the SVGs. I didn't want to use an icon font since it doesn't scale as well as SVG. I also didn't want to have a client request for each icon. When possible it's best to inline the SVG directly. For easier maintainability, I created a root SVG that defines each SVG with an id which can be easily referenced in code. There is a _slight_ performance trade off with this root def approach, but with this small of an icon-set, I found it a net-gain.

#### Favorites Filter

I decided to use the favorites selection below the search as a filter rather than a separate route. This is how I first mocked it out, then I made it into tabs over the search which changed the route, but then back as a filter. I was against the nav change since I found it confusing to lose my search/filters switching between lists. The UI is the same for both so I expect it to update that UI rather than have two separate instances of it. Though this may be personal preference since my QA (girlfriend) was confused that it persisted...

## Improvement Opportunities

For this project, I didn't want to over-complicate too much, but I am aware of aspects that would be required before calling it "prod ready", other are "nice to haves".

- E2E testing
  - A fast follow would be to use Cypress for E2E testing. I've intentionally left some logic untested in the unit tests since it fits better at the E2E-scope. e.g. validating page navigation with modals, and favoriting/unfavoriting a pokemon.
- Improved accessability
  - I tried to keep things native where possible, and Lighthouse gives me a 100 score for accessibility but I know there are improvements that can be made for screen readers. Some of the roles, labeling, and alerting could use a run through.
- SSR/SSG/ISR or Next 13 server components
  - As said previously, I think the static nature of this data could be leveraged to build out a more performant and stable app.
- Improved "type" filtering UI
  - Originally I wanted to make each type a selectable "chip" that scrolls horizontally under the search. This is how many modern apps approach this (e.g. Grubhub, DoorDash, Google search). But with the time allotted a standard dropdown was good enough.
- Scroll position jumpiness
  - There is some visual glitchy-ness that happens when the modal opens and closes. This has to do with the native focus management, since a focused item is scrolled into view. The modal needs to return focus to the element that was clicked, which causes the scroll jump. Some scroll position management could be added to the modal component.
- Clear filters button
  - Would be great to add a clear button for better UX.
- Add PWA manifest.json, more meta tags, and sitemap assets to improve SEO

## Learnings

Overall this was a great exercise; I polished a few things I knew, and gained a good amount of new learnings.

- I wanted to try some new features of **Next.js 13**, and while I only ended up using a few of the new features it was great to dive into understanding some of their larger changes (like server components).
- This was one of the more sophisticated **caching strategies** I've had to implement with Apollo, as most of my previous use cases didn't have as much static data.
- Learned the **new graphql-codegen pattern** that generates a TypedDocument based on the client's queries. As said, I found this pattern to be totally usable but not necessarily better for this app.
- Learned how to implement **contextual routing** (modal changes url) with Next.js
- Learned best practices for creating **inline SVG** icons instead of using an icon font.
