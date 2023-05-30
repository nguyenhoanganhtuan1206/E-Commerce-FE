export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Product Name",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 230,
    renderCell: (params) => {
      return (
        <>
          <span>${params.row.price.toFixed(2)}</span>
        </>
      );
    },
  },
  {
    field: "condition",
    headerName: "Condition",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <span>{params.row.condition.toUpperCase()}</span>
        </>
      );
    },
  },
  {
    field: "condition",
    headerName: "Condition",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <span>{params.row.condition.toUpperCase()}</span>
        </>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div
          className={`cell__status ${params.row.productApproval.toLowerCase()}`}
        >
          {params.row.productApproval}
        </div>
      );
    },
  },
];
