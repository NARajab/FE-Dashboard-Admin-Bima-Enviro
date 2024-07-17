import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { SimplePagination } from '../Pagination';
import dataProduct from '../../data/productData.json';

const TableTwo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [productData, setProductData] = useState<Product[]>([]);
  const [data, setData] = useState(productData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Product | null>(null);

  useEffect(() => {
    setProductData(dataProduct.productData);
  }, []);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleValidateForeman = (index: number) => {
    const newData = [...data];
    newData[index].foreman = 'Validated';
    setData(newData);
  };

  const handleOpenModal = (packageItem: Product) => {
    setSelectedPackage(packageItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = productData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(productData.length / itemsPerPage);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-1 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="py-4 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Pengisian Kesiapan Kerja Harian (KKH)
          </h4>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Nama
              </th>
              <th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
                Tanggal
              </th>
              <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                Total Jam
              </th>
              <th className="min-w-[170px] py-4 px-4 font-medium text-black dark:text-white">
                Keluhan
              </th>
              <th className="min-w-[170px] py-4 px-4 font-medium text-black dark:text-white">
                Foreman
              </th>
              <th className="min-w-[170px] py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((productItem, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {productItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {productItem.date}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5 className="font-medium text-black dark:text-white">
                    {productItem.tt}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-4 px-4 pl-9 dark:border-strokedark xl:pl-3">
                  <h5
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      productItem.complaint === 'Fit to work'
                        ? 'bg-success text-success'
                        : productItem.complaint === 'On Monitoring'
                        ? 'bg-warning text-warning'
                        : productItem.complaint === 'Kurang Tidur'
                        ? 'bg-danger text-danger'
                        : ''
                    }`}
                  >
                    {productItem.complaint}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      productItem.foreman === 'Validated'
                        ? 'bg-success text-success'
                        : 'bg-danger text-danger'
                    }`}
                  >
                    {productItem.foreman}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
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
                    <button
                      className="hover:text-primary"
                      onClick={() => handleValidateForeman(index + offset)}
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
  packageItem: Product;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg p-6 shadow-lg"
        style={{ width: '500px', height: '400px' }}
      >
        <img
          className="w-full h-full object-contain mb-4"
          src={packageItem.imageUrl}
          alt="image"
        />
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

export default TableTwo;
