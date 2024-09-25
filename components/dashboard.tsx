import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Heart, Users, Clipboard, BarChart2, Settings, LogOut } from "lucide-react"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen bg-[#F8F4E3]">
      {/* Full-height navigation menu */}
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-[#7C9885]" />
            <span className="text-2xl font-bold text-[#7C9885]">CareSchedule</span>
          </Link>
        </div>
        <div className="px-4 py-2">
          <Input placeholder="Search..." className="w-full" />
        </div>
        <ul className="mt-4">
          {[
            { icon: BarChart2, label: "Overview", value: "overview" },
            { icon: CalendarDays, label: "Appointments", value: "appointments" },
            { icon: Users, label: "Clients", value: "clients" },
            { icon: Clipboard, label: "Reports", value: "reports" },
            { icon: Settings, label: "Settings", value: "settings" },
          ].map((item) => (
            <li key={item.value}>
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-2 ${
                  activeTab === item.value ? "bg-[#7C9885] text-white" : "text-[#2C3E50] hover:bg-[#F8F4E3]"
                }`}
                onClick={() => setActiveTab(item.value)}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full justify-start text-[#2C3E50]">
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </div>
      </nav>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C3E50]">Welcome back, Dr. Smith</h1>
          <p className="text-[#2C3E50]">Here's what's happening with your practice today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Appointments", value: "12", icon: CalendarDays },
            { title: "New Clients", value: "3", icon: Users },
            { title: "Completed Sessions", value: "8", icon: Clipboard },
            { title: "Upcoming Breaks", value: "2", icon: Heart },
          ].map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#2C3E50]">{item.title}</CardTitle>
                <item.icon className="h-4 w-4 text-[#7C9885]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#2C3E50]">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="upcoming" className="mt-8">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
            <TabsTrigger value="recent">Recent Activities</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "10:00 AM", client: "Alice Johnson", type: "Therapy Session" },
                    { time: "11:30 AM", client: "Bob Smith", type: "Initial Consultation" },
                    { time: "2:00 PM", client: "Carol Williams", type: "Follow-up" },
                  ].map((appointment, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-16 text-sm text-[#2C3E50]">{appointment.time}</div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-[#2C3E50]">{appointment.client}</p>
                        <p className="text-sm text-[#7C9885]">{appointment.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Session completed", client: "David Brown", time: "1 hour ago" },
                    { action: "Note added", client: "Eva Davis", time: "3 hours ago" },
                    { action: "Appointment rescheduled", client: "Frank Wilson", time: "Yesterday" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-40 text-sm text-[#2C3E50]">{activity.action}</div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-[#2C3E50]">{activity.client}</p>
                        <p className="text-sm text-[#7C9885]">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}