import { useState } from 'react';
import { UserData } from '../interfaces/UserData';

interface FilterSortProps {
  users: UserData[];
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sortOption: string) => void;
}

export interface FilterOptions {
  status: string;
  assignedUser: string;
}

const FilterSort = ({ users, onFilterChange, onSortChange }: FilterSortProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    assignedUser: 'all'
  });

  console.log('Users in FilterSort:', users);

  const handleFilterChange = (name: string, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-sort-container">
      <div className="filter-group">
        <label>Status:</label>
        <select 
          onChange={(e) => handleFilterChange('status', e.target.value)}
          value={filters.status}
        >
          <option value="all">All</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <label>Assigned To:</label>
        <select 
          onChange={(e) => handleFilterChange('assignedUser', e.target.value)}
          value={filters.assignedUser}
        >
          <option value="all">All</option>
          {users && users.length > 0 && users.map(user => (
            <option key={user.id} value={user.username || ''}>
              {user.username || ''}
            </option>
          ))}
        </select>

        <label>Sort By:</label>
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="name">Name</option>
          <option value="assignee">Assignee</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;