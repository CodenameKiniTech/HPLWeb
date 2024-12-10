import { Card, CardContent, CardHeader, CardTitle } from "components/ui/Card"
import Image from "next/image"

const latestOrders = [
  {
    id: 1,
    image: "/assets/JERSEY3.png?height=200&width=150",
    name: "North Cobras Jersey Short",
  },
  {
    id: 2,
    image: "/assets/JERSEY2.png?height=200&width=150",
    name: "North Cobras Jersey",
  },
  {
    id: 3,
    image: "/assets/JERSEY1.png?height=200&width=150",
    name: "North Cobras Jersey",
  },
  {
    id: 4,
    image: "/assets/LONGSLEEVE1.png?height=200&width=150",
    name: "North Cobras Long Sleeve",
  },
]

export function LatestOrders() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>LATEST ORDER:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestOrders.map((order) => (
            <div key={order.id} className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src={order.image}
                alt={order.name}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

