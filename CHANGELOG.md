# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2026-03-25

### Added
- **Automatic API Key Detection**: The application now prioritizes finding the `VITE_GEMINI_API_KEY` from the system environment, reducing manual entry in the UI.
- **Project Documentation**: Initialized `README.md` and `CHANGELOG.md` for better project tracking and onboarding.

### Fixed
- **Intelligence Engine Model Sync**: Fixed a discrepancy where the "Neural Analysis" was hardcoded to a fallback model. It now correctly uses the selected engine (e.g., Gemini 2.0 Pro) in the request payload.

## [1.0.0] - 2026-03-25

### Added
- **Smart Bid Core**: Initial release of the Smart Construction Estimator.
- **Frontend Dashboard**: Responsive React-based UI for blueprint uploads.
- **Gemini Integration**: Support for PDF analysis via Google Generative AI.
- **Proposal Engine**: Dynamic HTML generator for corporate construction bids.
