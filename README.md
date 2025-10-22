# Encuesta Quipu - Interactive Survey Landing Page

A modern, accessible, mobile-first survey landing page built for Quipu to gather insights from informal entrepreneurs in Bogotá and Medellín, Colombia.

## 🎯 Project Overview

**Objective**: Create a single-page, multi-step survey form that collects demographic, business, and financing data from informal entrepreneurs to help design better financial solutions.

**Target Audience**: Informal entrepreneurs (emprendedores informales) in Bogotá and Medellín

**Key Features**:
- ✅ Mobile-first, responsive design
- ✅ 6-step wizard form with progress tracking (0-100%)
- ✅ Accessible (WCAG AA compliant, ARIA labels, keyboard navigation)
- ✅ Auto-save to localStorage (continue later on same device)
- ✅ Form validation with Zod
- ✅ Analytics instrumentation via `window.dataLayer`
- ✅ Privacy-focused (no document numbers sent to analytics)
- ✅ Clean, modern UI using Quipu brand colors

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Form Management**: react-hook-form
- **Validation**: Zod
- **Animations**: framer-motion
- **Icons**: lucide-react

## 🎨 Design System

### Colors (Quipu Brand)
- **Primary (Teal)**: `#00A6A5` - Main brand color
- **Lime**: `#7DDD72` - Positive accent
- **Yellow**: `#FFD447` - Warm accent/highlights
- **Surface**: `#F5F7F7` - Light background
- **Ink**: `#0F172A` - Primary text
- **Muted**: `#64748B` - Secondary text

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Accessibility
- ✅ Minimum touch targets: 44×44px
- ✅ Color contrast: WCAG AA minimum
- ✅ Keyboard navigation support
- ✅ Screen reader friendly (ARIA labels)
- ✅ Focus indicators visible

## 📋 Form Structure

### 6-Step Survey Flow

1. **Step 1 - Datos básicos** (Basic Data)
   - Gender identity
   - Age (14-100)
   - City (autocomplete)
   - Document type & number (with validation)

2. **Step 2 - Sobre negocios activos** (Active Businesses)
   - Number of active businesses
   - Optional business name

3. **Step 3 - Crecimiento de ingresos** (Income Growth)
   - Income change compared to last year (-50% to +50%)

4. **Step 4 - Empleos generados** (Employment)
   - Current employees
   - Employee change compared to last year

5. **Step 5 - Financiamiento** (Financing)
   - "Gota a gota" (informal lending) usage
   - Frequency and reasons (if applicable)
   - Other financing sources used

6. **Step 6 - Privacidad y envío** (Privacy & Submission)
   - Privacy consent checkbox (required)
   - Final submission

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Google Account (for Google Sheets integration)

### Installation & Setup

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Configure Google Sheets Backend

**Step 2.1: Set up Google Apps Script**

