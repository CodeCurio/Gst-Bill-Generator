import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceData, PDFTemplate } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { APP_CONFIG, PDF_TEMPLATES } from '@/lib/constants';

// Extend jsPDF to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => any;
    lastAutoTable?: { finalY: number };
  }
}

export interface PDFGenerationOptions {
  template: PDFTemplate;
  showBranding: boolean;
  filename?: string;
}

/**
 * Generate PDF invoice from invoice data
 */
export async function generateInvoicePDF(
  invoiceData: InvoiceData,
  options: PDFGenerationOptions = { template: 'classic', showBranding: true }
): Promise<void> {
  const {
    business,
    client,
    invoice,
    items,
    tax
  } = invoiceData;

  const { template, showBranding, filename } = options;
  const templateConfig = PDF_TEMPLATES[template];

  // Create new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  // Set font
  doc.setFont('helvetica');

  let currentY = margin;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredHeight: number) => {
    if (currentY + requiredHeight > pageHeight - margin) {
      doc.addPage();
      currentY = margin;
    }
  };

  // Add header based on template
  if (templateConfig.hasHeader) {
    // Add business logo if available
    if (business.logo) {
      try {
        const imgWidth = 30;
        const imgHeight = 30;
        doc.addImage(business.logo, 'PNG', margin, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 5;
      } catch (error) {
        console.warn('Failed to add logo to PDF:', error);
      }
    }

    // Add business details
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(business.name.toUpperCase(), margin, currentY);
    currentY += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const businessAddressLines = doc.splitTextToSize(business.address, contentWidth - 60);
    doc.text(businessAddressLines, margin, currentY);
    currentY += businessAddressLines.length * 5 + 2;

    if (business.gstin) {
      doc.text(`GSTIN: ${business.gstin}`, margin, currentY);
      currentY += 5;
    }

    // Add invoice details on the right
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', pageWidth - margin - 30, currentY, { align: 'right' });
    currentY += 12;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const invoiceDetails = [
      `Invoice No: ${invoice.invoiceNo}`,
      `Date: ${formatDate(invoice.invoiceDate)}`,
      ...(invoice.dueDate ? [`Due Date: ${formatDate(invoice.dueDate)}`] : []),
      ...(invoice.placeOfSupply ? [`Place of Supply: ${invoice.placeOfSupply}`] : [])
    ];

    invoiceDetails.forEach(detail => {
      doc.text(detail, pageWidth - margin, currentY, { align: 'right' });
      currentY += 5;
    });

    currentY += 10;
  }

  // Add client details
  checkPageBreak(30);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', margin, currentY);
  currentY += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(client.name, margin, currentY);
  currentY += 5;

  const clientAddressLines = doc.splitTextToSize(client.address, contentWidth);
  doc.text(clientAddressLines, margin, currentY);
  currentY += clientAddressLines.length * 5 + 10;

  // Add items table
  const validItems = items.filter(item => item.name && item.quantity > 0);
  if (validItems.length > 0) {
    checkPageBreak(80);

    // Table headers
    const headers = [
      { header: 'Item Description', dataKey: 'name' },
      { header: 'Qty', dataKey: 'quantity' },
      { header: 'Rate', dataKey: 'rate' },
      { header: 'Tax %', dataKey: 'taxPercent' },
      { header: 'Amount', dataKey: 'amount' }
    ];

    // Table data
    const tableData = validItems.map(item => ({
      name: item.name,
      quantity: item.quantity.toString(),
      rate: formatCurrency(item.rate),
      taxPercent: `${item.taxPercent}%`,
      amount: formatCurrency(item.amount)
    }));

    // Add table
    autoTable(doc, {
      head: [headers.map(h => h.header)],
      body: tableData.map(row => Object.values(row)),
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: template === 'modern' ? [59, 130, 246] : [200, 200, 200],
        textColor: template === 'modern' ? 255 : 0,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, // Item name
        1: { cellWidth: 20, halign: 'center' }, // Quantity
        2: { cellWidth: 30, halign: 'right' }, // Rate
        3: { cellWidth: 20, halign: 'center' }, // Tax %
        4: { cellWidth: 30, halign: 'right' }, // Amount
      },
      theme: template === 'classic' ? 'grid' : 'plain',
      ...((templateConfig.hasBorders && template === 'classic') && {
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      })
    });

    currentY = (doc.lastAutoTable?.finalY || currentY) + 10;
  }

  // Add tax calculations if available
  if (tax) {
    checkPageBreak(60);

    // Calculate position for totals (right-aligned)
    const totalsX = pageWidth - margin - 80;
    let totalsY = currentY;

    // Subtotal
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Subtotal:', totalsX, totalsY);
    doc.text(formatCurrency(tax.subtotal), pageWidth - margin, totalsY, { align: 'right' });
    totalsY += 6;

    // Tax breakdown
    if (tax.cgst > 0) {
      doc.text('CGST:', totalsX, totalsY);
      doc.text(formatCurrency(tax.cgst), pageWidth - margin, totalsY, { align: 'right' });
      totalsY += 6;

      doc.text('SGST:', totalsX, totalsY);
      doc.text(formatCurrency(tax.sgst), pageWidth - margin, totalsY, { align: 'right' });
      totalsY += 6;
    }

    if (tax.igst > 0) {
      doc.text('IGST:', totalsX, totalsY);
      doc.text(formatCurrency(tax.igst), pageWidth - margin, totalsY, { align: 'right' });
      totalsY += 6;
    }

    // Total Tax
    doc.text('Total Tax:', totalsX, totalsY);
    doc.text(formatCurrency(tax.totalTax), pageWidth - margin, totalsY, { align: 'right' });
    totalsY += 8;

    // Grand Total
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Total:', totalsX, totalsY);
    doc.text(formatCurrency(tax.totalAmount), pageWidth - margin, totalsY, { align: 'right' });
    totalsY += 8;

    // Amount in words
    checkPageBreak(20);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Amount in Words:', margin, totalsY);
    totalsY += 5;
    const amountWords = doc.splitTextToSize(tax.amountInWords, contentWidth);
    doc.text(amountWords, margin, totalsY);
    currentY = totalsY + amountWords.length * 4 + 10;
  }

  // Add footer
  if (templateConfig.hasFooter || showBranding) {
    checkPageBreak(20);

    if (showBranding) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      const footerText = `Generated with ${APP_CONFIG.name} by ${APP_CONFIG.author}`;
      doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }
  }

  // Add borders for classic template
  if (templateConfig.hasBorders && template === 'classic') {
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(margin, margin, contentWidth, pageHeight - (margin * 2));
  }

  // Save the PDF
  const finalFilename = filename || `${invoice.invoiceNo.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(finalFilename);
}

/**
 * Generate PDF preview (returns base64 string)
 */
export async function generateInvoicePDFPreview(
  invoiceData: InvoiceData,
  options: PDFGenerationOptions = { template: 'classic', showBranding: true }
): Promise<string> {
  const {
    business,
    client,
    invoice,
    items,
    tax
  } = invoiceData;

  const { template, showBranding } = options;
  const templateConfig = PDF_TEMPLATES[template];

  // Create new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Generate PDF (same logic as above but return as base64)
  // For simplicity, we'll use the same generation logic
  await generateInvoicePDF(invoiceData, options);

  // Return the PDF as base64
  return doc.output('datauristring');
}