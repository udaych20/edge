# Medical Image Analysis Tool

A React-based web application for analyzing medical images using AI, with support for patient management and feedback collection.

## Features

- Patient information management
- Medical image analysis with AI
- Second opinion analysis
- Feedback collection system
- Dark/Light theme support
- Responsive design

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Development

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/         # React components
├── types/             # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

## Environment Variables

The application expects the following environment variables:

```env
VITE_API_URL=http://your-api-url
```

## Deployment

1. Create a production build:
   ```bash
   npm run build
   ```

2. The `dist` directory can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT