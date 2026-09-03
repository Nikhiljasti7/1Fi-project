/**
 * Approved collateral instruments for Wealth-Backed EMI.
 * Regulated under RBI / SEBI guidelines for Loan Against Mutual Funds & Securities (LAMF).
 */

const APPROVED_MUTUAL_FUNDS = [
  {
    id: 'mf-1',
    name: 'Parag Parikh Flexi Cap Fund - Direct Growth',
    amc: 'PPFAS Mutual Fund',
    category: 'Equity - Flexi Cap',
    nav: 84.22,
    cagr3Y: 21.4,
    cagr1Y: 34.2,
    ltv: 0.50, // 50% Loan-to-Value per SEBI guidelines for equity
    risk: 'Very High',
    aum: '₹68,450 Cr',
    defaultUnits: 2400, // sample portfolio holding ~ ₹2,02,128
  },
  {
    id: 'mf-2',
    name: 'HDFC Top 100 Fund - Direct Growth',
    amc: 'HDFC AMC',
    category: 'Equity - Large Cap',
    nav: 942.15,
    cagr3Y: 19.8,
    cagr1Y: 28.6,
    ltv: 0.50,
    risk: 'Very High',
    aum: '₹34,120 Cr',
    defaultUnits: 180, // ~ ₹1,69,587
  },
  {
    id: 'mf-3',
    name: 'UTI Nifty 50 Index Fund - Direct Growth',
    amc: 'UTI Mutual Fund',
    category: 'Equity - Index',
    nav: 172.48,
    cagr3Y: 15.6,
    cagr1Y: 24.1,
    ltv: 0.50,
    risk: 'Very High',
    aum: '₹18,900 Cr',
    defaultUnits: 1200, // ~ ₹2,06,976
  },
  {
    id: 'mf-4',
    name: 'Mirae Asset Large Cap Fund - Direct Growth',
    amc: 'Mirae Asset',
    category: 'Equity - Large Cap',
    nav: 118.50,
    cagr3Y: 16.8,
    cagr1Y: 26.4,
    ltv: 0.50,
    risk: 'Very High',
    aum: '₹39,800 Cr',
    defaultUnits: 1500, // ~ ₹1,77,750
  },
  {
    id: 'mf-5',
    name: 'ICICI Prudential Liquid Fund - Direct Growth',
    amc: 'ICICI Prudential',
    category: 'Debt - Liquid',
    nav: 358.90,
    cagr3Y: 7.2,
    cagr1Y: 7.4,
    ltv: 0.80, // 80% LTV for low-risk liquid debt
    risk: 'Low',
    aum: '₹52,000 Cr',
    defaultUnits: 400, // ~ ₹1,43,560
  },
  {
    id: 'mf-6',
    name: 'SBI Bluechip Fund - Direct Growth',
    amc: 'SBI Mutual Fund',
    category: 'Equity - Large Cap',
    nav: 88.35,
    cagr3Y: 17.5,
    cagr1Y: 27.2,
    ltv: 0.50,
    risk: 'Very High',
    aum: '₹44,300 Cr',
    defaultUnits: 1800, // ~ ₹1,59,030
  },
];

