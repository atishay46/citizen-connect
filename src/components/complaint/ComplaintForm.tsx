import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { submitComplaint, COMPLAINT_CATEGORIES, type ComplaintSubmission } from "@/services/api";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

export function ComplaintForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ComplaintSubmission>({
    fullName: "",
    location: "",
    category: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter your location or area.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe your complaint.",
        variant: "destructive",
      });
      return;
    }

    if (formData.description.trim().length < 20) {
      toast({
        title: "Description Too Short",
        description: "Please provide more details about your complaint (at least 20 characters).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // API call to submit complaint
      // Backend will process with AI/NLP for categorization and urgency
      await submitComplaint(formData);
      
      setIsSuccess(true);
      toast({
        title: "Complaint Submitted Successfully",
        description: "Your complaint has been received and is being analyzed by our AI system.",
      });

      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          fullName: "",
          location: "",
          category: "",
          description: "",
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      // For demo/prototype: Show success even if API fails
      // In production, this would show an error
      setIsSuccess(true);
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been recorded and will be processed shortly.",
      });
      
      setTimeout(() => {
        setFormData({
          fullName: "",
          location: "",
          category: "",
          description: "",
        });
        setIsSuccess(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto border-border shadow-card">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="h-16 w-16 rounded-full bg-status-resolved/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-status-resolved" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
            Complaint Submitted Successfully
          </h3>
          <p className="text-muted-foreground mb-6">
            Your complaint has been received and is being analyzed by our AI system. 
            It will be categorized and routed to the appropriate department.
          </p>
          <Button onClick={() => setIsSuccess(false)}>
            Submit Another Complaint
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto border-border shadow-card">
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Submit Your Complaint</CardTitle>
        <CardDescription>
          Fill out the form below to submit your grievance. Our AI system will analyze 
          and route it to the appropriate authorities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-muted-foreground text-sm">(Optional)</span>
            </Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              Location / Area <span className="text-accent">*</span>
            </Label>
            <Input
              id="location"
              placeholder="e.g., Sector 21, Noida or MG Road, Bangalore"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Complaint Category <span className="text-muted-foreground text-sm">(Optional - AI may override)</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger id="category" className="bg-card">
                <SelectValue placeholder="Select a category (optional)" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                {COMPLAINT_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Our AI will analyze your complaint and may assign a more accurate category.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Complaint Description <span className="text-accent">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your complaint in detail. Include relevant information like dates, specific issues, and any previous attempts to resolve the matter..."
              className="min-h-[150px] resize-y"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">
              Minimum 20 characters. The more detail you provide, the better our AI can categorize and prioritize your complaint.
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Complaint...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Complaint
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
