import { fetchPublicElements, PublicElement } from "api/publicService";
import { Button } from "components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/Collabsible";
import { useAuth } from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const [publicElements, setPublicElements] = useState<PublicElement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    const getPublicElements = async () => {
      try {
        const data = await fetchPublicElements(); // Fetch public elements
        setPublicElements(data.elements); // Update state with elements
      } catch (err) {
        setError(err.message || "Failed to fetch public elements");
      } finally {
        setLoading(false);
      }
    };

    getPublicElements();
  }, []);
  console.log(publicElements);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full max-w-4xl flex justify-between items-center py-4 mb-6 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-800">Public Notes</h1>
        <div>
          {!!user ? (
            <Link to="/dashboard">
              <Button variant="default">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="default">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="ghost">Register</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="w-full max-w-4xl">
        {publicElements.length > 0 ? (
          <ul className="grid gap-4">
            {publicElements.map((note) => (
              <li
                key={note.id}
                className="bg-white shadow rounded p-4 border border-gray-200"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {note.title}
                </h2>

                <p>{note.content}</p>

                <Collapsible>
                  <CollapsibleTrigger> - More info -</CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-gray-600 mt-2">
                      Owner:{note.owner.username}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Date created: {note.dateCreated}
                    </p>
                    <p className="text-gray-600 mt-2">type: {note.type}</p>
                  </CollapsibleContent>
                </Collapsible>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No public notes available.</p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
