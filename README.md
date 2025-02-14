# GitHub Search
## https://ghs-pz.vercel.app

## 🚀 Project Setup
To run the project, simply execute the following command:
```sh
yarn dev
```
This will install dependencies and start the development server. No additional environment variables are required.

---
To run the E2E tests, simply execute the following command:
```sh
yarn test
```

## 🛠 How It Works
I first divided the task into work tickets:
- **GHS-1**: Design
- **GHS-2**: Bootstrap app
- **GHS-3**: Implement search
- **GHS-4**: Implement search results list
- **GHS-5**: Docs
- **GHS-6**: Deployment
- **GHS-8**: Testing & Polishing

I started with an initial design draft, then created the application skeleton. Once the basic structure was in place, I proceeded with the implementation. During development, I deployed the app to **Vercel** to ensure smooth deployment and hosting.

## 🏗 Tech Stack
- **TypeScript**
- **Next.js (latest canary release) & React** (with React Compiler)
- **react-data-table**
- **react-hook-form**
- **zod**
- **next-intl**
- **swr**
- **SASS**
- **octokit** (GitHub SDK)
- **ESLint**

## 📌 Technical Decisions
- The GitHub API request is implemented as a **server action with caching** for better performance.
- Since this is a recruitment task, I chose to experiment with **React Compiler** and the latest Next.js features. However, in a real production environment:
    - I would avoid using **React Compiler** and instead choose a stable Next.js version. I would focus of manual memoization handling.
    - **Turbopack** might also be removed if causing DX problems.
    - Instead of `unstable_cache`, I would handle `fetch` with Next.js caching mechanisms.
- **No authentication** is needed since we are searching public repositories. If private repositories were required, I would add authentication - that would also extend GitHub API limits.
- **URL state management** is sufficient for this simple app.
- **Basic internationalization (next-intl)** is implemented for potential future use.
- I created **custom SASS helpers** to manage styling without external UI libraries.
- Used **swr** for efficient API data fetching.

## 🔮 Future Improvements & Considerations
~~I originally planned to implement tests at the end of the process, but unfortunately, time ran out due to personal commitments in the coming days. TDD convention might shed a tear at this decision, but I prioritized other aspects of the app first.~~

**UPDATE: 14.02.2025**\
Few E2E tests have been added.

- **Consider extending test coverage**
- **Improve SEO if needed and important**:
    - More **SSR rendering**
    - Canonical links
    - JSON-LD for structured data
    - Optimized `title` and `description`
    - Better semantic HTML
- **Consider using GraphQL** to minimize fetched data.
- **Enhance search validation** to fully comply with GitHub's standards (e.g., adding language filters like `language:JavaScript`).
- **Improve UI/UX**:
    - Advanced search filters (e.g., programming language selector, user filter)
    - Real-time validation for the search input
- **Validate & handle URL query parameters** more robustly.
- **Improve responsiveness**:
    - Consider using **Container Queries** instead of Media Queries.
- **Integrate Sentry**:
    - Error tracking & observability
    - Monitoring **Core Web Vitals**
- **Consider a more advanced state management library** like Zustand if the project scales.
- **Enhance error handling** for a better user experience.
- **Explore PWA support & offline mode** if needed.
- **Check and improve accessibility** if needed:
    - Check color contrast
    - Ensure compatibility with color blindness

## ⚠️ Known Limitations
- **Sorting by `owner` and `created_at` is not supported** (GitHub API does not provide these options, as per documentation and TypeScript SDK types).
- **Search input validation does not trigger live feedback**, requiring a form submission attempt to display errors.

