# Clarity - A Minimalist Todo Application

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yogarajjuju/Clarity--TODO)

A visually stunning, minimalist TODO list application for focused productivity, built on Cloudflare's edge network.

Clarity is a visually stunning, minimalist TODO list application designed for focus and productivity. Built on Cloudflare Workers and Durable Objects, it offers a fast, seamless, and distraction-free experience. The core principle is 'less is more,' featuring a clean layout, abundant white space, a limited and sophisticated color palette, and crisp typography. Users can add, complete, and delete tasks, with all interactions enhanced by subtle, smooth animations. The application state is persisted on the edge, ensuring rapid access and synchronization.

## Key Features

- **Minimalist & Focused UI**: A clean, distraction-free interface to help you focus on your tasks.
- **Fluid Interactions**: Add, complete, and delete tasks with smooth, satisfying animations powered by Framer Motion.
- **Task Filtering**: Easily filter your tasks to view `All`, `Active`, or `Completed` items.
- **Edge-First Architecture**: Built on Cloudflare Workers and Durable Objects for global low-latency and instant state persistence.
- **Responsive Design**: A flawless experience across all device sizes, from mobile to desktop.
- **Type-Safe**: Fully written in TypeScript for a robust and maintainable codebase.

## Technology Stack

- **Frontend**:
  - [React](https://react.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Zustand](https://zustand-demo.pmnd.rs/) for state management
  - [Framer Motion](https://www.framer.com/motion/) for animations
- **Backend**:
  - [Cloudflare Workers](https://workers.cloudflare.com/)
  - [Hono](https://hono.dev/)
  - [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/) for stateful coordination

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Bun](https://bun.sh/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) logged into your Cloudflare account.

```bash
# Install Wrangler globally
bun install -g wrangler

# Login to your Cloudflare account
wrangler login
```

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/clarity_todo_app.git
    cd clarity_todo_app
    ```

2.  **Install dependencies:**

    This project uses `bun` for package management.

    ```bash
    bun install
    ```

## Development

To start the local development server, which runs both the Vite frontend and the Wrangler worker simultaneously, run:

```bash
bun dev
```

The application will be available at `http://localhost:3000` (or the port specified in your environment). The frontend will automatically proxy API requests to the local Wrangler server.

## Building the Project

To build the application for production, run the following command. This will build the frontend assets and the worker script.

```bash
bun build
```

The output will be generated in the `dist` directory.

## Deployment

This project is configured for easy deployment to Cloudflare.

1.  **Deploy the application:**

    Make sure you have run `bun build` first. Then, deploy using Wrangler:

    ```bash
    bun deploy
    ```

    This command will deploy your worker and upload the static assets to Cloudflare Pages.

2.  **Deploy with a single click:**

    [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yogarajjuju/Clarity--TODO)

## Project Structure

```
.
├── shared/         # Shared types and mock data between frontend and worker
├── src/            # Frontend React application source code
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions and API client
│   └── pages/        # Application pages
├── worker/         # Cloudflare Worker backend source code
│   ├── entities.ts   # Durable Object entity definitions
│   ├── user-routes.ts # API route definitions
│   └── index.ts      # Worker entrypoint
└── wrangler.jsonc  # Wrangler configuration file
```

## License

This project is licensed under the MIT License.