"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  ChevronsLeft,
  ChevronsRight,
  SquareChartGantt,
  Palette,
  Zap,
  LogOut,
  MoonStar,
  Settings2,
  Sun,
} from "lucide-react";

import { Button } from "@keystone/ui/primitives/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@keystone/ui/primitives/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@keystone/ui/primitives/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@keystone/ui/primitives/dropdown-menu";
import { cn } from "@keystone/ui/lib/utils";
import { SectionNav } from "@/components/section-nav";

const navItems = [
  {
    id: "booking-engine" as const,
    label: "Policy admin system",
    icon: Zap,
    href: "/booking-engine",
  },
  {
    id: "insights" as const,
    label: "Insights",
    icon: BarChart3,
    href: "/insights",
  },
  { id: "admin" as const, label: "Admin", icon: Settings2, href: "/admin" },
];

type NavId = (typeof navItems)[number]["id"] | "components";

const breadcrumbLabels: Record<string, string> = {
  "booking-engine": "Policy admin system",
  insights: "Insights",
  admin: "Admin",
  components: "Design system",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const activeSection: NavId =
    pathname === "/components"
      ? "components"
      : (navItems.find((item) => pathname.startsWith(item.href))?.id ??
        "booking-engine");

  function handleLogout() {
    router.push("/login");
  }

  return (
    <div className="relative h-screen overflow-hidden bg-background text-foreground">
      <div
        className={cn(
          "relative z-10 grid h-full",
          leftSidebarOpen ? "grid-cols-[230px_1fr]" : "grid-cols-[52px_1fr]",
        )}
      >
        {/* Left sidebar */}
        <aside className="relative flex h-full min-h-0 flex-col overflow-visible">
          <TooltipProvider>
            {leftSidebarOpen ? (
              <div className="flex min-h-0 flex-1 flex-col overflow-visible">
                <div className="px-5">
                  <div className="flex h-16 shrink-0 items-center justify-between gap-2">
                    <Link
                      href="/"
                      className="flex min-w-0 items-center gap-2.5"
                    >
                      <SquareChartGantt className="size-5 shrink-0 text-foreground" />
                      <span className="truncate text-base font-semibold tracking-tight">
                        Keystone
                      </span>
                    </Link>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-8 shrink-0"
                          onClick={() => setLeftSidebarOpen(false)}
                          aria-label="Hide navigation"
                        >
                          <ChevronsLeft className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Hide navigation</TooltipContent>
                    </Tooltip>
                  </div>

                  <nav className="mt-3 space-y-0.5">
                    {navItems.map(({ id, label, icon: Icon, href }) => (
                      <Link
                        key={id}
                        href={href}
                        aria-current={activeSection === id ? "page" : undefined}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          activeSection === id
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        {label}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="relative z-30 mt-auto shrink-0 space-y-4 overflow-visible px-5 pb-6 pt-4">
                  {activeSection === "insights" && <SectionNav />}
                  <Link
                    href="/components"
                    className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-input bg-card px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Palette className="size-4 shrink-0" />
                    Design system
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 bg-card"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-4 shrink-0" />
                    Log out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col items-center overflow-visible px-2">
                <div className="flex h-16 w-full shrink-0 items-center justify-center border-b border-border/50">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-9"
                        onClick={() => setLeftSidebarOpen(true)}
                        aria-label="Show navigation"
                      >
                        <ChevronsRight className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Show navigation</TooltipContent>
                  </Tooltip>
                </div>
                <nav className="mt-4 flex w-full flex-col items-center gap-1">
                  {navItems.map(({ id, label, icon: Icon, href }) => (
                    <Link
                      key={id}
                      href={href}
                      title={label}
                      aria-current={activeSection === id ? "page" : undefined}
                      className={cn(
                        "flex size-9 items-center justify-center rounded-md transition-colors",
                        activeSection === id
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4" />
                    </Link>
                  ))}
                </nav>
                <div className="relative z-30 mt-auto flex w-full shrink-0 flex-col items-center gap-1 overflow-visible px-2 pb-4 pt-4">
                  {activeSection === "insights" && <SectionNav collapsed />}
                  <Link
                    href="/components"
                    title="Design system"
                    aria-label="Design system"
                    className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                  >
                    <Palette className="size-4" />
                  </Link>
                  <button
                    type="button"
                    title="Log out"
                    aria-label="Log out"
                    onClick={handleLogout}
                    className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                  >
                    <LogOut className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </TooltipProvider>
        </aside>

        {/* Main column — wrapped panel */}
        <div className="flex h-full min-h-0 min-w-0 flex-col p-3 pl-0">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-[0_1px_0_rgb(255_255_255_/_0.4)_inset] backdrop-blur-md dark:shadow-none">
            {/* Top nav */}
            <header className="relative flex h-14 shrink-0 items-center justify-between px-5">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Keystone</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {breadcrumbLabels[activeSection] ?? "Keystone"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 shrink-0 rounded-full"
                  onClick={() => setIsDark((value) => !value)}
                  aria-label="Toggle dark mode"
                >
                  {isDark ? (
                    <Sun className="size-4" />
                  ) : (
                    <MoonStar className="size-4" />
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9 gap-2 rounded-full px-3"
                      aria-label="User menu"
                    >
                      <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                        CG
                        <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full border-2 border-background bg-[var(--brand-green)]" />
                      </span>
                      <span className="text-sm font-medium">Courtney</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Courtney Greaves</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsDark((v) => !v)}>
                      {isDark ? (
                        <Sun className="size-4" />
                      ) : (
                        <MoonStar className="size-4" />
                      )}
                      {isDark ? "Light mode" : "Dark mode"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Bottom separator */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border/50"
              />
            </header>

            {/* Content area — pages handle their own layout */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
