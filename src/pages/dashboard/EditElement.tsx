import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  editElement,
  fetchElementById,
  PrivateElement,
} from "api/elementsService";

const EditElement: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get the element ID from the URL
  console.log("XDD", id);

  const [formData, setFormData] = useState<PrivateElement>({
    id: 0,
    title: "",
    dateCreated: "",
    type: "note",
    visibility: "private",
    status: "inProgress",
    content: "",
    owner: {
      id: 0,
      username: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the element data by ID
  useEffect(() => {
    const fetchElement = async () => {
      try {
        const response = await fetchElementById(id);
        setFormData(response);
      } catch (error) {
        console.error("Error fetching element:", error);
      }
    };

    fetchElement();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log(formData);

      const response = await editElement(id, formData);
      console.log("Element updated successfully");
      navigate(`/dashboard`); // Redirect to the element details page
    } catch (error) {
      console.error("Error updating element", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-sm bg-white mt-6">
      <Button
        variant="default"
        className="m-2"
        onClick={() => navigate("/dashboard")}
      >
        Back
      </Button>
      <h1 className="text-2xl font-bold mb-4">Edit Element</h1>
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
            value={formData?.content ?? ""}
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
          {isSubmitting ? "Updating..." : "Update Element"}
        </Button>
      </form>
    </div>
  );
};

export default EditElement;
