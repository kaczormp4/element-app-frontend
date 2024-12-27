import {
  cloneElement,
  deleteElement,
  fetchElements,
  PrivateElement,
  publishElement,
  unPublishElement,
} from "api/elementsService";
import SharedElements from "components/Dashboard/SharedElements";
import ShareDialog from "components/Dashboard/ShareDialog";
import { Button } from "components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/Collabsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Element {
  id: number;
  title: string;
  dateCreated: string;
  type: "toDo" | "note";
  visibility: "public" | "private";
  status: "done" | "inProgress";
}

const Dashboard: React.FC = () => {
  const [elements, setElements] = useState<PrivateElement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentId, setCurrentId] = useState<number | null>(null);

  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const getElements = useCallback(async () => {
    try {
      const data = await fetchElements(); // Fetch all elements
      setElements(data.elements); // Update state with elements
    } catch (err) {
      setError(err.message || "Failed to fetch elements");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getElements();
  }, []);

  const handlePublish = useCallback(async (elementId: number) => {
    try {
      const updatedElement = await publishElement(elementId);
      await getElements();
    } catch (error) {
      console.error("Failed to publish element:", error.message);
    }
  }, []);

  const handleUnPublish = useCallback(async (elementId: number) => {
    try {
      const updatedElement = await unPublishElement(elementId);
      await getElements();
    } catch (error) {
      console.error("Failed to unpublish element:", error.message);
    }
  }, []);

  const handleDelete = useCallback(async (elementId: number) => {
    try {
      await deleteElement(elementId);
      await getElements();
    } catch (error) {
      console.error("Failed to unpublish element:", error.message);
    }
  }, []);

  const handleClone = useCallback(async (elementId: number) => {
    try {
      await cloneElement(elementId);
      await getElements();
    } catch (error) {
      console.error("Failed to unpublish element:", error.message);
    }
  }, []);

  const handleEdit = useCallback((elementId: number) => {
    navigate(`/dashboard/${elementId}/edit`);
  }, []);

  const handleShareOpenModal = useCallback((boolean: boolean) => {
    setIsShareDialogOpen(boolean);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col p-4">
        <header className="w-full flex justify-between items-center py-4 mb-6 border-b border-gray-300">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>{" "}
          <Link to="/">
            <Button variant="link">Public Notes</Button>
          </Link>
          <button className="text-white bg-red-500 hover:bg-red-600 font-medium rounded px-4 py-2">
            Logout
          </button>
        </header>

        <main className="w-full max-w-6xl mx-auto">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Create New Element
            </h2>
            <form className="bg-white shadow rounded p-4 border border-gray-200">
              {/* Add input fields for creating new elements here */}
              <Link to="/dashboard/new">
                <Button variant="default">Create new Element</Button>
              </Link>
            </form>
          </section>
          <section className="mb-8">
            <SharedElements />
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              My Elements
            </h2>
            <ul className="grid gap-4">
              {elements.map((element) => (
                <li
                  key={element.id}
                  className="bg-white shadow rounded p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {element.title}
                    </h3>
                    <div className="relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">More</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => handleDelete(element.id)}
                            >
                              Delete
                              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleClone(element.id)}
                            >
                              Clone
                              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            {element.visibility === "private" ? (
                              <DropdownMenuItem
                                onClick={() => handlePublish(element.id)}
                              >
                                Publish
                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleUnPublish(element.id)}
                              >
                                Unpublish
                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuItem
                              onClick={() => handleEdit(element.id)}
                            >
                              Edit
                              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentId(element.id);
                                handleShareOpenModal(true);
                              }}
                            >
                              Share
                              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p>{element.content}</p>

                  <Collapsible>
                    <CollapsibleTrigger>- More info -</CollapsibleTrigger>
                    <CollapsibleContent>
                      <p className="text-gray-600">ID: {element.id}</p>
                      <p className="text-gray-600">
                        Created: {element.dateCreated}
                      </p>
                      <p className="text-gray-600">Type: {element.type}</p>
                      <p className="text-gray-600">
                        Visibility: {element.visibility}
                      </p>
                      <p className="text-gray-600">Status: {element.status}</p>
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      {isShareDialogOpen && (
        <ShareDialog
          open={isShareDialogOpen}
          currentId={currentId}
          onChange={handleShareOpenModal}
        />
      )}
    </>
  );
};

export default Dashboard;
