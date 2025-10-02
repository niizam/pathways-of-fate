# Accessibility & Privacy

[← Back to Index](README.md) | [← Previous: Roadmap](roadmap.md) | [Next: Appendices →](appendices.md)

## 1. Accessibility Features

### 1.1 Visual Accessibility

**Text Options:**
- Font size adjustment (Small, Medium, Large)
- High contrast mode
- Customizable text background opacity
- Dyslexia-friendly font option

**Color Accessibility:**
- Colorblind modes:
  - Protanopia (red-blind)
  - Deuteranopia (green-blind)
  - Tritanopia (blue-blind)
- Color-independent indicators (shapes, patterns)
- Adjustable UI color themes

**Visual Simplification:**
- Reduce motion settings
- Disable animations
- Simplified UI mode
- Focus indicators for keyboard navigation

### 1.2 Auditory Accessibility

**Sound Options:**
- Volume controls (master, music, SFX)
- Visual sound indicators
- Subtitles for all voice/sound cues
- Silent mode (no audio required)

### 1.3 Motor Accessibility

**Input Options:**
- Full keyboard navigation
- Customizable keybinds
- Single-switch access support
- Adjustable input timing (hold duration, double-click speed)

**Navigation:**
- Tab navigation through all UI elements
- Shortcuts for common actions
- Auto-battle (no manual input required)
- Skip tickets (instant completion)

### 1.4 Cognitive Accessibility

**Assistance Features:**
- Tutorial replays
- In-game help system (Pathway Encyclopedia)
- Tooltips for all game elements
- Simplified explanations mode

**Time Flexibility:**
- No real-time pressure (turn-based)
- Pause anytime
- Generous timers
- Idle rewards (play at own pace)

### 1.5 Screen Reader Support

**Compatible With:**
- JAWS
- NVDA
- VoiceOver
- TalkBack (mobile, future)

**Features:**
- All UI elements labeled
- Battle state read aloud
- Navigation announcements
- Form labels and hints

---

## 2. Language Support

### 2.1 Supported Languages

**Launch:**
- English (primary)

**Planned (Phase 2):**
- Simplified Chinese
- Traditional Chinese
- Japanese
- Korean
- Spanish
- Portuguese (Brazil)

**Community Contributions:**
- Open translation system
- Community-submitted translations
- Review and integration process
- Translator credits in-game

### 2.2 Localization Quality

**Standards:**
- Professional translation for primary languages
- Cultural adaptation (not just literal translation)
- Terminology consistency
- Regular updates with new content

---

## 3. Performance & Compatibility

### 3.1 Low-End Device Support

**Minimum Requirements:**
- 2GB RAM
- Dual-core processor
- Modern web browser (Chrome, Firefox, Safari, Edge)
- 200MB free storage (cache)

**Optimizations:**
- Text-based UI (minimal graphics)
- Progressive image loading
- Code splitting
- Service workers for offline play

### 3.2 Network Requirements

**Bandwidth:**
- Initial load: ~5MB
- Daily usage: ~10-20MB
- Monthly usage: ~300MB

**Connectivity:**
- Playable on 3G connections
- Graceful degradation on slow networks
- Offline mode for single-player content (syncs later)
- Automatic reconnection

### 3.3 Browser Compatibility

**Supported Browsers:**
- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile Browsers:**
- Chrome Mobile
- Safari Mobile
- Samsung Internet
- Firefox Mobile

---

## 4. Data Privacy

### 4.1 GDPR Compliance

**User Rights:**
- Right to access (download all personal data)
- Right to deletion (delete account and all data)
- Right to rectification (update information)
- Right to portability (export data in standard format)

**Implementation:**
- Account settings: "Download My Data"
- Account settings: "Delete Account"
- Support contact for rectification requests

### 4.2 Data Collection

**Minimal Collection:**
Only essential data collected:
- Account credentials (email, hashed password)
- Game progress (characters, inventory, progression)
- Purchase history (for transaction records)
- Login history (security)
- Friend lists
- Chat logs (30-day retention)

**Not Collected:**
- No browsing history
- No device fingerprinting
- No location data
- No advertising identifiers
- No third-party tracking

### 4.3 Data Storage

**Current Implementation:**
- JSON file-based storage (simplified architecture)
- Data stored in `server/db/data/` directory
- Easy backup: simply copy the data folder
- No complex database setup required

**Security Measures:**
- HTTPS only (encrypted transmission)
- File system permissions for data directory
- Password hashing (bcrypt)
- Regular security audits
- Penetration testing

**Retention Policy:**
- Active accounts: Indefinite
- Inactive accounts (2+ years): Anonymized
- Deleted accounts: Purged within 30 days
- Chat logs: 30 days (when implemented)

**Self-Hosting Benefits:**
- Full control over your data
- Simple file-based backups
- No vendor lock-in
- Portable between systems

### 4.4 Third-Party Services

**Minimal Third-Party Usage:**
- Payment processor (Stripe/PayPal) - required for purchases
- Email service (SendGrid/AWS SES) - account verification
- CDN (optional) - faster asset loading

**No Third-Party Analytics:**
- No Google Analytics
- No Facebook Pixel
- No ad networks
- All analytics self-hosted

### 4.5 Privacy Policy

**Transparency:**
- Clear, readable privacy policy
- No legal jargon
- Update notifications
- Changelog of policy changes

**User Control:**
- Opt-in for any optional data collection
- Can disable telemetry
- Control over data sharing with friends
- Manage communication preferences

---

## 5. Open-Source Commitment

### 5.1 Open-Source Benefits

**Transparency:**
- Community can audit code
- Verify no malicious behavior
- Check gacha fairness
- Review data handling

**Security:**
- Community security researchers
- Faster bug identification
- Transparent security fixes
- Public CVE disclosures

**Community Ownership:**
- Can self-host
- Can fork for modifications
- Can contribute improvements
- Data sovereignty

### 5.2 License

**License Type:** GNU GPLv3 (or similar open-source license)

**Allows:**
- Use for any purpose
- Study and modify
- Redistribute
- Redistribute modifications

**Requires:**
- Disclose source
- Same license for derivatives
- State changes made

### 5.3 Self-Hosting

**Why Allow:**
- Data ownership
- Privacy control
- Community servers
- Modding support

**Official Server vs Self-Hosted:**
- Official: Supported, regular updates, online community
- Self-Hosted: Full control, privacy, can modify game

---

## 6. Ethical Game Design

### 6.1 Anti-Addiction Measures

**Healthy Play Encouragement:**
- No punishing daily login requirements
- Stamina system prevents marathon sessions
- Idle rewards (don't need to be online 24/7)
- Content accessible at own pace

**No Dark Patterns:**
- No fake scarcity (banners return)
- No hidden costs (all prices clear)
- No gambling addiction triggers
- No manipulative timers

### 6.2 Age-Appropriate Content

**Rating Target:** T for Teen (ESRB) / 12+ (PEGI)

**Content Guidelines:**
- No excessive violence
- No sexual content
- Mild occult themes (pathway powers)
- No gambling promotion (gacha clearly labeled)

### 6.3 Fair Play Principles

**Commitment:**
- No pay-to-win
- Skill matters more than money
- All content F2P-clearable
- Transparent rates
- Bot-friendly (accessibility)

---

[← Previous: Roadmap](roadmap.md) | [Next: Appendices →](appendices.md) | [↑ Back to Index](README.md)
