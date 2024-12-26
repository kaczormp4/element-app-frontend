import axiosInstance from "./axiosInstance";

export interface PrivateElement {
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

// Fetch all elements with optional filters
export const fetchElements = async (
  filters = {}
): Promise<{ elements: PrivateElement[] }> => {
  // Get the token from session storage
  const token = sessionStorage.getItem("jwt_token");
  try {
    const response = await axiosInstance.get("/elements", {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the elements from the response
  } catch (error) {
    console.error(
      "Error fetching elements:",
      error.response?.data || error.message
    );
    throw error; // Throw the error to handle it in the calling component
  }
};

// Fetch a single element by ID
export const fetchElementById = async (id: string): Promise<PrivateElement> => {
  // Get the token from session storage
  const token = sessionStorage.getItem("jwt_token");
  try {
    const response = await axiosInstance.get(`/elements/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.element; // Return the element from the response
  } catch (error) {
    console.error(
      `Error fetching element with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error; // Throw the error to handle it in the calling component
  }
};

// Publish an element by ID
export const publishElement = async (id: number): Promise<PrivateElement> => {
  const token = sessionStorage.getItem("jwt_token");
  console.log(id, token);

  try {
    const response = await axiosInstance.put<{ element: PrivateElement }>(
      `/elements/${id}/publish`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.element; // Return the updated element
  } catch (error: any) {
    console.error(
      "Error publishing element:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// unpublish an element by ID
export const unPublishElement = async (id: number): Promise<PrivateElement> => {
  const token = sessionStorage.getItem("jwt_token");
  console.log(id, token);

  try {
    const response = await axiosInstance.put<{ element: PrivateElement }>(
      `/elements/${id}/unpublish`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.element; // Return the updated element
  } catch (error: any) {
    console.error(
      "Error publishing element:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createElement = async (
  elementData: Partial<PrivateElement>
): Promise<Element> => {
  const token = sessionStorage.getItem("jwt_token");

  const response = await axiosInstance.post("/elements/create", elementData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteElement = async (id: number): Promise<PrivateElement> => {
  const token = sessionStorage.getItem("jwt_token");

  try {
    const response = await axiosInstance.delete<{ element: PrivateElement }>(
      `/elements/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.element; // Return the deleted element
  } catch (error: any) {
    console.error(
      "Error deleting element:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export async function cloneElement(id: number): Promise<PrivateElement> {
  const token = sessionStorage.getItem("jwt_token");

  const response = await axiosInstance.post(
    `/elements/${id}/clone`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.clonedElement;
}

export const editElement = async (
  id: string,
  body: PrivateElement
): Promise<PrivateElement> => {
  const token = sessionStorage.getItem("jwt_token");
  console.log("BODY.", body);

  try {
    const response = await axiosInstance.put<{ element: PrivateElement }>(
      `/elements/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.element; // Return the updated element
  } catch (error: any) {
    console.error(
      "Error publishing element:",
      error.response?.data || error.message
    );
    throw error;
  }
};
