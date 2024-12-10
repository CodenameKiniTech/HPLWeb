"use client"

import { useEffect, useState } from "react"
import { requireAuth } from "utils/auth"
import Sidebar from "components/Sidebar"
import { SalesChart } from "components/SalesChart"
import { LatestOrders } from "components/LatestOrder"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await requireAuth()
        setUser(currentUser)
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white-400">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#FBAD26] min-h-screen">
      <Sidebar />
      <main className="lg:pl-72">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SalesChart />
            <LatestOrders />
          </div>
        </div>
      </main>
    </div>
  )
}

