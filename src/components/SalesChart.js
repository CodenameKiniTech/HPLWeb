"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/Card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "components/ui/Chart"

const salesData = [
  { month: "Jan", jersey: 65, tshirt: 28, hoodie: 45, corporatePolo: 30 },
  { month: "Feb", jersey: 59, tshirt: 32, hoodie: 40, corporatePolo: 35 },
  { month: "Mar", jersey: 45, tshirt: 38, hoodie: 35, corporatePolo: 40 },
  { month: "Apr", jersey: 30, tshirt: 42, hoodie: 30, corporatePolo: 45 },
  { month: "May", jersey: 25, tshirt: 45, hoodie: 25, corporatePolo: 50 },
  { month: "Jun", jersey: 35, tshirt: 40, hoodie: 35, corporatePolo: 45 },
]

export function SalesChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>HENERAL PRINTING LAB</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            jersey: {
              label: "Jersey",
              color: "hsl(280 100% 70%)",
            },
            tshirt: {
              label: "T-shirt",
              color: "hsl(25 95% 53%)",
            },
            hoodie: {
              label: "Hoodie",
              color: "hsl(215 100% 50%)",
            },
            corporatePolo: {
              label: "Corporate Polo",
              color: "hsl(142 72% 29%)",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="jersey" stroke="hsl(280 100% 70%)" strokeWidth={2} />
              <Line type="monotone" dataKey="tshirt" stroke="hsl(25 95% 53%)" strokeWidth={2} />
              <Line type="monotone" dataKey="hoodie" stroke="hsl(215 100% 50%)" strokeWidth={2} />
              <Line type="monotone" dataKey="corporatePolo" stroke="hsl(142 72% 29%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip>
        <ChartTooltipContent active={active} payload={payload} label={label} />
      </ChartTooltip>
    )
  }
  return null
}

