import axiosInstance from "./axiosInstance";

export interface PublicElement {
  id: number;
  title: string;
  dateCreated: string;
  type: "toDo" | "note";
  visibility: "public" | "private";
  status: "done" | "inProgress";
  content: string;
  owner?: {
    id: number;
    username: string;
  };
}

// Fetch all public elements
export const fetchPublicElements = async (): Promise<{
  elements: PublicElement[];
}> => {
  try {
    const response = await axiosInstance.get("/public/elements");
    return response.data; // Return the elements from the response
  } catch (error) {
    console.error(
      "Error fetching public elements:",
      error.response?.data || error.message
    );
    throw error; // Throw the error to handle it in the calling component
  }
};
