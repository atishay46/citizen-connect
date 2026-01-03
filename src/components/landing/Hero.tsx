import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm">
            <Shield className="h-4 w-4" />
            <span>Government Digital Initiative</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-fade-in">
            AI-Powered Grievance Redressal for{" "}
            <span className="text-secondary">Smarter Governance</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Submit your complaints easily. Our AI system automatically categorizes and prioritizes issues, 
            ensuring faster resolution by the right authorities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" variant="secondary" asChild className="group">
              <Link to="/submit">
                Submit a Complaint
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/dashboard">
                View Authority Dashboard
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">Fast</p>
              <p className="text-xs md:text-sm text-primary-foreground/60">AI Analysis</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">Secure</p>
              <p className="text-xs md:text-sm text-primary-foreground/60">Data Protection</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-primary-foreground">24/7</p>
              <p className="text-xs md:text-sm text-primary-foreground/60">Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
