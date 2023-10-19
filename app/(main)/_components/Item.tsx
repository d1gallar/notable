"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  LucideIcon,
  ChevronDown,
  ChevronRight,
  Divide,
  PlusIcon,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

const Item = ({
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
  label,
  onClick,
  icon: Icon,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const restore = useMutation(api.documents.restore);

  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => {
      router.push("/documents");
    });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Moved to trash!",
      error: "Failed to archive note.",
      action: {
        label: 'Undo',
        onClick: () => onUndo(id),
      },
    });
  };

  const onUndo = (documentId: Id<"documents">) => {
    restore({ id: documentId });
    router.push(`/documents/${documentId}`);
  };

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onExpand?.();
  };

  const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foregruond font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          aria-label="Expand Document"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-sm">⌘</span>K
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                aria-label="Open Dropdown Menu"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive} role="button" aria-label="Delete Document" >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            aria-label="Create Document"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <PlusIcon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
