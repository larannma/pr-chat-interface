import { useState } from "react"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useCreateMatrixMutation } from "@/store/api"
import type { Matrix } from "@/types"
import { useNavigate } from "react-router-dom"

type NewGroupInput = {
  name: string
  description: string
  type: "hard" | "soft"
  skills: string
}

export default function MatrixForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("")
  const [groups, setGroups] = useState<NewGroupInput[]>([
    { name: "", description: "", type: "hard", skills: "" },
  ])
  const [createMatrix] = useCreateMatrixMutation()
  const navigate = useNavigate() 

  const addGroup = () =>
    setGroups([...groups, { name: "", description: "", type: "hard", skills: "" }])

  const removeGroup = (index: number) =>
    setGroups(groups.filter((_, i) => i !== index))

  const handleGroupChange = (
    index: number,
    field: keyof NewGroupInput,
    value: string
  ) => {
    const updated = [...groups]
    updated[index][field] = value
    setGroups(updated)
  }

  const handleSubmit = async () => {
    const formattedGroups = groups.map((g) => ({
      name: g.name,
      description: g.description,
      type: g.type,
      skills: g.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((name) => ({ name })),
    }))

    const newMatrix: Omit<Matrix, "id"> = {
      title,
      groups: formattedGroups,
    }

    const res = await createMatrix(newMatrix)
    if ("data" in res) {
      navigate("/all-matrices")
      onSuccess()
      setTitle("")
      setGroups([{ name: "", description: "", type: "hard", skills: "" }])
    }
  }

  return (
<DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
  <DialogHeader>
    <DialogTitle>Создать новую матрицу</DialogTitle>
  </DialogHeader>

  {/* Scrollable content */}
  <div className="space-y-4 overflow-y-auto max-h-[65vh] pr-2">
    <Input
      placeholder="Matrix title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    {groups.map((group, index) => (
      <div key={index} className="border p-4 rounded-md space-y-2 relative">
        {groups.length > 1 && (
          <button
            type="button"
            onClick={() => removeGroup(index)}
            className="absolute top-2 right-2 text-red-500"
          >
            <Trash2 size={16} />
          </button>
        )}
        <Input
          placeholder="Group name"
          value={group.name}
          onChange={(e) => handleGroupChange(index, "name", e.target.value)}
        />
        <Textarea
          placeholder="Group description"
          value={group.description}
          onChange={(e) =>
            handleGroupChange(index, "description", e.target.value)
          }
        />
        <Input
          placeholder="Comma-separated skills"
          value={group.skills}
          onChange={(e) =>
            handleGroupChange(index, "skills", e.target.value)
          }
        />
      </div>
    ))}
  </div>

  <DialogFooter className="flex justify-between">
    <Button variant="outline" onClick={addGroup}>
      <Plus className="mr-2 h-4 w-4" />
      Добавить еще раздел
    </Button>
    <Button onClick={handleSubmit}>Create Matrix</Button>
  </DialogFooter>
</DialogContent>

  )
}
