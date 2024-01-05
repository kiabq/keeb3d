import type { NavItemProps } from "@/types";

export default function NavItem(props: NavItemProps) {
  return (
    <a {...props} className="hover:bg-red-500 rounded-xl px-2">
      {props.children}
    </a>
  );
}
