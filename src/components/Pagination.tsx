import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
}: SimplePaginationProps) {
  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={currentPage === 1}
        className="flex justify-center items-center"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{currentPage}</strong> of{' '}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={currentPage === totalPages}
        className="flex justify-center items-center"
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