const APPROVED_STOCKS = [
  {
    id: 'stk-1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    exchange: 'NSE',
    marketPrice: 2980.50,
    cagr1Y: 24.5,
    cagr3Y: 18.2,
    ltv: 0.50,
    sector: 'Conglomerate / Energy & Retail',
    defaultShares: 80, // ~ ₹2,38,440
  },
  {
    id: 'stk-2',
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd',
    exchange: 'NSE',
    marketPrice: 4210.00,
    cagr1Y: 19.8,
    cagr3Y: 14.6,
    ltv: 0.50,
    sector: 'Information Technology',
    defaultShares: 50, // ~ ₹2,10,500
  },
  {
    id: 'stk-3',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    exchange: 'NSE',
    marketPrice: 1642.30,
    cagr1Y: 14.2,
    cagr3Y: 12.1,
    ltv: 0.50,
    sector: 'Banking & Financials',
    defaultShares: 120, // ~ ₹1,97,076
  },
  {
    id: 'stk-4',
    symbol: 'INFY',
    name: 'Infosys Ltd',
    exchange: 'NSE',
    marketPrice: 1855.40,
    cagr1Y: 22.1,
    cagr3Y: 15.3,
    ltv: 0.50,
    sector: 'Information Technology',
    defaultShares: 90, // ~ ₹1,66,986
  },
  {
    id: 'stk-5',
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Passenger Vehicles',
    exchange: 'NSE',
    marketPrice: 982.70,
    cagr1Y: 42.0,
    cagr3Y: 31.8,
    ltv: 0.50,
    sector: 'Automotive & EV',
    defaultShares: 200, // ~ ₹1,96,540
  },
];

// In-memory orders store
let activeOrders = [
  {
    orderId: '1FI-ORD-98214',
    loanAccountNumber: '1FI-LAMF-884021',
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    product: {
      name: 'iPhone 16 Pro Max',
      variantLabel: '256GB / Desert Titanium',
      sellingPrice: 139900,
      imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=85',
    },
    plan: {
      tenureMonths: 12,
      monthlyPayment: 11658.33,
      annualInterestRate: 0,
      cashbackAmount: 8000,
      totalPayable: 139900,
      effectiveAmountAfterCashback: 131900,
    },
    pledgedAsset: {
      type: 'MUTUAL_FUND',
      name: 'Parag Parikh Flexi Cap Fund',
      unitsPledged: 332,
      pledgedValue: 279600,
      ltvAllowed: 139800,
    },
    repaymentSchedule: {
      totalEmis: 12,
      paidEmis: 1,
      nextEmiDate: new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10),
      autoDebitStatus: 'ACTIVE_ENACH',
      bankName: 'HDFC Bank (•••• 4128)',
    },
    lienStatus: 'ACTIVE_LIEN',
    deliveryStatus: 'DELIVERED',
  },
];

function getApprovedCollateral() {
  return {
    mutualFunds: APPROVED_MUTUAL_FUNDS,
    stocks: APPROVED_STOCKS,
  };
}

function getActiveOrders() {
  return activeOrders;
}

function addOrder(orderData) {
  const orderId = `1FI-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  const loanAccountNumber = `1FI-LAMF-${Math.floor(100000 + Math.random() * 900000)}`;
  const newOrder = {
    orderId,
    loanAccountNumber,
    createdAt: new Date().toISOString(),
    ...orderData,
    lienStatus: 'ACTIVE_LIEN',
    deliveryStatus: 'PROCESSING',
    repaymentSchedule: {
      totalEmis: orderData.plan.tenureMonths,
      paidEmis: 0,
      nextEmiDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      autoDebitStatus: 'ACTIVE_ENACH',
      bankName: orderData.bankDetails?.bankName || 'Verified Salaried Account (•••• 7821)',
    },
  };
  activeOrders.unshift(newOrder);
  return newOrder;
}

function prepayOrderEmi(orderId) {
  const order = activeOrders.find((o) => o.orderId === orderId);
  if (!order) return null;
  order.repaymentSchedule.paidEmis = Math.min(
    order.repaymentSchedule.paidEmis + 1,
    order.repaymentSchedule.totalEmis
  );
  if (order.repaymentSchedule.paidEmis === order.repaymentSchedule.totalEmis) {
    order.lienStatus = 'LIEN_RELEASED';
    order.deliveryStatus = 'LOAN_CLOSED';
  }
  return order;
}

module.exports = {
  APPROVED_MUTUAL_FUNDS,
  APPROVED_STOCKS,
  getApprovedCollateral,
  getActiveOrders,
  addOrder,
  prepayOrderEmi,
};
