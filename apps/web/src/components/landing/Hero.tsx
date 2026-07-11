import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(34, 211, 238, 0.3), transparent)',
          }}
        />
        <div
          className="absolute -left-1/4 top-1/4 h-[600px] w-[600px] animate-pulse-glow rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
        />
        <div
          className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] animate-pulse-glow rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #a855f7, transparent 70%)',
            animationDelay: '1.5s',
          }}
        />
        <div
          className="absolute inset-0 bg-[length:200%_200%] opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #22d3ee 0%, #3b82f6 25%, #a855f7 50%, #3b82f6 75%, #22d3ee 100%)',
            animation: 'gradientShift 12s ease infinite',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            Powered by AI
          </div>

          <h1 className="animate-fade-in-up animation-delay-100 mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI-Powered Smart{' '}
            <span className="text-gradient">Stadium Experience</span>
          </h1>

          <p className="animate-fade-in-up animation-delay-200 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            Your intelligent companion for FIFA stadiums. Navigate seamlessly, discover amenities,
            and get real-time assistance — all powered by cutting-edge AI.
          </p>

          <div className="animate-fade-in-up animation-delay-300 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="primary" className="min-w-[180px] px-8 py-3.5">
              Explore Stadium
            </Button>
            <Button variant="secondary" className="min-w-[180px] px-8 py-3.5">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
