"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Tag, Layout, SlidersHorizontal } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import TagsComponent from "@/components/settings/tags";
import ColumnsComponent from "@/components/settings/columns";
import FilterComponent from "@/components/settings/filter";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="mx-5 md:mx-20 my-5">
        <Card className="neopop-card backdrop-blur-sm bg-white/80 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] border-2 border-black overflow-hidden">
          <CardHeader className="border-b-1 border-black">
            <div className="flex items-center space-x-2">
              <Settings className="h-6 w-6" />
              <CardTitle className="text-2xl font-bold">Settings</CardTitle>
            </div>
            <CardDescription>
              Customize your expense tracking experience
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="tags" className="w-full">
            <div className="px-6 pt-6">
              <TabsList className="grid grid-cols-3 gap-4 bg-transparent">
                <TabsTrigger
                  value="tags"
                  className="neopop-card data-[state=active]:bg-purple-600 data-[state=active]:text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] data-[state=active]:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] data-[state=active]:translate-x-0.5 data-[state=active]:translate-y-0.5 transition-all"
                >
                  <Tag className="mr-2 h-4 w-4" />
                  Tags
                </TabsTrigger>
                <TabsTrigger
                  value="columns"
                  className="neopop-card data-[state=active]:bg-purple-600 data-[state=active]:text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] data-[state=active]:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] data-[state=active]:translate-x-0.5 data-[state=active]:translate-y-0.5 transition-all"
                >
                  <Layout className="mr-2 h-4 w-4" />
                  Columns
                </TabsTrigger>
                <TabsTrigger
                  value="filters"
                  className="neopop-card data-[state=active]:bg-purple-600 data-[state=active]:text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] data-[state=active]:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] data-[state=active]:translate-x-0.5 data-[state=active]:translate-y-0.5 transition-all"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </TabsTrigger>
              </TabsList>
            </div>

            {/* TAGS TAB */}
            <TabsContent value="tags" className="p-6">
              <TagsComponent />
            </TabsContent>

            {/* COLUMNS TAB */}
            <TabsContent value="columns" className="p-6">
              <ColumnsComponent />
            </TabsContent>

            {/* FILTERS TAB */}
            <TabsContent value="filters" className="p-6">
              <FilterComponent />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
