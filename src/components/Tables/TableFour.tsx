import { useEffect, useState } from 'react';
import { SimplePagination } from '../Pagination';
import { getAllTimesheet } from '../../api/fetching/timesheet/timesheetActions';
import { Timesheet } from '../../api/fetching/timesheet/type';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

const TableFour = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [productData, setProductData] = useState<Timesheet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Timesheet | null>(
    null,
  );
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState<Timesheet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTimesheet();
        console.log(response.lokasi);
        setProductData(response.lokasi);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (filterDate) {
      const selectedDateString = flatpickr.formatDate(filterDate, 'Y-m-d');

      // Filter data berdasarkan createdAt
      const filtered = productData.filter((item) =>
        item.createdAt.includes(selectedDateString),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(productData);
    }
  }, [filterDate, productData]);

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

  const handleOpenModal = (packageItem: Timesheet) => {
    setSelectedPackage(packageItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-1 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="py-4 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Timesheet Filling Data
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
              <th className=" py-4 px-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className=" py-4 px-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className=" py-4 px-4 font-medium text-black dark:text-white">
                PIT
              </th>
              <th className=" py-4 px-4 font-medium text-black dark:text-white">
                Disposal
              </th>
              <th className=" py-4 px-4 font-medium text-black dark:text-white">
                Location
              </th>
              <th className="py-4 px-4 flex justify-center text-center font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((productItem, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {productItem.User.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {productItem.date}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {productItem.pit}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {productItem.disposal}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {productItem.location}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex justify-center text-center">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => handleOpenModal(productItem)}
                    >
                      <svg
                        className="fill-current"
                        width="21"
                        height="21"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.87499C8.26562 7.87499 7.875 8.26562 7.875 8.99999C7.875 9.73437 8.26562 10.125 9 10.125C9.73438 10.125 10.125 9.73437 10.125 8.99999C10.125 8.26562 9.73438 7.87499 9 7.87499Z"
                          fill=""
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
      {isModalOpen && selectedPackage && (
        <Modal packageItem={selectedPackage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

const Modal = ({
  packageItem,
  onClose,
}: {
  packageItem: Timesheet;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        className="bg-slate-50 rounded-lg p-6 shadow-lg"
        style={{ width: 'auto', height: 'auto' }}
      >
        <h2 className="text-xl font-semibold mb-4 text-black">Timesheet</h2>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border text-black">Time</th>
              <th className="px-4 py-2 border text-black">Material</th>
              <th className="px-4 py-2 border text-black">Remark</th>
              <th className="px-4 py-2 border text-black">Activity Code</th>
              <th className="px-4 py-2 border text-black">Delay Code</th>
              <th className="px-4 py-2 border text-black">Idle Code</th>
              <th className="px-4 py-2 border text-black">Repair Code</th>
            </tr>
          </thead>
          <tbody>
            {packageItem.Timesheets.map((timesheet, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border text-black">
                  {timesheet.timeTs || '-'}
                </td>
                <td className="px-4 py-2 border text-black">
                  {timesheet.material || '-'}
                </td>
                <td className="px-4 py-2 border text-black">
                  {timesheet.remark || '-'}
                </td>
                <td className="px-4 py-2 border text-black">
                  {timesheet.activityCode || '-'}
                </td>
                <td className="px-4 py-2 border text-black">
                  {timesheet.delayCode || '-'}
                </td>
                <td className="px-4 py-2 border text-black">
                  {timesheet.idleCode || '-'}
                </td>
                <td className="px-4 py-2 border text-black">
                  {timesheet.repairCode || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="mt-4 py-2 px-4 bg-primary text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TableFour;
