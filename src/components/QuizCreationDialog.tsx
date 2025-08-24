import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

interface QuizCreationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuizCreationDialog = ({ isOpen, onOpenChange }: QuizCreationDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [week, setWeek] = useState("");
  const [timeLimit, setTimeLimit] = useState("30");
  const [questions, setQuestions] = useState<Question[]>([{
    id: "1",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    points: 10
  }]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 10
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const handleSubmit = () => {
    if (!title || !week || questions.some(q => !q.question || q.options.some(opt => !opt))) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // TODO: Save quiz to database
    console.log("Creating quiz:", { title, description, week, timeLimit, questions });
    
    toast({
      title: "Quiz Created Successfully",
      description: `Week ${week}: ${title} has been created`,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setWeek("");
    setTimeLimit("30");
    setQuestions([{
      id: "1",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 10
    }]);
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Quiz</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Quiz Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title *</Label>
              <Input 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="week">Week Number *</Label>
              <Input 
                id="week"
                type="number"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                placeholder="e.g., 1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter quiz description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
            <Input 
              id="timeLimit"
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              placeholder="30"
            />
          </div>

          {/* Questions */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Questions</h3>
              <Button onClick={addQuestion} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>

            {questions.map((question, qIndex) => (
              <Card key={question.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Question {qIndex + 1}</CardTitle>
                    {questions.length > 1 && (
                      <Button 
                        onClick={() => removeQuestion(question.id)} 
                        variant="outline" 
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question Text *</Label>
                    <Textarea 
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      placeholder="Enter your question"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="space-y-2">
                        <Label>Option {optIndex + 1} *</Label>
                        <Input 
                          value={option}
                          onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                          placeholder={`Option ${optIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Correct Answer</Label>
                      <Select 
                        value={question.correctAnswer.toString()} 
                        onValueChange={(value) => updateQuestion(question.id, 'correctAnswer', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options.map((_, idx) => (
                            <SelectItem key={idx} value={idx.toString()}>
                              Option {idx + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Points</Label>
                      <Input 
                        type="number"
                        value={question.points}
                        onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value))}
                        min="1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-primary to-primary-glow">
              Create Quiz
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizCreationDialog;