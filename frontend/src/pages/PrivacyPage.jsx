import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock } from 'lucide-react';

export default function PrivacyPage() {
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
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
            <span>Data Protection Compliance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Privacy Policy &amp; Information Security Standards
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Compliant with Digital Personal Data Protection (DPDP) Act 2023 &amp; RBI Master Directions on Digital Lending
          </p>
        </div>

        <section className="space-y-3 text-xs leading-relaxed text-slate-600">
          <h2 className="text-sm font-bold text-slate-900">1. Data Collected Solely for Underwriting &amp; Lien Placement</h2>
          <p>
            1Fi collects only information necessary to complete statutory KYC and lien registration:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>Permanent Account Number (PAN) for identity verification against the Income Tax Department database.</li>
            <li>Depository Account Number (DP ID) and Mutual Fund Folio numbers to execute digital lien marking via CAMS or KFintech.</li>
            <li>Bank account information for National Automated Clearing House (NACH) auto-debit configuration.</li>
          </ul>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-600">
          <h2 className="text-sm font-bold text-slate-900">2. Strict Zero Data-Monetization Policy</h2>
          <p>
            1Fi never sells, leases, or trades user financial data, mutual fund balances, or portfolio records to third-party marketing brokers or credit bureaus for non-lending purposes.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-600">
          <h2 className="text-sm font-bold text-slate-900">3. Encryption &amp; Storage Architecture</h2>
          <p>
            All data in transit is encrypted using Transport Layer Security (TLS 1.3). Sensitive identifying information, including PAN and account numbers, is encrypted at rest using AES-256 GCM encryption algorithms.
          </p>
        </section>

        <section className="space-y-3 text-xs leading-relaxed text-slate-600">
          <h2 className="text-sm font-bold text-slate-900">4. Right to Erasure &amp; Consent Revocation</h2>
          <p>
            Following complete loan settlement and confirmed lien release, users may request complete deletion of stored non-statutory records by writing to privacy@1fi.app.
          </p>
        </section>
      </div>
    </div>
  );
}
