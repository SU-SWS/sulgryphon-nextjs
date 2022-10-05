import {Lockup} from "@/components/patterns/lockup";
import {MainMenu} from "@/components/menu/main-menu";

export const Header = () => {
  return (
    <header className="su-shadow-lg">
      <Lockup/>
      <MainMenu/>
    </header>
  )
}