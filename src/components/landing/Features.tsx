import { FileText, Brain, Users, Clock, Shield, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "Easy Submission",
    description: "Submit complaints through a simple, user-friendly form. No complex procedures or paperwork required.",
  },
  {
    icon: Brain,
    title: "AI Categorization",
    description: "Our NLP system automatically analyzes and categorizes complaints, routing them to the right department.",
  },
  {
    icon: Clock,
    title: "Priority Assignment",
    description: "AI assigns urgency levels based on complaint severity, ensuring critical issues get immediate attention.",
  },
  {
    icon: Users,
    title: "Department Routing",
    description: "Complaints are automatically assigned to relevant government departments for faster resolution.",
  },
  {
    icon: Shield,
    title: "Transparent Tracking",
    description: "Track your complaint status in real-time. Complete transparency from submission to resolution.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Authorities get comprehensive analytics to identify patterns and improve service delivery.",
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform streamlines the grievance redressal process, 
            making it efficient for citizens and authorities alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="border-border/50 shadow-card hover:shadow-elevated transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
