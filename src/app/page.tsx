import Link from 'next/link';
import { Activity, MapPin, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="w-full bg-grid-pattern min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8">
      <div className="max-w-[800px] w-full space-y-12 animate-fade-in-up text-center mt-[-4rem]">
        
        <div className="space-y-6">
          <div className="chip mx-auto">LIVE DIGITAL TWIN PLATFORM</div>
          <h1 className="text-[64px] md:text-[88px] font-semibold leading-tight tracking-tight">
            Understand the <i className="text-accentWarm font-serif">corridor</i>. <br />
            Prevent the <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentWarm to-white">bottleneck</span>.
          </h1>
          <p className="text-text2 text-xl max-w-2xl mx-auto font-light">
            Real-time cargo intelligence and AI decision support for the Trans-Caspian logistics corridor.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href="/login" className="btn !px-8 !py-4 !text-base bg-surface1 text-text1 border-border1 hover:border-accentWarm">
            Open Operations Center
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          <div className="card group">
            <div className="card__aura" style={{ background: 'radial-gradient(400px circle at 50% 50%, rgba(255,214,120,0.06), transparent)' }} />
            <MapPin className="w-6 h-6 text-accentWarm mb-4" />
            <h3 className="text-lg font-medium text-text1 mb-2">LIVE CARGO TWIN</h3>
            <p className="text-text3 text-sm">Know where cargo is and what state it is in, powered by real-time IoT and supply chain data.</p>
          </div>
          <div className="card group">
            <div className="card__aura" style={{ background: 'radial-gradient(400px circle at 50% 50%, rgba(255,214,120,0.06), transparent)' }} />
            <Activity className="w-6 h-6 text-accentWarm mb-4" />
            <h3 className="text-lg font-medium text-text1 mb-2">BOTTLENECK RADAR</h3>
            <p className="text-text3 text-sm">Predict where delays will emerge hours before they happen using continuous corridor monitoring.</p>
          </div>
          <div className="card group">
            <div className="card__aura" style={{ background: 'radial-gradient(400px circle at 50% 50%, rgba(255,214,120,0.06), transparent)' }} />
            <Zap className="w-6 h-6 text-accentWarm mb-4" />
            <h3 className="text-lg font-medium text-text1 mb-2">AI INTERVENTION</h3>
            <p className="text-text3 text-sm">Simulate and apply the action that prevents congestion with actionable AI-driven recommendations.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
