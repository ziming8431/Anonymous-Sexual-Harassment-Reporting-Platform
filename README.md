# SafeSpace - Anonymous Harassment Reporting dApp

🚀 **A cutting-edge blockchain-powered platform for anonymous harassment reporting**

SafeSpace is a modern React/Next.js application that provides a secure, anonymous platform for reporting harassment incidents. Built with a cyberpunk aesthetic and powered by Sui blockchain technology, it features an AI-powered chatbot for guided reporting and a Twitter-style feed for community awareness.

![SafeSpace Preview](https://via.placeholder.com/800x400/1a1a1a/00ff88?text=SafeSpace+Cyberpunk+UI)

## ✨ Key Highlights

- 🔐 **Blockchain Security**: Built on Sui blockchain for enhanced privacy and security
- 🎨 **Cyberpunk Design**: Modern high-tech aesthetic with neon accents and 3D visualizations
- 🤖 **AI-Powered**: Intelligent chatbot for guided reporting assistance
- 🌐 **Web3 Integration**: Seamless wallet connection and blockchain interactions
- 📱 **Responsive**: Optimized for all devices with smooth animations

## 🌟 Features

### 🔒 Core Functionality
- **Anonymous Reporting**: Blockchain-secured, private reporting system with AI assistance
- **AI Chatbot**: Intelligent conversational interface that guides users through the reporting process
- **Community Feed**: Twitter-style feed of anonymized harassment reports with real-time updates
- **Wallet Integration**: Seamless Web3 wallet connection for enhanced security

### 🎨 Design & UX
- **Cyberpunk Aesthetic**: High-tech design with neon colors, gradients, and 3D visualizations
- **Animated Elements**: Floating blockchain nodes, pulsing effects, and smooth transitions
- **Glass Morphism**: Modern UI cards with backdrop blur and glowing effects
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### ⚡ Technical Features
- **Blockchain Security**: Built on Sui blockchain for immutable and secure data
- **Real-time Updates**: Live feed updates and instant notifications
- **Accessibility**: WCAG-compliant design with proper contrast and keyboard navigation
- **Performance**: Optimized loading with lazy loading and efficient state management
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for modern iconography
- **State Management**: React hooks and context

### Blockchain & Web3
- **Blockchain**: Sui Network
- **Wallet Integration**: Suiet Wallet Kit
- **Blockchain SDK**: @mysten/sui

### Data & Performance
- **Data Fetching**: React Query (TanStack Query)
- **Utilities**: clsx, tailwind-merge
- **Build Tools**: PostCSS, Autoprefixer
- **Code Quality**: ESLint, TypeScript strict mode

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.0 or higher ([Download here](https://nodejs.org/))
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For cloning the repository ([Download here](https://git-scm.com/))
- **Web3 Wallet**: Sui Wallet or compatible wallet for testing blockchain features

### 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/safespace-dapp.git
cd safespace-dapp
```

> **Note**: Replace `YOUR_USERNAME` with your actual GitHub username after creating the repository.

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the SafeSpace landing page with cyberpunk design

### 🔧 Development Setup

#### First Time Setup
1. **Verify installation:**
```bash
node --version  # Should be 18.0+
npm --version   # Should be 8.0+
```

2. **Install a Sui Wallet:**
   - Install [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil) browser extension
   - Create a new wallet or import existing one
   - Switch to Sui Devnet for testing

3. **Connect your wallet:**
   - Visit [http://localhost:3000/connect](http://localhost:3000/connect)
   - Click "Connect Wallet" and follow the prompts
   - Once connected, you'll be redirected to the main application

### 🎯 Quick Start Guide

1. **Landing Page**: Experience the cyberpunk-themed landing page with 3D animations
2. **Connect Wallet**: Use the `/connect` route to connect your Sui wallet
3. **Main App**: After connecting, explore the feed and chatbot features
4. **Report Creation**: Use the AI chatbot to create anonymous reports
5. **Community Feed**: Browse anonymized reports in the Twitter-style feed

### 🔍 Troubleshooting

#### Common Issues

**Port 3000 already in use:**
```bash
# Kill the process using port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

**Node modules issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Wallet connection issues:**
- Ensure you have a Sui-compatible wallet installed
- Check that you're on the correct network (Devnet for development)
- Try refreshing the page and reconnecting

**Build errors:**
```bash
# Check for TypeScript errors
npm run lint
# Clean build
rm -rf .next
npm run build
```

## 📁 Project Structure

```
safespace-dapp/
├── app/                    # Next.js 14 app directory
│   ├── connect/           # Wallet connection page
│   │   └── page.tsx       # Connect wallet interface
│   ├── globals.css        # Global styles & cyberpunk theme
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page with cyberpunk design
├── components/            # React components
│   ├── WalletProviderWrapper.tsx  # Web3 wallet integration
│   ├── chatbot/          # AI chatbot system
│   │   ├── ChatBubble.tsx        # Individual chat messages
│   │   ├── ChatbotPanel.tsx      # Main chat interface
│   │   └── SummaryCard.tsx       # AI-generated summaries
│   ├── feed/             # Community feed components
│   │   ├── FeedContainer.tsx     # Main feed with infinite scroll
│   │   └── ReportCard.tsx        # Individual report cards
│   ├── layout/           # Layout components
│   │   ├── Header.tsx            # Navigation header
│   │   └── Sidebar.tsx           # Side navigation
│   ├── modals/           # Modal dialogs
│   │   ├── ConfirmationModal.tsx # Action confirmations
│   │   └── ReportDetailModal.tsx # Detailed report view
│   ├── providers/        # Context providers
│   │   └── QueryProvider.tsx    # React Query setup
│   └── ui/               # Reusable UI components
│       └── LoadingSpinner.tsx    # Loading animations
├── lib/                  # Utility functions
│   ├── api.ts           # API functions & blockchain calls
│   ├── chatbot.ts       # AI chatbot logic
│   └── utils.ts         # Helper utilities
├── types/               # TypeScript type definitions
│   └── index.ts         # Global type definitions
├── public/             # Static assets
├── .next/              # Next.js build output
├── package.json        # Dependencies & scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## Key Components

### Feed System
- **FeedContainer**: Main feed component with infinite scroll
- **ReportCard**: Individual report cards with hover effects
- **ReportDetailModal**: Full report view with support resources

### AI Chatbot
- **ChatbotPanel**: Slide-in chat interface
- **ChatBubble**: Individual message components
- **SummaryCard**: AI-generated report summary display

### Modals
- **ConfirmationModal**: Public sharing confirmation
- **ReportDetailModal**: Detailed report viewing

## 🎨 Design System

### Cyberpunk Color Palette
- **Primary Background**: `from-gray-900 via-slate-800 to-gray-900` (Dark Gradient)
- **Neon Green**: `#22c55e` (Primary Accent)
- **Neon Cyan**: `#06b6d4` (Secondary Accent)
- **Neon Purple**: `#a855f7` (Tertiary Accent)
- **Glass Morphism**: `backdrop-blur-md` with `bg-white/10`
- **Text Colors**: 
  - Primary: `text-white`
  - Secondary: `text-gray-300`
  - Accent: `text-green-400`

### Visual Effects
- **Gradients**: Multi-color gradients for text and backgrounds
- **Glows**: Box shadows with neon colors
- **Animations**: Framer Motion for smooth transitions
- **3D Elements**: Floating blockchain nodes and rotating effects
- **Grid Patterns**: Subtle background grids for tech aesthetic

## Accessibility Features

- WCAG AA compliant color contrast
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Semantic HTML structure
- ARIA labels and descriptions

## Security & Privacy

- No personal data collection
- Anonymous reporting system
- Client-side data processing
- Secure form handling
- Privacy-first design

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create components in appropriate directories
2. Add TypeScript types in `types/index.ts`
3. Update API functions in `lib/api.ts`
4. Follow existing patterns for consistency

## 🚀 Deployment

### Platform Options

This app can be deployed to any platform that supports Next.js:

- **Vercel** (recommended) - Automatic deployments from GitHub
- **Netlify** - Easy static site deployment
- **AWS Amplify** - Full-stack deployment with backend
- **Railway** - Simple container deployment
- **DigitalOcean App Platform** - Managed deployment

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Blockchain Configuration
NEXT_PUBLIC_SUI_NETWORK=devnet
NEXT_PUBLIC_SUI_RPC_URL=https://fullnode.devnet.sui.io:443

# API Configuration (if using external APIs)
NEXT_PUBLIC_API_BASE_URL=https://your-api-endpoint.com

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Deployment Steps

#### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

#### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Blockchain Considerations
- Ensure wallet integration works on your deployment domain
- Configure CORS settings for blockchain RPC calls
- Test wallet connections on the deployed environment
- Consider using mainnet for production deployments

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support Resources

- **Crisis Hotline**: 1-800-656-HOPE (4673)
- **RAINN**: https://www.rainn.org
- **Legal Aid**: Contact local legal aid organizations
- **Emergency**: Call 911 or local emergency services

## 📚 Creating Your GitHub Repository

### Step 1: Create Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `safespace-dapp`
   - **Description**: `🚀 SafeSpace - A cutting-edge blockchain-powered platform for anonymous harassment reporting with cyberpunk design and AI assistance`
   - **Visibility**: Public (recommended for open source)
   - **Initialize**: Leave unchecked (we'll push existing code)
5. Click "Create repository"

### Step 2: Push Your Local Code

In your project directory, run these commands:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "🚀 Initial commit: SafeSpace cyberpunk dApp with blockchain integration"

# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/safespace-dapp.git

# Push to GitHub
git push -u origin main
```

> **Replace `YOUR_USERNAME`** with your actual GitHub username

### Step 3: Set Up GitHub Pages (Optional)

To deploy your app using GitHub Pages:

1. Go to your repository settings
2. Scroll down to "Pages" section
3. Select source: "GitHub Actions"
4. Create `.github/workflows/deploy.yml` for automatic deployment

### Step 4: Configure Repository Settings

1. **Add topics/tags**: `blockchain`, `sui`, `nextjs`, `typescript`, `cyberpunk`, `web3`, `dapp`
2. **Enable Issues**: For bug reports and feature requests
3. **Add collaborators**: If working with a team
4. **Set up branch protection**: For main branch

## 🤝 Contributing to SafeSpace

We welcome contributions! Here's how you can help:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**:
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit with conventional commits**:
   ```bash
   git commit -m "feat: add amazing new feature"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Create a Pull Request**

### Contribution Guidelines

- Follow the existing code style and patterns
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed
- Ensure accessibility compliance
- Follow the cyberpunk design system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support Resources

- **Crisis Hotline**: 1-800-656-HOPE (4673)
- **RAINN**: https://www.rainn.org
- **Legal Aid**: Contact local legal aid organizations
- **Emergency**: Call 911 or local emergency services

## 🙏 Acknowledgments

- Built with accessibility and user safety as top priorities
- Designed to empower survivors and build community awareness
- Inspired by the need for safe, anonymous reporting platforms
- Powered by the Sui blockchain for enhanced security and privacy
- Created with modern web technologies and cyberpunk aesthetics

---

**Made with ❤️ for a safer digital world**

*SafeSpace - Where anonymity meets security in the blockchain era*