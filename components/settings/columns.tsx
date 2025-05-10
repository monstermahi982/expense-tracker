import { PenSquare, Table2 } from "lucide-react";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

const defaultColumns = [
  { id: "date", name: "Date", enabled: true, fixed: true },
  { id: "title", name: "Title", enabled: true, editable: true, fixed: false },
  { id: "bank", name: "Bank", enabled: true, fixed: false },
  { id: "amount", name: "Amount", enabled: true, fixed: true },
  { id: "month", name: "Month", enabled: true, fixed: false },
  { id: "year", name: "Year", enabled: true, fixed: false },
  { id: "tag", name: "Tag", enabled: true, editable: true, fixed: false },
  { id: "actions", name: "Actions", enabled: true, fixed: true },
];

const ColumnsComponent = () => {
  const [columns, setColumns] = useState(defaultColumns);

  // Column functions
  const toggleColumn = (id) => {
    setColumns(
      columns.map((col) => {
        if (col.id === id && !col.fixed) {
          return { ...col, enabled: !col.enabled };
        }
        return col;
      })
    );
  };

  const toggleColumnEditable = (id) => {
    setColumns(
      columns.map((col) => {
        if (col.id === id && !col.fixed) {
          return { ...col, editable: !col.editable };
        }
        return col;
      })
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div className="neopop-card rounded-lg overflow-hidden">
          <h3 className="text-lg font-bold p-4 flex items-center">
            <Table2 className="inline mr-2 h-5 w-5" />
            Table Column Settings
          </h3>

          <div className="px-4 pb-4 mb-4 border-b-2 border-black">
            <p className="text-sm text-gray-700">
              Configure which columns appear in your expense table. Toggle
              columns on/off and set edit permissions.
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Column</TableHead>
                <TableHead className="text-center">Visible</TableHead>
                <TableHead className="text-center">Editable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columns.map((column) => (
                <TableRow
                  key={column.id}
                  className="border-b border-gray-200 hover:bg-purple-50"
                >
                  <TableCell className="font-medium">
                    {column.name}
                    {column.fixed && (
                      <Badge
                        variant="outline"
                        className="neopop-card ml-2 text-xs"
                      >
                        Required
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={column.enabled}
                      onCheckedChange={() => toggleColumn(column.id)}
                      disabled={column.fixed}
                      className="neopop-card data-[state=checked]:bg-purple-600"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    {column.id === "title" || column.id === "tag" ? (
                      <Switch
                        checked={column.editable}
                        onCheckedChange={() => toggleColumnEditable(column.id)}
                        disabled={!column.enabled}
                        className="neopop-card data-[state=checked]:bg-purple-600"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="neopop-card p-4 border-2 border-black rounded-lg">
          <h3 className="text-md font-bold mb-2">Table Layout Preview</h3>
          <div className="p-3 rounded-lg overflow-x-auto">
            <div className="flex space-x-1 gap-3">
              {columns
                .filter((col) => col.enabled)
                .map((col) => (
                  <div
                    key={col.id}
                    className="neopop-card px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {col.name}
                    {col.editable && (
                      <PenSquare className="inline ml-1 h-3 w-3 text-black" />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColumnsComponent;
