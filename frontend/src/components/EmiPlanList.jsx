import EmiPlanCard from './EmiPlanCard.jsx';

export default function EmiPlanList({ plans, selectedPlanId, onSelect }) {
  if (!plans || plans.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-xs text-slate-400">
        No EMI plans available for this variant.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {plans.map((plan) => (
        <EmiPlanCard
          key={plan.id}
          plan={plan}
          isSelected={plan.id === selectedPlanId}
          onSelect={() => onSelect(plan.id)}
        />
      ))}
    </div>
  );
}
