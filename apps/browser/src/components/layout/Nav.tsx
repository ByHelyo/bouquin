import { Link } from "react-router-dom";
import { cn } from "~/lib/utils.ts";
import { buttonVariants } from "~/components/ui/button.tsx";
import { LucideIcon } from "lucide-react";

interface Props {
  links: {
    title: string;
    to: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[];
}

function Nav({ links }: Props) {
  return (
    <nav className="p-2 flex flex-col gap-1">
      {links.map((link, index) => (
        <Link
          to={link.to}
          key={index}
          className={cn(
            buttonVariants({ variant: link.variant, size: "sm" }),
            link.variant === "default" &&
              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
            "justify-start",
          )}
        >
          <link.icon className="mr-2 h-4 w-4" />
          {link.title}
        </Link>
      ))}
    </nav>
  );
}

export default Nav;
