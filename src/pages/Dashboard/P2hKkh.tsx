import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartTwo from '../../components/Charts/ChartTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { getAllData } from '../../api/fetching/p2h/p2hActions';
import toast, { Toaster } from 'react-hot-toast';

const ECommerce: React.FC = () => {
  const [p2hData, setP2hData] = useState('');
  const [kkhData, setKkhData] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllData();
        setP2hData(res.p2hData);
        setKkhData(res.kkhData);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'An error occurred');
      }
    };
    fetch();
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <CardDataStats title="Total Pengisian P2H" total={p2hData}>
          <svg
            className="fill-primary dark:fill-white"
            width="25"
            height="19"
            version="1.1"
            id="lni_lni-cog"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 64 64"
          >
            <g>
              <path
                d="M32.1,19.6c-6.8,0-12.4,5.6-12.4,12.4c0,6.9,5.6,12.4,12.4,12.4S44.5,38.9,44.5,32C44.5,25.2,38.9,19.6,32.1,19.6z
                M32.1,40c-4.4,0-7.9-3.6-7.9-7.9c0-4.4,3.5-7.9,7.9-7.9S40,27.7,40,32C40,36.4,36.4,40,32.1,40z"
              />
              <path
                d="M60.7,38.1l-5.6-3.1c0.2-1.1,0.3-2.2,0.3-3.3c0-1.2-0.1-2.3-0.2-3.4l5.7-3.2c1.3-0.7,1.8-2.3,1.2-3.7l-5.8-9.8
                c-0.7-1.2-2.3-1.7-3.6-1.2l-6,3.3c-0.3-0.2-0.6-0.5-0.8-0.7c-1.1-0.9-2.1-1.8-3.7-2.6c-0.1,0-0.2-0.1-0.2-0.3V6.5
                c0-2.6-2.1-4.8-4.8-4.8H26.9c-2.6,0-4.8,2.2-4.8,4.8l0,3.9c0,0.1-0.1,0.2-0.2,0.3c-1.5,0.7-2.6,1.7-3.8,2.6
                c-0.2,0.2-0.5,0.4-0.7,0.6l-5.3-3c-2-1.1-3.7-0.4-4.4,0.8l-5.5,9.5C1.9,22,1.8,22.8,2,23.6c0.2,0.8,0.7,1.4,1.4,1.8L9,28.4
                c-0.2,1-0.2,2.1-0.2,3.4c0,1.1,0.1,2.2,0.2,3.3l-5.8,3.2C1.9,39,1.4,40.6,2,42l5.8,9.8C8.5,53,10,53.5,11.4,53l6-3.3
                c0.3,0.2,0.5,0.4,0.8,0.7c1.1,1,2.2,1.9,3.8,2.6c0.1,0,0.2,0.1,0.2,0.3v4.3c0,2.6,2.1,4.8,4.8,4.8h10.2c2.6,0,4.8-2.2,4.8-4.8V53
                c0-0.1,0.1-0.2,0.2-0.3c1.5-0.7,2.5-1.6,3.7-2.6c0.3-0.2,0.5-0.4,0.8-0.7l5.3,3c2,1.1,3.6,0.4,4.4-0.8l5.6-9.5
                c0.4-0.7,0.5-1.5,0.3-2.2S61.4,38.5,60.7,38.1z M53.1,48l-4.8-2.7c-1.4-0.8-3-0.6-4.2,0.4c-0.5,0.4-0.9,0.7-1.3,1.1
                c-1,0.9-1.7,1.5-2.7,1.9c-1.6,0.8-2.7,2.5-2.7,4.3v4.4c0,0.2-0.1,0.3-0.3,0.3H26.9c-0.2,0-0.3-0.1-0.3-0.3v-4.3
                c0-1.8-1.1-3.5-2.7-4.3c-1-0.5-1.8-1.1-2.8-2c-0.4-0.3-0.8-0.7-1.3-1c-0.7-0.5-1.5-0.8-2.4-0.8c-0.6,0-1.3,0.2-1.9,0.5l-4.8,2.7
                l-4-6.8l4.7-2.6c1.4-0.8,2.2-2.3,2-4c-0.1-1-0.2-2-0.2-3c0-1.1,0.1-2.1,0.2-2.9c0.3-1.7-0.5-3.4-2-4.2L7,22.2l3.9-6.7l4.8,2.7
                c1.4,0.8,3,0.6,4.2-0.4c0.4-0.3,0.8-0.7,1.2-1c1-0.9,1.8-1.5,2.8-2c1.7-0.8,2.7-2.5,2.7-4.3l0-3.9c0-0.2,0.1-0.3,0.3-0.3h10.2
                c0.2,0,0.3,0.1,0.3,0.3v3.8c0,1.8,1.1,3.5,2.7,4.3c1,0.5,1.7,1.1,2.7,1.9c0.4,0.4,0.8,0.7,1.3,1.1c1.2,1,2.9,1.1,4.2,0.3l4.8-2.7
                l4,6.8l-4.6,2.6c-1.4,0.8-2.2,2.5-1.9,4.2c0.1,0.9,0.2,1.9,0.2,2.9c0,1-0.1,2-0.3,3c-0.3,1.7,0.5,3.3,2,4.1l4.5,2.5L53.1,48z"
              />
            </g>
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Pengisian KKH" total={kkhData}>
          <svg
            className="fill-primary dark:fill-white"
            width="25"
            height="19"
            version="1.1"
            id="lni_lni-briefcase"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 64 64"
          >
            <path
              d="M56,13.2H44.8V7.7c0-2.9-2.4-5.3-5.3-5.3H24.4c-2.9,0-5.3,2.4-5.3,5.3v5.5H8c-3.4,0-6.3,2.8-6.3,6.3v35.8
              c0,3.4,2.8,6.3,6.3,6.3h48c3.4,0,6.3-2.8,6.3-6.3V19.5C62.2,16,59.4,13.2,56,13.2z M23.7,7.7C23.7,7.3,24,7,24.4,7h15.1
              c0.4,0,0.8,0.3,0.8,0.8v5.5H23.7V7.7z M57.7,55.3c0,1-0.8,1.8-1.8,1.8H8c-1,0-1.8-0.8-1.8-1.8V19.5c0-1,0.8-1.8,1.8-1.8h48
              c1,0,1.8,0.8,1.8,1.8V55.3z"
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
      <Toaster position="bottom-right" />
    </DefaultLayout>
  );
};

export default ECommerce;
