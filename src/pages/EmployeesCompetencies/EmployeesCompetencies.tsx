import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useGetEmployeesQuery } from "@/store/employeesApi";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

// Types
export type CompetencyAnswer = { question: string; text?: string; audioUrl?: string };
export type Competency = { name: string; score: number; answers?: CompetencyAnswer[] };
export type Direction = { name: string; competencies: Competency[]; average?: number };
export type Answer = { question: string; audioUrl?: string; modelComment: string };
export type Employee = {
  user_id: string;
  directions: Direction[];
  answers?: Answer[];
};

const getColorClass = (value: number) => {
  if (value >= 4) return "text-green-600";
  if (value >= 3) return "text-yellow-600";
  if (value >= 2) return "text-orange-600";
  return "text-red-600";
};

const EmployeesCompetencies = () => {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error || !employees) return <p>Error loading data</p>;

  return (
    <div className="flex flex-col gap-4">
      {employees.map((employee) => (
        <EmployeeCard key={employee.user_id} employee={employee} />
      ))}
    </div>
  );
};

const DirectionCard = ({ direction }: { direction: Direction }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="p-3">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen((o) => !o)}>
        <p className="font-medium">
          {direction.name}: <span className={getColorClass(direction.average ?? 0)}>{direction.average?.toFixed(2)}</span>
        </p>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {open && (
        <div className="mt-2 space-y-4">
          {direction.competencies.map((comp) => (
            <div key={comp.name}>
              <p className="text-sm font-medium">
                {comp.name}: <span className={getColorClass(comp.score)}>{comp.score}</span>
              </p>
              {comp.answers?.length && (
                <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 space-y-2 mt-1">
                  {comp.answers.map((ans, i) => (
                    <li key={i}>
                      <p className="text-sm">{ans.question}</p>
                      {ans.text && <p className="text-xs italic">Ответ: {ans.text}</p>}
                      {/* {ans.audioUrl && (
                        <audio controls src={ans.audioUrl} className="mt-1" />
                      )} */}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const [expanded, setExpanded] = useState(false);
  const chartData = employee.directions.map((dir) => ({
    subject: dir.name,
    score: dir.average ?? 0,
  }));

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{employee.user_id}</h2>
        <Button size="icon" variant="ghost" onClick={() => setExpanded((e) => !e)}>
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      {!expanded && (
        <div className="mt-2 text-sm text-muted-foreground flex flex-wrap gap-4">
          {employee.directions.map((dir) => (
            <div key={dir.name}>
              <span className="font-medium mr-1">{dir.name}:</span>
              <span className={getColorClass(dir.average ?? 0)}>{dir.average?.toFixed(2) ?? "-"}</span>
            </div>
          ))}
        </div>
      )}

      {expanded && (
        <div className="mt-4 space-y-6">
          <div className="w-full h-64">
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-4">
            {employee.directions.map((dir) => (
              <DirectionCard key={dir.name} direction={dir} />
            ))}
          </div>

          {employee.answers?.length && (
            <div>
              <h3 className="text-lg font-semibold mt-4">Ответы на вопросы</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 space-y-2 mt-2">
                {employee.answers.map((answer, idx) => (
                  <li key={idx}>
                    <p className="font-medium">{answer.question}</p>
                    {/* {answer.audioUrl && (
                      <audio controls src={answer.audioUrl} className="mt-1" />
                    )} */}
                    <p className="italic text-xs text-muted-foreground mt-1">Комментарий модели: {answer.modelComment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default EmployeesCompetencies;
