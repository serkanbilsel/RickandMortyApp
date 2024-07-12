export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
  };

  export interface PaginationProps {
    page: number;
    totalPages: number;
    onNextPage: () => void;
    onPrevPage: () => void;
  };