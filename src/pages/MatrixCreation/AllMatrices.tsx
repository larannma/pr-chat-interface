import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useGetMatricesQuery } from "@/store/api"
import MatrixForm from "./MatrixForm"
import MatrixCard from "./MatrixCard"

export default function AllMatrices() {
  const { data, isLoading, error } = useGetMatricesQuery()
  const [dialogOpen, setDialogOpen] = useState(false)

  if (isLoading) return <p className="p-6">Loading...</p>
  if (error || !data) return <p className="p-6">Error loading matrices</p>

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Матрицы компетенций</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Новая
            </Button>
          </DialogTrigger>
          <MatrixForm onSuccess={() => setDialogOpen(false)} />
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((matrix) => (
          <MatrixCard key={matrix.id} matrix={matrix} />
        ))}
      </div>
    </div>
  )
}
