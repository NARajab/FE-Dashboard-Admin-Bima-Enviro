import TableFour from '../../components/Tables/TableFour';
import DefaultLayout from '../../layout/DefaultLayout';

const TableTm = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <TableFour />
      </div>
    </DefaultLayout>
  );
};

export default TableTm;
