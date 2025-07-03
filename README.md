# AI Resume Generator

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-blue?style=for-the-badge)](https://theme-craft-resume-ai.vercel.app/)

**Live Demo:** [https://theme-craft-resume-ai.vercel.app/](https://theme-craft-resume-ai.vercel.app/)

An intelligent resume builder that uses AI to enhance your profile summary and skills section, helping you create professional resumes that stand out.

## 🧠 Key Features

- **Dynamic Form Fields**: Comprehensive sections for experience, education, and skills with easy management
- **Live Resume Preview**: Real-time preview with theme and style switching (Modern, Classic, Creative)
- **Smart AI Content Generation**: Using Cohere API for intelligent resume summaries and job descriptions
- **Custom Photo Upload**: Add professional headshots with easy upload functionality
- **Fully Client-Side PDF Export**: Generate polished PDFs directly in the browser—no server required
- **Colorful, Responsive UI**: Beautiful interface that works seamlessly on desktop and mobile
- **Theme Customization**: Multiple color themes and layout options to match your style

## 🛠️ What It Does

It's an AI-powered resume builder that lets users enter their info, preview different styles (Modern, Classic, Creative), tweak color themes, and generate resume content with the help of AI. It also supports uploading a photo and exporting everything to a polished PDF—all in the browser.

Think of it as a sleek, intelligent digital resume studio—designed to help users craft standout CVs with minimal effort and maximum flair.

## 🔧 Tools & Tech Stack

- **React with TypeScript via Vite** - Fast setup and development with type safety
- **Tailwind CSS** - Utility-first styling framework
- **Shadcn/ui** - Beautiful, accessible UI components
- **Cohere API** - AI-powered content suggestions and generation
- **html2canvas & jsPDF** - Client-side PDF export functionality
- **React's useState** - State management for dynamic form handling
- **Lucide React** - Modern icon library
- **React Router** - Navigation and routing
- **Radix Components** - Accessible UI primitives

## 📦 Structure & Design

Clean, modular architecture with components like:
- **ResumeBuilder** - Main form interface for data input
- **AIContentGenerator** - AI integration for smart content suggestions
- **ResumePreview** - Live preview with theme switching
- **PDF Export Utilities** - Client-side PDF generation
- **API Integration** - Cohere AI service calls

All built with readability, reusability, and performance in mind.

## About

Created by **Niyaaz Anthony** - A modern resume builder that leverages artificial intelligence to help job seekers create impactful resumes that get noticed by employers.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-resume-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Build for Production

```bash
npm run build
```

## Deployment

This project is optimized for deployment on **Vercel**:

1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push to main branch
3. Vercel will handle the build process automatically

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

**Niyaaz Anthony**
- GitHub: [@NiyaazZSB](https://github.com/NiyaazZSB)
- Email: niyaaz2001@gmail.com

---

*Built with ❤️ to help job seekers create amazing resumes*