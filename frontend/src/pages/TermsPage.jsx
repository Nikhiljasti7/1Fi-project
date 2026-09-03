import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 bg-[#F8F9FA] text-slate-800">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 shadow-sm mb-8 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Return to Marketplace</span>
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-8">
        <div className="border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-xs font-semibold text-slate-700 mb-3">
            <FileText className="h-3.5 w-3.5 text-indigo-600" />
            <span>Regulatory Agreement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Terms of Service &amp; Lending Agreement
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Effective Date: September 2026 • Governed by Reserve Bank of India (RBI) &amp; SEBI Master Directions
          </p>
        </div>

        <section className="space-y-3 text-xs leading-relaxed text-slate-600">
          <h2 className="text-sm font-bold text-slate-900">1. Facility Description (Loan Against Mutual Funds - LAMF)</h2>
          <p>
            1Fi Technologies Private Limited acts as a digital lending technology facilitator connecting accredited borrowers with RBI-registered Non-Banking Financial Companies (NBFCs) and Scheduled Commercial Banks. When purchasing eligible smartphones, borrowers pledge eligible mutual fund folios registered with CAMS or KFin Technologies, or dematerialized equities held with CDSL or NSDL, as collateral under a first-lien arrangement.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-600">
          <h2 className="text-sm font-bold text-slate-900">2. Loan-to-Value (LTV) Ratios &amp; Collateral Maintenance</h2>
          <p>
            In compliance with statutory guidelines, the maximum Loan-to-Value (LTV) extended against approved diversified equity mutual funds and bluechip equities shall not exceed 50.0% of the Net Asset Value (NAV) or closing market price. Against approved liquid and overnight debt mutual funds, LTV may be extended up to 80.0%.
          </p>
          <p>
            The borrower retains complete beneficial ownership of all pledged units. All accrued dividend yields, capital growth, and unit splits continue to credit directly to the borrower&apos;s registered folio.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-600">
          <h2 className="text-sm font-bold text-slate-900">3. Subsidized Interest &amp; Repayment Mandates</h2>
          <p>
            0% No-Cost EMI plans are facilitated via manufacturer and merchant interest subvention agreements. Monthly installments (EMIs) are debited on the 5th calendar day of each month via authorized National Automated Clearing House (NACH) or e-Mandate protocols.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-600">
          <h2 className="text-sm font-bold text-slate-900">4. Prepayment &amp; Lien Revocation</h2>
          <p>
            Borrowers may prepay outstanding principal balances in whole or in part at any time. 1Fi and its lending partners levy zero (0.00%) pre-closure penalties or foreclosure charges. Upon confirmed receipt of final payment, an automated electronic lien-release instruction is dispatched to CAMS, KFintech, or the respective depository within two business hours.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-600">
          <h2 className="text-sm font-bold text-slate-900">5. Grievance Redressal &amp; Nodal Officer</h2>
          <p>
            Inquiries regarding loan account numbers, lien certificates, or auto-debit adjustments should be addressed to grievance@1fi.app with your unique Loan Account Number (LAN).
          </p>
        </section>
      </div>
    </div>
  );
}
