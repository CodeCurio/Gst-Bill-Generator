import Link from 'next/link';
import { APP_CONFIG } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">
                {APP_CONFIG.name}
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Generate GST-compliant invoices in seconds. Auto-calculate CGST, SGST, and IGST taxes with professional PDF output.
            </p>
            <p className="text-sm text-gray-500">
              Developed with ❤️ by {APP_CONFIG.author} – {APP_CONFIG.location} |{' '}
              <a
                href={APP_CONFIG.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                www.toprankindia.com
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600">
                  GST Bill Maker
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-gray-600 hover:text-primary-600">
                  Invoice Templates
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-primary-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-600">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:support@toprankindia.com`}
                  className="text-gray-600 hover:text-primary-600"
                >
                  Email Support
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/919876543210?text=Hi%20I%20need%20help%20with%20GST%20Bill%20Maker`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {APP_CONFIG.author}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-primary-600 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary-600 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary-600 text-sm"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}