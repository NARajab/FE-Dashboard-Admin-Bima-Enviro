import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { getMeResponse } from '../../api/fetching/auth/authActions';

interface DropdownUserProps {
  user: getMeResponse['data'] | null;
}

const DropdownUser: React.FC<DropdownUserProps> = ({ user }) => {
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
            {user?.name}
          </span>
          <span className="block text-xs">{user?.role}</span>
        </span>

        <span className="h-12 w-12 rounded-full  object-cover">
          <img
            src={user?.imageUrl}
            alt="User"
            className="h-12 w-12 rounded-full  object-cover"
          />
        </span>
      </Link>

      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
