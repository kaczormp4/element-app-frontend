import React, { useEffect, useState } from "react";
import { getSharedElements, PrivateElement } from "api/elementsService";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/Collabsible";

const SharedElements: React.FC = () => {
  const [sharedElements, setSharedElements] = useState<PrivateElement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSharedElements();
        setSharedElements(data);
      } catch (error) {
        console.error("Failed to load shared elements", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Elements shared for me:
      </h2>
      {sharedElements ? (
        <ul className="grid gap-4">
          {sharedElements.map((element) => (
            <li
              key={element.id}
              className="bg-white shadow rounded p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {element.title}
                </h3>
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
      ) : (
        <span>"You dont have shared elements"</span>
      )}
    </>
  );
};

export default SharedElements;
