import React from "react";
import { Paginator } from "primereact/paginator";
import { Ripple } from "primereact/ripple";
import { classNames } from "primereact/utils";
import "./style.scss";

const Pagination = ({ rows, totalRecords, onPageChange, first }) => {
  const template1 = {
    layout: "PrevPageLink PageLinks NextPageLink",
    PrevPageLink: options => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-paginator-icon pi pi-angle-left pagination-fontPreviusNext"></span>
        </button>
      );
    },
    NextPageLink: options => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-paginator-icon pi pi-angle-right pagination-fontPreviusNext"></span>
          <Ripple />
        </button>
      );
    },

    PageLinks: options => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, "pagination-semborda");

        return (
          <button type="button" className={className} onClick={options.onClick}>
            <span style={{ userSelect: "none" }}>...</span>
          </button>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          <span className="pagination-font">{options.page + 1}</span>
          <Ripple />
        </button>
      );
    },
  };

  return (
    <div className="paginator-demo">
      <div className="card">
        <Paginator
          pageLinkSize={7}
          first={first}
          template={template1}
          rows={rows}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
        ></Paginator>
      </div>
    </div>
  );
};

export default Pagination;
