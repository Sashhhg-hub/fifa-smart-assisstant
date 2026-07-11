import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: string;
}

export function FeatureCard({ icon, title, description, delay = '' }: FeatureCardProps) {
  return (
    <div
      className={`group animate-fade-in-up glass rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(34,211,238,0.08)] ${delay}`}
    >
      <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 p-3 text-cyan-400 transition-colors duration-300 group-hover:from-cyan-400/20 group-hover:to-purple-500/20">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </div>
  );
}
