# Artisan Wear E-Commerce Platform

An e-commerce platform specializing in handmade traditional wear and eco-friendly jewelry crafted from recycled materials. The platform offers a seamless shopping experience with a comprehensive product catalog and robust database integration.

## Features

- Product catalog with category filtering
- Shopping cart functionality
- Secure checkout process
- PostgreSQL database integration
- Responsive design

## Tech Stack

- Frontend: React with TypeScript
- Backend: Express.js
- Database: PostgreSQL
- ORM: Drizzle
- Styling: Tailwind CSS + shadcn/ui

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- A `.env` file with the following configuration:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| DATABASE_URL | PostgreSQL database connection URL | Yes | - |
| DATABASE_PASSWORD | PostgreSQL database password (if not included in URL) | No | - |
| ADMIN_PASSWORD | Password for admin access (min. 8 characters) | Yes | - |
| ADMIN_EMAIL | Email address for admin account | Yes | - |
| JWT_SECRET | Secret key for JWT token generation | No | "your-jwt-secret-key" |
| JWT_EXPIRY | JWT token expiration time | No | "48h" |
| RAZORPAY_KEY_ID | Razorpay API Key ID | Yes | - |
| RAZORPAY_KEY_SECRET | Razorpay API Key Secret | Yes | - |

### First-time Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
ADMIN_PASSWORD=admin123456
ADMIN_EMAIL=admin@example.com
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRY=48h
```
Replace the placeholder values with your actual credentials.

3. Set up the database:
```bash
npm run db:push
```

This will create the necessary database tables and initialize them with sample products.
</old_str>

### Development

To start the development server (runs both frontend and backend):
```bash
npm run dev
```

The application will be available at `http://localhost:5000`. The development server includes hot reloading for both frontend and backend changes.

### Production Build

To create and run a production build:
```bash
# Create a production build
npm run build

# Start the production server
npm start
```

## Database Management

After making changes to the database schema in `shared/schema.ts`, sync the database:
```bash
npm run db:push
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm run db:push` - Sync database schema
- `npm run check` - Run TypeScript type checking

## Important Notes

- The development server runs on port 5000
- Ensure your DATABASE_URL environment variable is set correctly
- PostgreSQL must be running before starting the application
- Any changes to `shared/schema.ts` require running `npm run db:push`
- The application uses hot reloading in development mode

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utility functions and hooks
├── server/              # Backend Express application
│   ├── routes.ts        # API routes
│   └── storage.ts       # Database operations
├── shared/              # Shared code between frontend and backend
│   └── schema.ts        # Database schema and types
```

## Contributing

1. Make sure your code passes TypeScript checks (`npm run check`)
2. Test your changes thoroughly
3. Update documentation as needed
