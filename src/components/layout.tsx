import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import '../styles/global.css'; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider delayDuration={0}>
        <div
          className={cn(
            "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6"
          )}
        >
          {children}
          <Navbar />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
