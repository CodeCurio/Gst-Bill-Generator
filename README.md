# Online GST Bill Maker

A comprehensive web-based GST invoice generation application for Indian small businesses, freelancers, and shopkeepers.

## Features

### Core Functionality
- **GST-Compliant Invoices**: Generate invoices that comply with Indian GST regulations
- **Auto Tax Calculation**: Automatically calculates CGST, SGST, and IGST based on place of supply
- **Real-time Preview**: See exactly how your invoice will look as you type
- **Professional PDF Export**: Download invoices in multiple template formats (Classic, Modern, Minimal)
- **Dynamic Items Table**: Add/remove items with automatic subtotal calculations
- **Logo Upload**: Add your business logo to invoices
- **Mobile Responsive**: Works perfectly on all devices

### Tax Features
- **CGST/SGST Calculation**: For intra-state transactions (same state)
- **IGST Calculation**: For inter-state transactions (different states)
- **GSTIN Validation**: Format validation for GST identification numbers
- **Indian States Support**: All 28 states and 8 union territories
- **Amount in Words**: Automatic conversion of totals to Indian rupees in words

### Templates
- **Classic Template**: Traditional layout with borders and professional styling
- **Modern Template**: Clean, minimalist design with color headers
- **Minimal Template**: Simple layout with essential elements only

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **PDF Generation**: jsPDF with AutoTable plugin
- **Database**: Prisma with SQLite (development) / PostgreSQL (production)
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context + useReducer

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Gst-Bill-Generator
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM="noreply@toprankindia.com"

# File upload
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE=1048576

# Application settings
APP_URL="http://localhost:3000"
APP_NAME="Online GST Bill Maker"
```

## Usage

1. **Fill Business Details**: Enter your business name, address, and GSTIN (optional)
2. **Add Client Information**: Enter client name and address
3. **Set Invoice Details**: Configure invoice number, date, due date, and place of supply
4. **Add Items**: Add products or services with quantity, rate, and tax percentage
5. **Review Tax Calculation**: See automatic CGST/SGST or IGST calculations
6. **Generate PDF**: Download professional invoice in your preferred template

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # User dashboard
│   ├── invoice/           # Invoice creation/editing
│   ├── templates/         # Invoice templates showcase
│   ├── about/            # About page
│   ├── faq/              # FAQ page
│   ├── contact/          # Contact page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable components
│   ├── ui/              # Base UI components
│   ├── forms/           # Form components
│   ├── invoice/         # Invoice-specific components
│   └── layout/          # Layout components
├── lib/                 # Utility functions
│   ├── pdf.ts           # PDF generation logic
│   ├── gst-calculator.ts # GST tax calculations
│   ├── validation.ts    # Form validation schemas
│   ├── constants.ts     # Application constants
│   ├── utils.ts         # General utilities
│   └── prisma.ts        # Database client
├── types/               # TypeScript type definitions
└── hooks/               # Custom React hooks
```

## GST Tax Calculation Logic

### Same State (Intra-state)
When seller and buyer are in the same state:
- Total Tax is split equally between CGST and SGST
- Example: 18% GST → 9% CGST + 9% SGST

### Different States (Inter-state)
When seller and buyer are in different states:
- Only IGST is applied
- Example: 18% GST → 18% IGST

### Calculation Formula
```
Subtotal = Σ(Item Quantity × Item Rate)
Total Tax = Σ(Item Amount × Tax Percentage)
CGST = SGST = Total Tax / 2 (same state)
IGST = Total Tax (different states)
Total Amount = Subtotal + Total Tax
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Email**: support@toprankindia.com
- **WhatsApp**: +91 98765 43210
- **Website**: [www.toprankindia.com](https://www.toprankindia.com)

## Made with ❤️ by TopRank Digital Service, Lucknow

A professional GST billing solution designed for Indian businesses.