# Contributing to SafeSpace

🚀 Thank you for your interest in contributing to SafeSpace! This document provides guidelines and information for contributors.

## 🌟 Code of Conduct

SafeSpace is committed to providing a safe, inclusive, and harassment-free experience for everyone. We expect all contributors to:

- Be respectful and inclusive
- Focus on constructive feedback
- Prioritize user safety and privacy
- Maintain confidentiality of sensitive information
- Follow our community guidelines

## 🎯 How to Contribute

### 🐛 Reporting Bugs

1. **Check existing issues** first to avoid duplicates
2. **Use the bug report template** when creating new issues
3. **Provide detailed information**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/device information
   - Screenshots if applicable

### 💡 Suggesting Features

1. **Check the roadmap** and existing feature requests
2. **Use the feature request template**
3. **Explain the use case** and potential impact
4. **Consider user safety implications**

### 🔧 Development Contributions

#### Prerequisites

- Node.js 18+
- Git knowledge
- TypeScript/React experience
- Understanding of Web3/blockchain concepts
- Familiarity with accessibility standards

#### Development Setup

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/safespace-dapp.git
   cd safespace-dapp
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

#### Coding Standards

##### TypeScript
- Use strict TypeScript configuration
- Define proper types for all props and functions
- Avoid `any` types
- Use meaningful variable and function names

##### React/Next.js
- Use functional components with hooks
- Follow React best practices
- Implement proper error boundaries
- Ensure components are accessible

##### Styling
- Use Tailwind CSS classes
- Follow the cyberpunk design system
- Maintain consistent spacing and typography
- Ensure responsive design
- Test color contrast for accessibility

##### Blockchain Integration
- Handle wallet connection errors gracefully
- Implement proper loading states
- Test on Sui devnet before mainnet
- Follow security best practices

#### Commit Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
git commit -m "feat: add wallet connection status indicator"

# Bug fixes
git commit -m "fix: resolve chatbot response formatting issue"

# Documentation
git commit -m "docs: update API documentation"

# Styling
git commit -m "style: improve cyberpunk button animations"

# Refactoring
git commit -m "refactor: optimize feed loading performance"

# Tests
git commit -m "test: add unit tests for report validation"
```

#### Pull Request Process

1. **Ensure your code follows our standards**
2. **Test thoroughly**:
   ```bash
   npm run lint
   npm run build
   npm run test # if tests exist
   ```
3. **Update documentation** if needed
4. **Create a detailed PR description**:
   - What changes were made
   - Why the changes were necessary
   - How to test the changes
   - Screenshots for UI changes
5. **Link related issues**
6. **Request review** from maintainers

## 🎨 Design Guidelines

### Cyberpunk Aesthetic
- **Colors**: Use the defined neon color palette
- **Typography**: Maintain consistent font weights and sizes
- **Animations**: Smooth, purposeful animations with Framer Motion
- **Effects**: Glass morphism, glows, and gradients

### Accessibility
- **Color Contrast**: Minimum WCAG AA compliance
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators

### User Experience
- **Safety First**: Always prioritize user safety and privacy
- **Clear Navigation**: Intuitive user flows
- **Error Handling**: Helpful error messages and recovery options
- **Performance**: Fast loading and smooth interactions

## 🔒 Security Considerations

### Privacy
- Never log sensitive user data
- Implement proper data anonymization
- Follow GDPR and privacy best practices
- Test privacy features thoroughly

### Blockchain Security
- Validate all blockchain interactions
- Handle wallet connection securely
- Test on devnet before mainnet deployment
- Follow Web3 security best practices

### Code Security
- No hardcoded secrets or keys
- Sanitize user inputs
- Implement proper error handling
- Regular dependency updates

## 📋 Testing

### Manual Testing
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on different devices (desktop, tablet, mobile)
- Test wallet connection flows
- Test accessibility with screen readers
- Test with slow network connections

### Automated Testing
- Write unit tests for utility functions
- Test React components with React Testing Library
- Test blockchain interactions
- Maintain good test coverage

## 📚 Documentation

### Code Documentation
- Comment complex logic
- Document component props with JSDoc
- Explain blockchain integration points
- Update README for new features

### User Documentation
- Update user guides for new features
- Maintain accurate setup instructions
- Document troubleshooting steps
- Keep deployment guides current

## 🚀 Release Process

1. **Feature freeze** for upcoming release
2. **Thorough testing** on staging environment
3. **Update version** in package.json
4. **Create release notes**
5. **Deploy to production**
6. **Monitor for issues**

## 🤝 Community

### Getting Help
- Check existing documentation first
- Search closed issues for solutions
- Ask questions in GitHub Discussions
- Join our community channels

### Recognition
- Contributors will be recognized in release notes
- Significant contributions may be highlighted
- All contributors are listed in the README

## 📞 Contact

For questions about contributing:
- Open a GitHub Discussion
- Create an issue with the "question" label
- Contact maintainers directly for sensitive matters

---

**Thank you for helping make the internet a safer place! 🛡️**

*Every contribution, no matter how small, makes a difference in creating a safer digital world.*