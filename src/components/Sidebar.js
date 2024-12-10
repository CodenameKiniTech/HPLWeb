"use client"

import { cn } from "lib/utils"
import { Button } from "components/ui/Button"
import { LayoutDashboard, Package, ClipboardList, DollarSign, Users, LogOut } from 'lucide-react'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/Avatar"
import { logout } from 'utils/auth';

export default function Sidebar() {
  const pathname = usePathname()
  
  const navigation = [
    { name: "DASHBOARD", href: "/dashboard", icon: LayoutDashboard },
    { name: "PRODUCTS", href: "/products", icon: Package },
    { name: "INVENTORY", href: "/inventory", icon: ClipboardList },
    { name: "SALES", href: "/sales", icon: DollarSign },
    { name: "USERS", href: "/users", icon: Users },
  ]

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center gap-4 py-12">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/assets/profile.png" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-orange-500">ADMIN</span>
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-4",
                          pathname === item.href && "bg-orange-100 hover:bg-orange-200"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <Button variant="ghost" className="w-full justify-start gap-4" onClick={() => logout()}>
                <LogOut className="h-5 w-5" />
                LOGOUT
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

