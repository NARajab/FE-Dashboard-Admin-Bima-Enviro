import { useEffect, useState } from 'react';
import { Users } from '../../types/users';
import { SimplePagination } from '../Pagination';
import dataUser from '../../data/userData.json';

const TableThree = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [userData, setUserData] = useState<Users[]>([]);

  useEffect(() => {
    return setUserData(dataUser.userData);
  }, []);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = userData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(userData.length / itemsPerPage);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-1 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="py-4">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Semua User
          </h4>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className=" py-4 px-4 font-medium text-black dark:text-white">
                Nama
              </th>
              <th className=" py-4 px-4 font-medium text-black dark:text-white">
                No Telp
              </th>
              <th className=" py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className=" py-4 px-4 font-medium text-black dark:text-white">
                Role
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((userItem, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {userItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {userItem.phoneNumber}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {userItem.email}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {userItem.role}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <svg
                        className="stroke-current"
                        width="25"
                        height="25"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.3333 15.8333C23.3333 15.8333 24.1666 17.5 24.1666 20.8333C24.1666 24.1667 23.3333 25.8333 23.3333 25.8333M16.6666 15.8333C16.6666 15.8333 15.8333 17.5 15.8333 20.8333C15.8333 24.1667 16.6666 25.8333 16.6666 25.8333M9.99995 10C9.99995 19.7645 7.7184 33.3333 19.9999 33.3333C32.2815 33.3333 29.9999 19.7645 29.9999 10M6.66663 10H33.3333M25 10V8.33333C25 5.37494 22.2711 5 20 5C17.7288 5 15 5.37494 15 8.33333V10"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center py-3">
        <SimplePagination
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TableThree;
