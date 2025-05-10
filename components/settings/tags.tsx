import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { CheckCircle2, PenSquare, PlusCircle, Tag, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { availableTags } from "@/pages/expenses";

const defaultTags = [
  { id: "essential", name: "Essential", color: "bg-emerald-500" },
  { id: "recurring", name: "Recurring", color: "bg-red-500" },
  { id: "discretionary", name: "Discretionary", color: "bg-emerald-500" },
  { id: "emergency", name: "Emergency", color: "bg-emerald-500" },
  { id: "savings", name: "Savings", color: "bg-purple-500" },
  { id: "business", name: "Business", color: "bg-emerald-500" },
  { id: "tax-deductible", name: "Tax Deductible", color: "bg-emerald-500" },
  { id: "untagged", name: "Untagged", color: "bg-emerald-500" },
];

const TagsComponent = ({}: any) => {
  const [tags, setTags] = useState(defaultTags);
  const [newTag, setNewTag] = useState({ name: "", color: "#9333ea" });
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [editingTagId, setEditingTagId] = useState(null);
  const [deleteTagId, setDeleteTagId] = useState(null);
  const [color, setColor] = useState("#9333ea");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Tag functions
  const addNewTag = () => {
    if (newTag.name.trim() === "") return;

    const tagId = newTag.name.toLowerCase().replace(/\s+/g, "-");
    const newTagObj = {
      id: tagId,
      name: newTag.name,
      color: newTag.color,
    };

    setTags([...tags, newTagObj]);
    setNewTag({ name: "", color: "#9333ea" });
  };

  const updateTag = (id, field, value) => {
    const updatedTags = tags.map((tag) => {
      if (tag.id === id) {
        return { ...tag, [field]: value };
      }
      return tag;
    });
    setTags(updatedTags);
  };

  const startEditTag = (id) => {
    setEditingTagId(id);
    const tagToEdit = tags.find((tag) => tag.id === id);
    if (tagToEdit) {
      setColor(tagToEdit.color);
    }
  };

  const saveTagEdit = () => {
    setEditingTagId(null);
    setShowColorPicker(false);
  };

  const deleteTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
    setDeleteTagId(null);
  };

  const getTagInfo = (tagId: string) => {
    return (
      availableTags.find((tag) => tag.id === tagId) ||
      availableTags[availableTags.length - 1]
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-4">
          <div className="neopop-card p-4 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
            <h3 className="text-lg font-bold flex items-center mb-4">
              <PlusCircle className="inline mr-2 h-5 w-5" />
              Add New Tag
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  value={newTag.name}
                  onChange={(e) =>
                    setNewTag({ ...newTag, name: e.target.value })
                  }
                  placeholder="Tag name"
                  className="neopop-input"
                />
              </div>
              <div className="relative">
                <Select
                  value={selectedTag}
                  onValueChange={(value) => setSelectedTag(value)}
                >
                  <SelectTrigger className="w-[140px] neopop-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-black">
                    {availableTags.map((tag) => (
                      <SelectItem key={tag.id} value={tag.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-3 w-3 rounded-full ${tag.color}`}
                          ></div>
                          <span>{tag.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={addNewTag}
                className="neopop-card bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
              >
                Add Tag
              </Button>
            </div>
          </div>

          <div className="neopop-card rounded-lg ">
            <h3 className="text-lg font-bold p-4 flex items-center">
              <Tag className="inline mr-2 h-5 w-5" />
              Manage Tags
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Tag Name</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tags.map((tag) => (
                  <TableRow
                    key={tag.id}
                    className="border-b border-gray-200 hover:bg-purple-50"
                  >
                    <TableCell>
                      {editingTagId === tag.id ? (
                        <Input
                          value={tag.name}
                          onChange={(e) =>
                            updateTag(tag.id, "name", e.target.value)
                          }
                          className="neopop-input"
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`${tag.color} text-white hover:${tag.color} py-1 cursor-pointer border-2 w-full font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none transition-all`}
                          >
                            {tag.name}
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingTagId === tag.id ? (
                        <Select
                          value={tag.id}
                          onValueChange={(value) => {
                            updateTag(tag.id, "tag", value);
                            setEditingTagId(null);
                          }}
                        >
                          <SelectTrigger className="w-[160px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
                            <SelectValue placeholder="Select tag" />
                          </SelectTrigger>
                          <SelectContent className="border-2 border-black">
                            {tags.map((tagOption) => (
                              <SelectItem
                                key={tagOption.id}
                                value={tagOption.id}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-3 w-3 rounded-full ${tagOption.color}`}
                                  ></div>
                                  <span>{tagOption.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div
                          className={`neopop-card w-20 h-10 rounded-md cursor-pointer ${tag.color}`}
                          onClick={() => setEditingTagId(tag.id)}
                        ></div>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      {editingTagId === tag.id ? (
                        <Button
                          onClick={saveTagEdit}
                          size="sm"
                          className="neopop-card bg-green-500 mr-2 text-white"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => startEditTag(tag.id)}
                          size="sm"
                          className="neopop-card bg-blue-500 mr-2 text-white"
                        >
                          <PenSquare className="h-4 w-4" />
                        </Button>
                      )}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="neopop-card bg-red-500 text-white "
                            disabled={tag.id === "untagged"} // Prevent deletion of default untagged
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className=" shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tag</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the "{tag.name}"
                              tag? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="neopop-card">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="neopop-card bg-red-500 text-white "
                              onClick={() => deleteTag(tag.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagsComponent;
