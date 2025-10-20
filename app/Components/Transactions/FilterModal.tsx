import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/app/styles/transactions/transaction.module.scss";

interface FilterState {
  dateRange: string;
  startDate: Date | null;
  endDate: Date | null;
  transactionType: string;
  transactionStatus: string;
}

interface FilterModalProps {
  onClose: () => void;
  currentFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  currentFilters,
  onApplyFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleDateRangeChange = (range: string) => {
    // If the same range is clicked, deselect it (set to empty string)
    // Otherwise, select the new range
    const newRange = filters.dateRange === range ? "" : range;
    setFilters({
      ...filters,
      dateRange: newRange,
      startDate: null,
      endDate: null,
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleClear = () => {
    const clearedFilters = {
      dateRange: "",
      startDate: null,
      endDate: null,
      transactionType: "",
      transactionStatus: "",
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.filterGroup}>
          <div className={styles.dateButtons}>
            {["Today", "Last 7 days", "This month", "Last 3 months"].map(
              (range) => (
                <Button
                  key={range}
                  variant={
                    filters.dateRange === range ? "primary" : "outline-primary"
                  }
                  size="sm"
                  onClick={() => handleDateRangeChange(range)}
                  className={filters.dateRange === range ? "active" : ""}
                >
                  {range}
                </Button>
              )
            )}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label>Date Range</label>
          <div className={styles.dateRange}>
            <DatePicker
              selected={filters.startDate}
              onChange={(date: Date | null) =>
                setFilters({ ...filters, startDate: date })
              }
              selectsStart
              startDate={filters.startDate}
              endDate={filters.endDate}
              placeholderText="Start Date"
              className="form-control"
            />
            <DatePicker
              selected={filters.endDate}
              onChange={(date: Date | null) =>
                setFilters({ ...filters, endDate: date })
              }
              selectsEnd
              startDate={filters.startDate}
              endDate={filters.endDate}
              placeholderText="End Date"
              className="form-control"
            />
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label>Transaction Type</label>
          <Form.Select
            value={filters.transactionType}
            onChange={(e) =>
              setFilters({ ...filters, transactionType: e.target.value })
            }
          >
            <option value="">All Types</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="payment">Payment</option>
          </Form.Select>
        </div>
        <div className={styles.filterGroup}>
          <label>Transaction Status</label>
          <Form.Select
            value={filters.transactionStatus}
            onChange={(e) =>
              setFilters({ ...filters, transactionStatus: e.target.value })
            }
          >
            <option value="">All Statuses</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </Form.Select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClear}>
          Clear
        </Button>
        <Button variant="dark" onClick={handleApply}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
