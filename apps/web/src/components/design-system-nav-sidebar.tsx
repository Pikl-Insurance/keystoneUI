import { Separator } from "@keystone/ui/primitives/separator";
import {
  componentCategories,
  componentsCatalog,
} from "@/lib/components-catalog";
import { componentsCatalogExtra } from "@/lib/components-catalog-extra";
import { cn } from "@keystone/ui/lib/utils";

const fullCatalog = [...componentsCatalog, ...componentsCatalogExtra];

const referenceNavItems = [
  { id: "color-palette", label: "Colour palette" },
  { id: "typography", label: "Typography" },
  { id: "design-tokens", label: "Design tokens" },
];

const navSections = [
  ...componentCategories.map((category) => ({
    id: category.id,
    title: category.title,
    items: fullCatalog
      .filter((entry) => entry.category === category.id)
      .map((entry) => ({ id: entry.id, label: entry.name })),
  })),
  {
    id: "reference",
    title: "Reference",
    items: referenceNavItems,
  },
].filter((section) => section.items.length > 0);

export { referenceNavItems, navSections };

type DesignSystemNavSidebarProps = {
  activeId: string;
  onNavigate: (id: string) => void;
};

function TableOfContents({
  activeId,
  onNavigate,
}: DesignSystemNavSidebarProps) {
  return (
    <nav className="space-y-6">
      {navSections.map((section, index) => {
        const sectionActive =
          activeId === section.id ||
          (section.id === "reference" &&
            referenceNavItems.some((item) => item.id === activeId));

        return (
          <div key={section.id}>
            {index > 0 ? <Separator className="mb-6" /> : null}
            <button
              type="button"
              onClick={() =>
                onNavigate(
                  section.id === "reference"
                    ? referenceNavItems[0].id
                    : section.id,
                )
              }
              className={cn(
                "text-sm font-semibold transition-colors hover:text-foreground",
                sectionActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {section.title}
            </button>
            <ul className="mt-2 flex flex-col gap-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors",
                      activeId === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

export function DesignSystemNavSidebar({
  activeId,
  onNavigate,
}: DesignSystemNavSidebarProps) {
  return (
    <aside className="relative flex min-h-0 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-border"
      />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div>
          <h2 className="text-sm font-semibold">On this page</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Jump to components, foundations, and tokens.
          </p>
        </div>

        <div className="mt-6">
          <TableOfContents activeId={activeId} onNavigate={onNavigate} />
        </div>
      </div>
    </aside>
  );
}
