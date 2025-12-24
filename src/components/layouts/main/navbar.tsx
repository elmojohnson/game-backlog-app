import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { appConfig } from "@/config/app.config";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router";

const { name, navLinks } = appConfig;

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="py-3 shadow">
      <div className="wrapper flex items-center justify-between">
        <h1 className="font-bold text-xl">{name}</h1>
        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.label}
                to={link.href}
                className={
                  location.pathname === link.href ? "text-primary" : ""
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:block"><ModeToggle /></div>
        <MobileDrawer />
      </div>
    </div>
  );
};

const MobileDrawer = () => {
  const location = useLocation();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button className="block md:hidden" variant="ghost"><Menu /></Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{name}</DrawerTitle>
          <DrawerDescription>Menu</DrawerDescription>
          <div className="absolute right-4"><ModeToggle /></div>
        </DrawerHeader>
        <nav className="wrapper flex flex-col gap-2">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.label}
                to={link.href}
                className={
                  location.pathname === link.href ? "text-primary" : ""
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default Navbar;
