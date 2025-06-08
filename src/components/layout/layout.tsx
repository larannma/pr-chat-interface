import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()

  // Split path and filter out empty segments
  const segments = location.pathname.split("/").filter(Boolean)

  // Show back button only if route has more than one segment
  const showBackButton = segments.length > 1

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1 p-6 space-y-4">
          {/* Header row */}
          <div className="flex items-center space-x-2">
            <SidebarTrigger />

            {showBackButton && (
              <Button onClick={() => navigate(-1)} variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
          </div>

          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
