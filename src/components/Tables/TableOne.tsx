import { useEffect, useState } from 'react';
import { SimplePagination } from '../Pagination';
import { getAllP2h, validateAdmin } from '../../api/fetching/p2h/p2hActions';
import { P2h } from '../../api/fetching/p2h/type';
import toast, { Toaster } from 'react-hot-toast';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

const TableOne = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [packageData, setPackageData] = useState<P2h[]>([]);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState<P2h[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllP2h();
        setPackageData(response.p2h);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filterDate) {
      // Format tanggal yang dipilih ke dalam format yang sesuai dengan createdAt
      const selectedDateString = flatpickr.formatDate(filterDate, 'Y-m-d');

      // Filter data berdasarkan createdAt
      const filtered = packageData.filter((item) =>
        item.createdAt.includes(selectedDateString),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(packageData);
    }
  }, [filterDate, packageData]);

  const handleFilterChange = (selectedDates: Date[]) => {
    if (selectedDates.length > 0) {
      setFilterDate(selectedDates[0]);
    } else {
      setFilterDate(null);
    }
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleValidateAdmin = async (index: number) => {
    try {
      const p2hData = packageData[index];
      const response = await validateAdmin(p2hData);
      toast.success(response.message);

      const updatedPackageData = [...packageData];
      updatedPackageData[index].aValidation = true;

      setPackageData(updatedPackageData);
    } catch (error) {
      console.error('Error validating admin:', error);
      toast.error('Failed to validate admin');
    }
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-1 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Pengisian Pelaksanaan Perawatan Harian (P2H)
          </h4>
          <div>
            <label htmlFor="filterDate" className="mr-2 font-medium">
              Filter by Date:
            </label>
            <input
              id="filterDate"
              className="border border-gray-300 rounded px-3 py-1"
              onChange={(e) => {
                const selectedDate = e.target.value;
                if (selectedDate) {
                  const dateObject = new Date(selectedDate);
                  handleFilterChange([dateObject]);
                } else {
                  handleFilterChange([]);
                }
              }}
              value={
                filterDate
                  ? flatpickr.formatDate(filterDate, 'YYYY-MM-DD HH:MM')
                  : ''
              }
              type="date"
            />
          </div>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Unit
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Code Unit
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Foreman
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Admin
              </th>
              <th className="py-4 px-3 text-center font-medium text-black dark:text-white ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((packageItem, index) => (
              <tr key={packageItem.id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.P2h.date}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark ">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.P2h?.Vehicle?.type}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark xl:pl-9">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.P2h.nou}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.fValidation
                        ? 'bg-success text-success'
                        : 'bg-danger text-danger'
                    }`}
                  >
                    {packageItem.fValidation ? 'Validated' : 'Not Validated'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.aValidation
                        ? 'bg-success text-success'
                        : 'bg-danger text-danger'
                    }`}
                  >
                    {packageItem.aValidation ? 'Validated' : 'Not Validated'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                  <div className="flex items-center justify-center">
                    <button
                      className="hover:text-primary"
                      onClick={() => handleValidateAdmin(index + offset)}
                    >
                      <svg
                        className="fill-current"
                        width="21"
                        height="21"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                      >
                        <g>
                          <path
                            d="M32,1.8C15.3,1.8,1.8,15.3,1.8,32S15.3,62.3,32,62.3S62.3,48.7,62.3,32S48.7,1.8,32,1.8z M32,57.8
                            C17.8,57.8,6.3,46.2,6.3,32C6.3,17.8,17.8,6.3,32,6.3c14.2,0,25.8,11.6,25.8,25.8C57.8,46.2,46.2,57.8,32,57.8z"
                          />
                          <path
                            d="M40.6,22.7L28.7,34.3L23.3,29c-0.9-0.9-2.3-0.8-3.2,0c-0.9,0.9-0.8,2.3,0,3.2l6.4,6.2c0.6,0.6,1.4,0.9,2.2,0.9
                            c0.8,0,1.6-0.3,2.2-0.9L43.8,26c0.9-0.9,0.9-2.3,0-3.2S41.5,21.9,40.6,22.7z"
                          />
                        </g>
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
};

export default TableOne;
