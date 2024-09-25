'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"

export function LoginPageComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4E3]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-2">
          <Heart className="h-12 w-12 text-[#7C9885]" />
          <h1 className="text-3xl font-bold text-[#7C9885]">CareSchedule</h1>
          <h2 className="text-xl font-semibold text-[#2C3E50]">Welcome Back</h2>
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#2C3E50]">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              className="w-full px-3 py-2 border border-[#A4C3D2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C9885]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#2C3E50]">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 border border-[#A4C3D2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C9885]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" className="border-[#A4C3D2] text-[#7C9885] focus:ring-[#7C9885]" />
              <Label htmlFor="remember" className="ml-2 text-sm text-[#2C3E50]">
                Remember me
              </Label>
            </div>
            <Link href="/forgot-password" className="text-sm text-[#7C9885] hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full bg-[#7C9885] text-white hover:bg-[#6A8A73]">
            Log in
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-[#2C3E50]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#7C9885] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}