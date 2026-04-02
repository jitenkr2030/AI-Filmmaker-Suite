# Contributing to AI Filmmaker Suite

Thank you for your interest in contributing to AI Filmmaker Suite! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Bun package manager
- Git

### Setup
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `bun install`
4. Set up database: `bun run db:push`
5. Start development: `bun run dev`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages and API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   └── [feature components]
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
└── types/                # TypeScript type definitions
```

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

### Component Guidelines
- Use functional components with hooks
- Follow shadcn/ui patterns for UI components
- Include proper TypeScript types
- Add comments for complex logic

### API Development
- Use Next.js API routes
- Include proper error handling
- Add input validation
- Return consistent response formats

## 🐛 Bug Reports

When filing bug reports, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## ✨ Feature Requests

Feature requests should:
- Describe the problem you're trying to solve
- Explain why this feature would be valuable
- Provide use cases and examples
- Consider implementation complexity

## 📝 Pull Request Process

1. **Create a branch** from `master`
2. **Make your changes** following guidelines
3. **Test thoroughly** including edge cases
4. **Update documentation** if needed
5. **Submit PR** with clear description
6. **Respond to reviews** promptly

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Cross-browser tested

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
bun test

# Run with coverage
bun test --coverage

# Run specific test file
bun test ScriptInput.test.tsx
```

### Test Guidelines
- Write tests for new features
- Test edge cases and error conditions
- Maintain test coverage above 80%
- Use descriptive test names

## 📚 Documentation

- Update README for major features
- Add inline comments for complex logic
- Document API endpoints
- Include examples in documentation

## 🤝 Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the code of conduct

## 🏷️ Release Process

Releases follow semantic versioning:
- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

## 📞 Getting Help

- Create an issue for bugs or questions
- Join our Discord community
- Check existing documentation
- Review similar issues

Thank you for contributing to AI Filmmaker Suite! 🎬✨