import { useGetMatricesQuery } from "@/store/api"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

export default function MatrixView() {
  const { data, isLoading, error } = useGetMatricesQuery()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (isLoading) return <p className="p-6">Loading...</p>
  if (error || !data || !data.length) return <p className="p-6">Error loading matrix.</p>

  const matrix = data[0]

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">{matrix.title}</h2>

      {matrix.groups.map((group, index) => {
        const isOpen = openIndex === index
        return (
          <Collapsible key={group.name} open={isOpen}>
            <Card
              onClick={() => toggle(index)}
              className="cursor-pointer transition hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{group.name}</CardTitle>
                <ChevronRight
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </CardHeader>

              <CollapsibleContent>
                <CardContent className="space-y-2">
                  {group.description && (
                    <p className="text-sm text-muted-foreground">
                      {group.description}
                    </p>
                  )}
                  <ul className="list-disc list-inside text-sm">
                    {group.skills.map((skill, i) => (
                      <li key={i}>{skill.name}</li>
                    ))}
                  </ul>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )
      })}
    </div>
  )
}