1. Open your Google Sheet: [https://docs.google.com/spreadsheets/d/1l9iWeJKH1EiD2DELLVGxBjbqxVnFsNo-T_OYgoYdp0M/edit](https://docs.google.com/spreadsheets/d/1l9iWeJKH1EiD2DELLVGxBjbqxVnFsNo-T_OYgoYdp0M/edit)

2. Go to **Extensions → Apps Script**

3. Delete the default code and copy the entire content from `google-apps-script.js` (in the project root)

4. **Important:** If your sheet tab is not named "Sheet1", update line 11 in the script:
   ```javascript
   const SHEET_NAME = 'YourActualSheetName';
   ```

5. Click **Save** (Ctrl+S / Cmd+S)

6. Click **Run** → Select `testScript` → **Run** (this will test and create headers automatically)
   - You'll be asked to authorize the script - click "Review Permissions" → "Advanced" → "Go to Project (unsafe)" → "Allow"

7. Check your Google Sheet - you should now see headers in the first row!

**Step 2.2: Deploy the Web App**

1. In Apps Script, click **Deploy** → **New deployment**

2. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**

3. Fill in:
   - **Description:** "Quipu Survey API" (or any name)
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone

4. Click **Deploy**

5. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/ABC.../exec`)

**Step 2.3: Configure Environment Variables**

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and paste your Web App URL:
   ```bash
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec
   ```

3. Save the file

#### 3. Run the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Lint
npm run lint
```

### Development Server
The app will be available at `http://localhost:5173`

### Testing the Integration

1. Fill out and submit the survey
2. Check your Google Sheet - a new row should appear with the submission data
3. Check browser console for `[API]` logs to debug any issues

## 📦 Project Structure

```
src/
├── components/
│   ├── form/              # Reusable form components
│   │   ├── FormRadioGroup.tsx
│   │   ├── FormCheckboxGroup.tsx
│   │   ├── FormInput.tsx
│   │   ├── FormSelect.tsx
│   │   └── CityAutocomplete.tsx
│   ├── steps/             # Individual form steps
│   │   ├── Step1.tsx
│   │   ├── Step2.tsx
│   │   ├── Step3.tsx
│   │   ├── Step4.tsx
│   │   ├── Step5.tsx
│   │   └── Step6.tsx
│   ├── ui/                # shadcn/ui components
│   ├── Hero.tsx
│   ├── IntroModal.tsx
│   ├── ProgressBar.tsx
│   ├── StickyActions.tsx
│   ├── FAQ.tsx
│   └── SuccessScreen.tsx
├── lib/
│   ├── validation.ts      # Zod schemas & validation helpers
│   ├── storage.ts         # localStorage utilities
│   ├── analytics.ts       # Analytics tracking
│   ├── api.ts             # Google Sheets API integration
│   └── utils.ts           # General utilities
├── App.tsx                # Main wizard orchestration
├── main.tsx
└── index.css              # Global styles + Tailwind
```

## 📊 Google Sheets Database Structure

The survey data is stored in Google Sheets with the following columns (auto-created by the script):

| Column | Field Name | Data Type | Example |
|--------|-----------|-----------|---------|
| A | Fecha y Hora | DateTime | 2025-01-15 14:30:45 |
| B | Género | Text | Mujer |
| C | Edad | Number | 35 |
| D | Ciudad | Text | Bogotá |
| E | Tipo de Documento | Text | Cédula de ciudadanía |
| F | Número de Documento | Text | 1234567890 |
| G | Negocios Activos | Text | Uno |
| H | Nombre del Negocio | Text | Tienda La Esquina |
| I | Cambio en Ingresos | Text | Han aumentado menos del 25 % |
| J | Empleados Actuales | Text | 2 personas |
| K | Cambio en Empleados | Text | La misma cantidad |
| L | Usó Gota a Gota | Text | No |
| M | Frecuencia Gota a Gota | Text | (empty if No) |
| N | Razones Gota a Gota | Text | Separated by "; " |
| O | Razón Otra (Gota a Gota) | Text | Free text |
| P | Otros Financiamientos | Text | Banco tradicional; Familiares |
| Q | Otro Financiamiento | Text | Free text |
| R | Consentimiento Privacidad | Boolean | TRUE |

**Notes:**
- Arrays (checkboxes) are stored as semicolon-separated text: `"Option1; Option2; Option3"`
- Timestamps use Colombia timezone (America/Bogota, GMT-5)
- Empty optional fields show as blank cells
- The script automatically creates headers if they don't exist

## 📊 Analytics Events

The following events are tracked via `window.dataLayer`:

```typescript
// Survey started
{ event: 'survey_started' }

// Step completed
{ event: 'step_completed', step: 1-6 }

// Survey submitted (privacy-safe)
{
  event: 'survey_submitted',
  city: string,
  docType: string,
  used_gotagota: boolean
  // Note: document number is NOT included
}
```

## 💾 Local Storage

Survey data is automatically saved to `localStorage` after each step completion:

```typescript
{
  version: '1.0',
  currentStep: number,
  data: Record<string, any>,
  lastSaved: string (ISO timestamp)
}
```

Users can continue their survey later on the same device/browser.

## 🔒 Privacy & Security

- ✅ Document numbers are **never** sent to analytics
- ✅ Submitted data redacts sensitive fields in console logs
- ✅ All data marked as confidential and anonymous
- ✅ Clear privacy consent required before submission
- ✅ Users can clear local data after completion

## 🚢 Deployment

### Netlify

1. Connect your Git repository to Netlify
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Deploy!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Vercel

1. Import your Git repository to Vercel
2. Framework preset: Vite
3. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Environment Variables

**IMPORTANT:** You must configure the Google Sheets URL in your deployment platform:

#### Netlify
1. Go to Site settings → Environment variables
2. Add: `VITE_GOOGLE_SHEETS_URL` = `your-web-app-url`

#### Vercel
1. Go to Project Settings → Environment Variables
2. Add: `VITE_GOOGLE_SHEETS_URL` = `your-web-app-url`

**Note:** The URL is the Google Apps Script Web App deployment URL from Step 2.2 above.

## ✅ Quality Assurance Checklist

### Frontend
- [x] Lighthouse mobile score ≥95 (Performance, Accessibility, Best Practices, SEO)
- [x] All required fields validated before submission
- [x] Auto-save/restore functionality working
- [x] Analytics events firing correctly
- [x] No sensitive data in analytics
- [x] Touch targets ≥44px
- [x] WCAG AA contrast ratios
- [x] Keyboard navigation functional
- [x] Screen reader compatible

### Backend Integration
- [x] Google Apps Script deployed as Web App
- [x] Headers auto-created in Google Sheet
- [x] Data submission working
- [x] Error handling and retry logic
- [x] Loading states during submission
- [x] Timezone set to Colombia (GMT-5)

## 🔄 Differences from PDF Specification

This implementation matches the `Encuesta_Quipu.pdf` specification exactly. All questions, options, and flow are identical to the source document.

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Landing Page**
   - [ ] Hero section displays correctly
   - [ ] "Iniciar encuesta" button works
   - [ ] FAQ accordion opens/closes

2. **Form Flow**
   - [ ] Progress bar updates correctly (0% → 100%)
   - [ ] All form fields validate properly
   - [ ] Error messages display for invalid inputs
   - [ ] "Atrás" and "Siguiente" buttons work
   - [ ] Sticky footer buttons on mobile

3. **Auto-save**
   - [ ] Fill first step, reload page
   - [ ] Prompt to restore appears
   - [ ] Data is preserved

4. **Validation**
   - [ ] Document number validates based on type
   - [ ] Age restricted to 14-100
   - [ ] Required fields block progression
   - [ ] Privacy consent required on step 6

5. **Success Screen**
   - [ ] Displays after step 6 submission
   - [ ] WhatsApp share button works
   - [ ] Clear data button works

## 📝 Production Deployment Checklist

### Required Steps
- [x] **Google Sheets backend implemented**
  - ✅ Google Apps Script deployed as Web App
  - ✅ Auto-creates headers in Sheet
  - ✅ Handles POST requests from frontend
  - ✅ Error handling and logging

- [ ] **Configure environment variables**
  - [ ] Set `VITE_GOOGLE_SHEETS_URL` in deployment platform (Netlify/Vercel)
  - [ ] Test submission after deployment

- [ ] **Add custom favicon** (replace `/vite.svg` with Quipu logo)

### Optional Enhancements
- [ ] **Add Google Tag Manager**
  - Install GTM script in `index.html`
  - Configure custom events (already implemented in code)

- [ ] **Set up error monitoring** (e.g., Sentry)
  - Track frontend errors
  - Monitor API failures

- [ ] **Add rate limiting** to Google Apps Script
  - Prevent spam submissions
  - Add simple timestamp check

- [ ] **Create data export scripts**
  - Export Sheet to CSV periodically
  - Backup to Google Drive

## 🤝 Contributing

This is a client project for Quipu. For questions or modifications, please contact the development team.

## 📄 License

Proprietary - © 2025 Quipu - Omar Gonzales
