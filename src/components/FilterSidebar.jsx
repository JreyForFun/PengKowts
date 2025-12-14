import { Filter } from 'lucide-react';
import { categories as categoriesData } from '../data/categories';
import CustomSelect from './CustomSelect';

const FilterSidebar = ({
  currentCategory,
  onCategoryChange,
  currentSort,
  onSortChange,
  className
}) => {
  return (
    <div className={className} style={{
      backgroundColor: 'var(--color-white)',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-soft)',
      height: 'fit-content',
      position: 'sticky',
      top: '90px'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          fontSize: '1.2rem',
          color: 'var(--color-text-main)'
        }}>
          <Filter size={20} color="var(--color-primary)" />
          Filters
        </h3>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'var(--color-text-light)'
          }}>Sort By</label>
          <div style={{ position: 'relative' }}>
            <CustomSelect
              options={[
                { label: 'Recent', value: 'recent' },
                { label: 'Most Liked (Local)', value: 'liked' },
                { label: 'Random Shuffle', value: 'random' }
              ]}
              value={currentSort}
              onChange={onSortChange}
            />
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'var(--color-text-light)'
          }}>
            Category
          </label>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxHeight: '400px',
            overflowY: 'auto',
            paddingRight: '5px'
          }}>
            <button
              onClick={() => onCategoryChange('')}
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: !currentCategory ? 'var(--color-primary)' : 'transparent',
                color: !currentCategory ? 'var(--color-white)' : 'var(--color-text-main)',
                transition: 'var(--transition-fast)',
                fontSize: '0.95rem',
                fontWeight: !currentCategory ? 600 : 400
              }}
            >
              All Categories
            </button>
            {categoriesData.map(cat => (
              <button
                key={cat.name}
                onClick={() => onCategoryChange(cat.name)}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: currentCategory === cat.name ? 'var(--color-primary)' : 'transparent',
                  color: currentCategory === cat.name ? 'var(--color-white)' : 'var(--color-text-main)',
                  transition: 'var(--transition-fast)',
                  fontSize: '0.95rem',
                  fontWeight: currentCategory === cat.name ? 600 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {/* Optional: Icon in sidebar too? Might be too cluttered. Let's keep it clean text or simple dot. */}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
