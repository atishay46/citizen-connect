import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-serif text-lg font-bold text-foreground">
                GrievanceAI
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered citizen grievance redressal for smarter, faster, and more transparent governance.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans text-sm font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/submit" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Submit Complaint
              </Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Authority Dashboard
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans text-sm font-semibold text-foreground">Contact</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Government of India Initiative</p>
              <p>support@grievanceai.gov.in</p>
              <p>Toll Free: 1800-XXX-XXXX</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} GrievanceAI Platform. All rights reserved. 
            A Government of India Initiative for Digital Governance.
          </p>
        </div>
      </div>
    </footer>
  );
}
