import { PopoverTrigger } from "@radix-ui/react-popover";
import { getAllUsers } from "api/usersService";
import { Button } from "components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui/Dialog";
import { Popover, PopoverContent } from "components/ui/react-popover";
import { cn } from "lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface User {
  id: number;
  username: string;
}

const ShareDialog = ({
  open,
  onChange,
}: {
  open: boolean;
  onChange: (boolean: boolean) => void;
}) => {
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [label, setLabel] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log(response.users);

        setUsers(response.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const mappedUsers = useMemo(
    () =>
      users &&
      users.map(({ id, username }) => {
        return {
          value: id,
          label: username,
        };
      }),
    [users]
  );
  console.log(label);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose user for share</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          choose user and share element for him
        </DialogDescription>
        <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isPopoverOpen}
              className="w-[350px] justify-between"
            >
              {label
                ? mappedUsers.find((user) => user.label.toString() === label)
                    ?.label
                : "Select user"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[350px] p-0">
            <Command>
              <CommandInput placeholder="Search user" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {mappedUsers.map((framework) => (
                    <CommandItem
                      key={framework.label}
                      value={framework.label.toString()}
                      onSelect={(currentValue) => {
                        setLabel(currentValue === label ? "" : currentValue);
                        setPopoverOpen(false);
                      }}
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          label === framework.value.toString()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogFooter>
          <Button variant="default" className="m-2">
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
