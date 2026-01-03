import { ArrowDown } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Submit Complaint",
    description: "Citizen describes their grievance through our simple online form.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "NLP engine analyzes the complaint text to understand the issue.",
  },
  {
    number: "03",
    title: "Auto-Categorize",
    description: "AI assigns category and urgency level based on content analysis.",
  },
  {
    number: "04",
    title: "Route to Authority",
    description: "Complaint is automatically assigned to the relevant department.",
  },
  {
    number: "05",
    title: "Resolution",
    description: "Authorities act on the complaint and update status in real-time.",
  },
];

export function ProcessFlow() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From submission to resolution, our streamlined process ensures your grievance is handled efficiently.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div 
                className="flex gap-6 items-start animate-slide-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="font-serif text-lg font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-border my-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
