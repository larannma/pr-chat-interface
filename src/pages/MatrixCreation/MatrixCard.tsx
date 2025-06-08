import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Matrix } from "@/types"

export default function MatrixCard({ matrix }: { matrix: Matrix }) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/matrix/${matrix.id}`)}
      className="cursor-pointer hover:shadow-md transition"
    >
      <CardHeader>
        <CardTitle>{matrix.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Groups: {matrix.groups.length}
        </p>
      </CardContent>
    </Card>
  )
}
