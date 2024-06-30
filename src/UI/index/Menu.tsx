import SRLogo from "../logo/SRLogo";
import HeaderLinks from "./header-nav";

export default function HeaderMenu(){
    return(
        <header className="flex shadow-md p-4">
          <div className="flex items-center">
            <div className="ml-16 md:block hidden"><SRLogo /></div>
          </div>
          <div className="flex-grow flex justify-end items-end py-4 px-12">
            <nav className="mr-8">
              <ul className="flex space-x-4">
                <HeaderLinks />
              </ul>
            </nav>
            <div className="mr-8">
              <button className="bg-black text-white py-2 px-4 rounded">Log in</button>
            </div>
          </div>
        </header>
    );
}