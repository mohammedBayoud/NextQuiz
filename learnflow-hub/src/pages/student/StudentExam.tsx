import { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockExams } from '@/data/mockData';
import { toast } from 'sonner';

export default function StudentExam() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exam = mockExams.find(e => e.id === id);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(exam?.duration ? exam.duration * 60 : 0); // seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!exam || isSubmitted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    let correct = 0;
    exam?.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const calculatedScore = exam
      ? Math.round((correct / exam.questions.length) * 100)
      : 0;

    setScore(calculatedScore);
    setIsSubmitted(true);
    toast.success('Exam submitted successfully!');
  };

  if (!exam) {
    return (
      <StudentLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Exam not found</h2>
          <Button onClick={() => navigate('/student/exams')} className="mt-4">
            Back to Exams
          </Button>
        </div>
      </StudentLayout>
    );
  }

  if (isSubmitted) {
    return (
      <StudentLayout>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Exam Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div
                  className={`mx-auto h-24 w-24 rounded-full flex items-center justify-center mb-4 ${
                    (score || 0) >= 70 ? 'bg-success/20' : 'bg-destructive/20'
                  }`}
                >
                  {(score || 0) >= 70 ? (
                    <CheckCircle2 className="h-12 w-12 text-success" />
                  ) : (
                    <AlertCircle className="h-12 w-12 text-destructive" />
                  )}
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  Score: {score}%
                </h3>
                <p className="text-muted-foreground">
                  You answered {Object.values(selectedAnswers).filter((ans, idx) => 
                    ans === exam.questions[idx].correctAnswer
                  ).length} out of {exam.questions.length} questions correctly.
                </p>
              </div>

              <div className="space-y-4">
                {exam.questions.map((question, index) => {
                  const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
                  const selectedAnswer = selectedAnswers[question.id];
                  
                  return (
                    <div
                      key={question.id}
                      className={`p-4 border rounded-lg ${
                        isCorrect ? 'border-success' : 'border-destructive'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-3">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">
                            Question {index + 1}: {question.question}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Your answer: {question.options[selectedAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-success mt-1">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button onClick={() => navigate('/student/exams')} className="w-full">
                Back to Exams
              </Button>
            </CardContent>
          </Card>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{exam.title}</CardTitle>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-mono font-bold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {exam.questions.map((question, index) => (
              <div key={question.id} className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-primary">{index + 1}.</span>
                  <p className="font-medium flex-1">{question.question}</p>
                </div>
                <RadioGroup
                  value={selectedAnswers[question.id]?.toString()}
                  onValueChange={(value) =>
                    setSelectedAnswers({
                      ...selectedAnswers,
                      [question.id]: parseInt(value),
                    })
                  }
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={optionIndex.toString()}
                        id={`${question.id}-${optionIndex}`}
                      />
                      <Label
                        htmlFor={`${question.id}-${optionIndex}`}
                        className="cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {Object.keys(selectedAnswers).length} of {exam.questions.length} questions answered
              </p>
              <Button onClick={handleSubmit} size="lg">
                Submit Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}

