'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { APP_CONFIG } from '@/lib/constants';

export function Header() {
  // TODO: Add NextAuth integration later
  const session = null;
  const status = 'unauthenticated';

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {APP_CONFIG.name}
              </h1>
              <p className="text-xs text-gray-500">by {APP_CONFIG.author}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/templates"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {status === 'loading' ? (
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  {session.user?.email}
                </span>
                <Link href="/dashboard">
                  <Button variant="secondary" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // TODO: Add logout functionality
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" disabled>
                  Login (Coming Soon)
                </Button>
                <Button size="sm" disabled>
                  Sign Up (Coming Soon)
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="px-4 py-2 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            href="/templates"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Templates
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            About
          </Link>
          <Link
            href="/faq"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}