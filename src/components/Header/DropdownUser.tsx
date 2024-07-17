import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import UserOne from '../../images/user/user-01.png';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="/settings"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Name
          </span>
          <span className="block text-xs">Admin</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>
      </Link>

      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
