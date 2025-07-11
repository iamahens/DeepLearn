import React, { useState } from 'react';

const DataTable = ({ title, data = [], columns = [], maxRows = 10 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Default data if none provided
  const defaultData = [
    { id: 1, user: 'admin', action: 'LOGIN', ip: '192.168.1.100', time: '12:34:56', status: 'SUCCESS' },
    { id: 2, user: 'dev_user', action: 'FILE_UPLOAD', ip: '10.0.0.25', time: '12:35:12', status: 'SUCCESS' },
    { id: 3, user: 'guest', action: 'LOGIN', ip: '203.123.45.67', time: '12:35:45', status: 'FAILED' },
    { id: 4, user: 'admin', action: 'CONFIG_CHANGE', ip: '192.168.1.100', time: '12:36:01', status: 'SUCCESS' },
    { id: 5, user: 'api_bot', action: 'DATA_SYNC', ip: '172.16.0.10', time: '12:36:23', status: 'SUCCESS' },
    { id: 6, user: 'user123', action: 'PASSWORD_RESET', ip: '45.67.89.123', time: '12:37:45', status: 'WARNING' },
    { id: 7, user: 'monitor', action: 'HEALTH_CHECK', ip: '127.0.0.1', time: '12:38:00', status: 'SUCCESS' },
    { id: 8, user: 'backup_svc', action: 'BACKUP_START', ip: '10.10.10.5', time: '12:39:15', status: 'SUCCESS' },
    { id: 9, user: 'scanner', action: 'VULNERABILITY_SCAN', ip: '172.20.0.5', time: '12:40:30', status: 'WARNING' },
    { id: 10, user: 'admin', action: 'SYSTEM_RESTART', ip: '192.168.1.100', time: '12:41:00', status: 'SUCCESS' },
    { id: 11, user: 'unknown', action: 'BRUTE_FORCE', ip: '1.2.3.4', time: '12:41:30', status: 'BLOCKED' },
    { id: 12, user: 'dev_user', action: 'CODE_DEPLOY', ip: '10.0.0.25', time: '12:42:15', status: 'SUCCESS' }
  ];

  const defaultColumns = [
    { key: 'user', label: 'User', width: '15%' },
    { key: 'action', label: 'Action', width: '25%' },
    { key: 'ip', label: 'IP Address', width: '20%' },
    { key: 'time', label: 'Time', width: '15%' },
    { key: 'status', label: 'Status', width: '15%' }
  ];

  const tableData = data.length > 0 ? data : defaultData;
  const tableColumns = columns.length > 0 ? columns : defaultColumns;

  const totalPages = Math.ceil(tableData.length / maxRows);
  const startIndex = currentPage * maxRows;
  const endIndex = startIndex + maxRows;
  const currentData = tableData.slice(startIndex, endIndex);

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'SUCCESS': return 'var(--pixel-accent)';
      case 'FAILED': 
      case 'BLOCKED': return 'var(--pixel-danger)';
      case 'WARNING': return 'var(--pixel-warning)';
      case 'INFO': return 'var(--pixel-info)';
      default: return 'var(--pixel-text)';
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="pixel-container">
      {title && <div className="pixel-chart-title">{title}</div>}
      
      <div style={{ overflowX: 'auto', marginTop: '16px' }}>
        <table className="pixel-table">
          <thead>
            <tr>
              {tableColumns.map((column, index) => (
                <th 
                  key={index}
                  style={{ width: column.width || 'auto' }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {tableColumns.map((column, colIndex) => (
                  <td 
                    key={colIndex}
                    style={{
                      color: column.key === 'status' 
                        ? getStatusColor(row[column.key]) 
                        : 'var(--pixel-text)'
                    }}
                  >
                    {column.key === 'status' && row[column.key] && (
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <div 
                          className="pixel-status"
                          style={{
                            backgroundColor: getStatusColor(row[column.key]),
                            borderColor: getStatusColor(row[column.key]),
                            marginRight: '6px',
                            width: '8px',
                            height: '8px'
                          }}
                        ></div>
                        {row[column.key]}
                      </span>
                    )}
                    {column.key !== 'status' && row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          padding: '8px',
          background: 'var(--pixel-bg-primary)',
          border: '1px solid var(--pixel-border)'
        }}>
          <button 
            className="pixel-button"
            onClick={prevPage}
            disabled={currentPage === 0}
            style={{
              opacity: currentPage === 0 ? 0.5 : 1,
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ◄ Prev
          </button>
          
          <span style={{ 
            fontSize: '10px', 
            color: 'var(--pixel-text-dim)' 
          }}>
            Page {currentPage + 1} of {totalPages} 
            ({tableData.length} records)
          </span>
          
          <button 
            className="pixel-button"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            style={{
              opacity: currentPage === totalPages - 1 ? 0.5 : 1,
              cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Next ►
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;