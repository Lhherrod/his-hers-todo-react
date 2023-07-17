import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

interface Props {
  navigationMenu: MenuItem[];
}

const Header = (props: Props) => {
  return (
    <>
      <div>
        <Menubar model={props.navigationMenu} className="text-primary-bg" />
      </div>
    </>
  );
};

export default Header;