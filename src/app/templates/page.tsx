import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { PDF_TEMPLATES } from '@/lib/constants';
import { SEO_METADATA } from '@/lib/constants';

export const metadata = {
  title: SEO_METADATA.templates.title,
  description: SEO_METADATA.templates.description,
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Invoice Templates</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Choose from our professionally designed GST invoice templates that suit your business style
            </p>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(PDF_TEMPLATES).map(([key, template]) => (
            <Card key={key} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600">
                  {template.description}
                </p>
              </CardHeader>
              <CardContent>
                {/* Template Preview */}
                <div className="bg-gray-100 rounded-lg p-4 mb-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    {/* Classic Template Preview */}
                    {key === 'classic' && (
                      <div className="bg-white p-4 rounded border-2 border-gray-300 w-48">
                        <div className="text-xs font-bold mb-2">INVOICE</div>
                        <div className="space-y-1">
                          <div className="h-1 bg-gray-300 rounded w-full"></div>
                          <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                        </div>
                        <div className="mt-4 space-y-1">
                          <div className="h-1 bg-gray-300 rounded w-full"></div>
                          <div className="h-1 bg-gray-300 rounded w-full"></div>
                          <div className="h-1 bg-gray-300 rounded w-full"></div>
                        </div>
                        <div className="mt-4 border-t-2 border-b-2 border-gray-300 py-1">
                          <div className="h-1 bg-gray-300 rounded w-3/4 ml-auto"></div>
                        </div>
                      </div>
                    )}

                    {/* Modern Template Preview */}
                    {key === 'modern' && (
                      <div className="bg-white p-4 rounded w-48">
                        <div className="text-xs font-bold mb-2 text-blue-600">INVOICE</div>
                        <div className="space-y-1">
                          <div className="h-1 bg-gray-300 rounded w-full"></div>
                          <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                        </div>
                        <div className="mt-4 space-y-1">
                          <div className="h-1 bg-gray-300 rounded w-full"></div>
                          <div className="h-1 bg-gray-300 rounded w-full"></div>
                        </div>
                        <div className="mt-4 pt-2 border-t border-gray-200">
                          <div className="h-1 bg-blue-500 rounded w-3/4 ml-auto"></div>
                        </div>
                      </div>
                    )}

                    {/* Minimal Template Preview */}
                    {key === 'minimal' && (
                      <div className="bg-white p-4 rounded w-48">
                        <div className="text-xs font-light mb-4">Invoice</div>
                        <div className="space-y-2">
                          <div className="h-0.5 bg-gray-400 rounded w-full"></div>
                          <div className="h-0.5 bg-gray-400 rounded w-3/4"></div>
                          <div className="h-0.5 bg-gray-400 rounded w-1/2"></div>
                        </div>
                        <div className="mt-6 pt-2 border-t border-gray-400">
                          <div className="h-0.5 bg-gray-800 rounded w-2/3 ml-auto"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Template Features */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      GST tax calculations
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Professional layout
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {template.hasBorders ? 'Borders and styling' : 'Clean design'}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {template.hasHeader ? 'Header section' : 'Minimal header'}
                    </li>
                  </ul>
                </div>

                {/* CTA Button */}
                <Link href="/" className="block">
                  <Button className="w-full">
                    Use {template.name} Template
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Template Comparison */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Template Comparison
          </h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classic
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modern
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Minimal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Borders
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    ✓
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    ✗
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    ✗
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Color Header
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    ✗
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    ✓
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    ✗
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Footer
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    ✓
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    ✗
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    ✗
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Best For
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    Traditional businesses
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    Modern companies
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    Minimalist brands
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to create your invoice?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Choose any template and start creating professional GST invoices in minutes. All templates include automatic tax calculations and professional formatting.
          </p>
          <Link href="/">
            <Button size="lg">
              Start Creating Invoice
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}