import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";

import { Button } from "components/ui/button";
import { Input } from "components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/Select";
import { createElement } from "api/elementsService";

interface CreateElementForm {
  title: string;
  content: string;
  type: "toDo" | "note";
  visibility: "public" | "private";
  status: "done" | "inProgress";
}

const CreateElement: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateElementForm>({
    title: "",
    content: "",
    type: "toDo",
    visibility: "private",
    status: "inProgress",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof CreateElementForm, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await createElement(formData);
      console.log("Element created successfully");
      navigate("/dashboard"); // Redirect to elements list page
    } catch (error) {
      console.error("Error creating element", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-sm bg-white mt-6">
      <Link to="/dashboard">
        <Button variant="default" className="m-2">
          Back
        </Button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Create New Element</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter element title"
            required
          />
        </div>

        {/* Content Field */}
        <div>
          <Label htmlFor="content">Content</Label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Enter element content"
            className="w-full border rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* Type Select */}
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toDo">To-Do</SelectItem>
              <SelectItem value="note">Note</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Visibility Select */}
        <div>
          <Label htmlFor="visibility">Visibility</Label>
          <Select
            value={formData.visibility}
            onValueChange={(value) => handleSelectChange("visibility", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Select */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="inProgress">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating..." : "Create Element"}
        </Button>
      </form>
    </div>
  );
};

export default CreateElement;
