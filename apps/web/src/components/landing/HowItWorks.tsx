import { SectionHeading } from '../ui/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Open the Assistant',
    description:
      'Launch FIFA Smart Assistant on your device as you enter the stadium. No downloads required — works instantly in your browser.',
  },
  {
    number: '02',
    title: 'Ask or Explore',
    description:
      'Chat with the AI concierge, browse the interactive map, or let smart suggestions guide you based on your location and preferences.',
  },
  {
    number: '03',
    title: 'Enjoy the Experience',
    description:
      'Navigate effortlessly, discover hidden gems, and focus on what matters — the beautiful game unfolding before you.',
  },
];

export function HowItWorks() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="How It Works"
          title="Three steps to a smarter stadium visit"
          description="Simple, intuitive, and designed for the moment you step through the gates."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`animate-fade-in-up relative text-center ${index === 1 ? 'animation-delay-200' : index === 2 ? 'animation-delay-400' : ''}`}
            >
              {index < steps.length - 1 && (
                <div className="pointer-events-none absolute left-[calc(50%+40px)] top-8 hidden h-px w-[calc(100%-80px)] bg-gradient-to-r from-cyan-400/30 to-transparent md:block" />
              )}

              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-xl font-bold text-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                {step.number}
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
