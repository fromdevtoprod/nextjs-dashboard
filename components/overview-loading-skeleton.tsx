'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Heart, Users, Clipboard, BarChart2, Settings, LogOut } from "lucide-react"

export function OverviewLoadingSkeletonComponent() {
  return (
    <div className="flex h-screen bg-[#F8F4E3]">
      {/* Navigation Skeleton */}
      <nav className="hidden md:block w-64 bg-white shadow-md p-4">
        <div className="flex items-center space-x-2 mb-6">
          <Heart className="h-8 w-8 text-[#7C9885]" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-10 w-full mb-6" />
        <div className="space-y-2">
          {[BarChart2, CalendarDays, Users, Clipboard, Settings].map((Icon, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-[#7C9885]" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-2">
            <LogOut className="h-5 w-5 text-[#2C3E50]" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </nav>

      {/* Main Content Skeleton */}
      <main className="flex-1 overflow-y-auto p-8">
        <Skeleton className="h-10 w-48 mb-8" /> {/* Page Title */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-24" />
                </CardTitle>
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Appointments Overview */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="ml-4 space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="ml-4 space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}