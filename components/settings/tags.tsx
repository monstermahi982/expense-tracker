import React, { useEffect, useState } from "react";
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
import { useTagStore } from "@/store/tagStore";
import { addTag, updateTag } from "@/server/tag";

export interface Tag {
  _id: string;
  name: string;
  color: string;
  userId?: string;
  tagType: string;
}

export const availableTags = [
  { id: "Teal", name: "Teal", color: "bg-emerald-500" },
  { id: "Blue", name: "Blue", color: "bg-blue-500" },
  { id: "Amber", name: "Amber", color: "bg-amber-500" },
  { id: "Red", name: "Red", color: "bg-red-500" },
  { id: "Purple", name: "Purple", color: "bg-purple-500" },
  { id: "Indigo", name: "Indigo", color: "bg-indigo-500" },
  { id: "Teal 2", name: "Teal 2", color: "bg-teal-500" },
  { id: "Gray", name: "Gray", color: "bg-gray-400" },
];

const TagsComponent = () => {
  const [newTag, setNewTag] = useState({ name: "", color: "" });
  const [selectedTagColor, setSelectedTagColor] = useState<string>("");
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [deleteTagId, setDeleteTagId] = useState<string | null>(null);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const tagStore = useTagStore();

  const addNewTag = async () => {
    if (newTag.name.trim() === "" || selectedTagColor === "") return;

    const payload = {
      name: newTag.name,
      color: selectedTagColor,
    };

    await addTag(payload);
    setNewTag({ name: "", color: "" });
    setSelectedTagColor("");
    await getTagList();
  };

  const updateTagField = (id: string, field: keyof Tag, value: string) => {
    const updated = tagList.map((tag) =>
      tag._id === id ? { ...tag, [field]: value } : tag
    );
    setTagList(updated);
  };

  const saveTagEdit = async () => {
    const tag = tagList.find((tg) => tg._id === editingTagId);
    if (!tag) return;

    await updateTag(tag._id, { name: tag.name, color: tag.color });
    setEditingTagId(null);
    await getTagList();
  };

  const deleteTag = async (id: string) => {
    await tagStore.deleteTag(id);
    setDeleteTagId(null);
    await getTagList();
  };

  const getTagList = async () => {
    await tagStore.getTags();
    setTagList(useTagStore.getState().tagList);
  };

  useEffect(() => {
    getTagList();
  }, []);

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
              <Input
                value={newTag.name}
                onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                placeholder="Tag name"
                className="neopop-input"
              />
              <Select
                value={selectedTagColor}
                onValueChange={(value) => setSelectedTagColor(value)}
              >
                <SelectTrigger className="w-[140px] neopop-select">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent className="border-2 border-black">
                  {availableTags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.color}>
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
                {tagList.map((tag: Tag) => (
                  <TableRow
                    key={tag._id}
                    className="border-b border-gray-200 hover:bg-purple-50"
                  >
                    <TableCell>
                      {editingTagId === tag._id ? (
                        <Input
                          value={tag.name}
                          onChange={(e) =>
                            updateTagField(tag._id, "name", e.target.value)
                          }
                          className="neopop-input"
                        />
                      ) : (
                        <Badge className={`${tag.color} text-black py-1`}>
                          {tag.name}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingTagId === tag._id ? (
                        <Select
                          value={tag.color}
                          onValueChange={(value) =>
                            updateTagField(tag._id, "color", value)
                          }
                        >
                          <SelectTrigger className="w-[160px] border-2 border-black">
                            <SelectValue placeholder="Select tag color" />
                          </SelectTrigger>
                          <SelectContent className="border-2 border-black">
                            {availableTags.map((opt) => (
                              <SelectItem key={opt.id} value={opt.color}>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-3 w-3 rounded-full ${opt.color}`}
                                  ></div>
                                  <span>{opt.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div
                          className={`neopop-card w-20 h-10 rounded-md cursor-pointer ${tag.color}`}
                          onClick={() => setEditingTagId(tag._id)}
                        ></div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingTagId === tag._id ? (
                        <Button
                          onClick={saveTagEdit}
                          size="sm"
                          className="neopop-card bg-green-500 mr-2 text-white"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setEditingTagId(tag._id)}
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
                            className="neopop-card bg-red-500 text-white"
                            disabled={tag._id === "untagged"}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
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
                              className="neopop-card bg-red-500 text-white"
                              onClick={() => deleteTag(tag._id)}
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
