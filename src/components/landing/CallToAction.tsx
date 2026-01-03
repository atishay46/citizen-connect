import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, LayoutDashboard } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Citizens */}
          <div className="bg-card border border-border rounded-xl p-8 md:p-10 shadow-card hover:shadow-elevated transition-shadow duration-300">
            <div className="h-14 w-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
              <MessageSquare className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              For Citizens
            </h3>
            <p className="text-muted-foreground mb-6">
              Have a complaint or grievance? Submit it through our platform and let AI help route it 
              to the right authorities for faster resolution.
            </p>
            <Button size="lg" asChild className="group">
              <Link to="/submit">
                Submit a Complaint
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* For Authorities */}
          <div className="bg-card border border-border rounded-xl p-8 md:p-10 shadow-card hover:shadow-elevated transition-shadow duration-300">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <LayoutDashboard className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              For Authorities
            </h3>
            <p className="text-muted-foreground mb-6">
              Access the dashboard to view, manage, and resolve citizen complaints. 
              AI-powered prioritization helps you focus on what matters most.
            </p>
            <Button size="lg" variant="outline" asChild className="group">
              <Link to="/dashboard">
                Access Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
