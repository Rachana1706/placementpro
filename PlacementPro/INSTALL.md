# PlacementPro - Campus Placement Management System

A modern ReactJS application for managing campus placements, built with Vite, TailwindCSS, and React Router.

## Features

- 📊 **Dashboard** - Overview of placement statistics and recent activities
- 👥 **Students** - Manage student records and profiles
- 🏢 **Companies** - Track recruiting companies and partnerships
- 💼 **Jobs** - Post and manage job openings
- 📝 **Applications** - Track and manage student applications

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Project Structure

```
PlacementPro/
├── src/
│   ├── components/
│   │   └── Layout.jsx         # Main layout with sidebar
│   ├── pages/
│   │   ├── Dashboard.jsx      # Dashboard page
│   │   ├── Students.jsx       # Students management
│   │   ├── Companies.jsx      # Companies management
│   │   ├── Jobs.jsx           # Jobs management
│   │   └── Applications.jsx   # Applications tracking
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── INSTALL.md
```

## Installation Steps

### 1. Navigate to the project directory

```
bash
cd PlacementPro
```

### 2. Install dependencies

```
bash
npm install
```

### 3. Start the development server

```
bash
npm run dev
```

The application will open at `http://localhost:5173`

### 4. Build for production

```
bash
npm run build
```

### 5. Preview production build

```
bash
npm run preview
```

## Design Highlights

- 🎨 **Purple gradient theme** - Modern SaaS dashboard aesthetic
- 📱 **Mobile responsive** - Works on all device sizes
- ✨ **Clean typography** - Inter font family
- 🧩 **Component-based** - Reusable UI components
- 🎯 **TailwindCSS** - Utility-first CSS framework

## Color Palette

- Primary: `#8b5cf6` (Purple)
- Primary Dark: `#6d28d9`
- Background: `#f9fafb` (Gray 50)
- Surface: `#ffffff`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
