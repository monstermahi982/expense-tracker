import {
  ArrowLeftRight,
  Building,
  PenSquare,
  SlidersHorizontalIcon,
} from "lucide-react";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const FilterComponent = () => {
  const [filters, setFilters] = useState({
    showBank: true,
    showDate: true,
    showMonth: true,
    showYear: true,
    editableTitle: true,
    editableTags: true,
  });
  return (
    <>
      <div className="space-y-6">
        <div className="bg-white border-2 border-black rounded-lg overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <h3 className="text-lg font-bold p-4 border-b-2 border-black bg-purple-100 flex items-center">
            <SlidersHorizontalIcon className="inline mr-2 h-5 w-5" />
            Default Filter Settings
          </h3>

          <div className="p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="date-filters"
                className="border-2 border-black rounded-lg mb-4 overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
              >
                <AccordionTrigger className="px-4 py-3 bg-purple-50 hover:bg-purple-100 font-medium">
                  <div className="flex items-center">
                    <ArrowLeftRight className="mr-2 h-5 w-5" />
                    Date Range Settings
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-date"
                        checked={filters.showDate}
                        onCheckedChange={(checked) =>
                          setFilters({ ...filters, showDate: checked })
                        }
                        className="data-[state=checked]:bg-purple-600 border-2 border-black"
                      />
                      <Label htmlFor="show-date">
                        Show Date Filter by Default
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-month"
                        checked={filters.showMonth}
                        onCheckedChange={(checked) =>
                          setFilters({ ...filters, showMonth: checked })
                        }
                        className="data-[state=checked]:bg-purple-600 border-2 border-black"
                      />
                      <Label htmlFor="show-month">
                        Show Month Filter by Default
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-year"
                        checked={filters.showYear}
                        onCheckedChange={(checked) =>
                          setFilters({ ...filters, showYear: checked })
                        }
                        className="data-[state=checked]:bg-purple-600 border-2 border-black"
                      />
                      <Label htmlFor="show-year">
                        Show Year Filter by Default
                      </Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="bank-filters"
                className="border-2 border-black rounded-lg mb-4 overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
              >
                <AccordionTrigger className="px-4 py-3 bg-purple-50 hover:bg-purple-100 font-medium">
                  <div className="flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    Bank Account Settings
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-bank"
                      checked={filters.showBank}
                      onCheckedChange={(checked) =>
                        setFilters({ ...filters, showBank: checked })
                      }
                      className="data-[state=checked]:bg-purple-600 border-2 border-black"
                    />
                    <Label htmlFor="show-bank">
                      Show Bank Filter by Default
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="edit-settings"
                className="border-2 border-black rounded-lg overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]"
              >
                <AccordionTrigger className="px-4 py-3 bg-purple-50 hover:bg-purple-100 font-medium">
                  <div className="flex items-center">
                    <PenSquare className="mr-2 h-5 w-5" />
                    Editing Permissions
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="editable-title"
                        checked={filters.editableTitle}
                        onCheckedChange={(checked) =>
                          setFilters({
                            ...filters,
                            editableTitle: checked,
                          })
                        }
                        className="data-[state=checked]:bg-purple-600 border-2 border-black"
                      />
                      <Label htmlFor="editable-title">
                        Allow Title Editing
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="editable-tags"
                        checked={filters.editableTags}
                        onCheckedChange={(checked) =>
                          setFilters({
                            ...filters,
                            editableTags: checked,
                          })
                        }
                        className="data-[state=checked]:bg-purple-600 border-2 border-black"
                      />
                      <Label htmlFor="editable-tags">Allow Tag Editing</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterComponent;
