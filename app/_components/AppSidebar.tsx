"use client";

import React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Award, History, Inbox, Layers, UserCircle } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Workspace",
    url: "/dashboard",
    icon: Layers,
  },
  {
    title: "AI Tools",
    url: "/ai-tools",
    icon: Inbox,
  },
  {
    title: "My History",
    url: "/history", // or /history if you have a separate page
    icon: History,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: Award,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserCircle,
  },
];

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={70}
            className="w-full"
          />
          <h2 className="text-sm text-gray-400 text-center">
            Build Awesome Skills
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className={`p-2 text-lg flex gap-2 items-center hover:bg-gray-100 rounded-lg ${
                    path === item.url ? "bg-gray-200" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <h2 className="p-2 text-gray-400 text-sm">Ajay@iitkgp</h2>
      </SidebarFooter>
    </Sidebar>
  );
}
