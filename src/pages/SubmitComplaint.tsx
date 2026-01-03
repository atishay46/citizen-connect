import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ComplaintForm } from "@/components/complaint/ComplaintForm";
import { Shield, Brain, Clock } from "lucide-react";

const SubmitComplaint = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-background">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Submit a Complaint
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your voice matters. Submit your grievance and our AI-powered system will 
              ensure it reaches the right authorities for swift resolution.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Secure & Private</p>
                <p className="text-xs text-muted-foreground">Your data is protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                <Brain className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">AI Analysis</p>
                <p className="text-xs text-muted-foreground">Smart categorization</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
              <div className="h-10 w-10 rounded-lg bg-status-resolved/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-status-resolved" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Quick Response</p>
                <p className="text-xs text-muted-foreground">Faster resolution</p>
              </div>
            </div>
          </div>

          {/* Complaint Form */}
          <ComplaintForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitComplaint;
