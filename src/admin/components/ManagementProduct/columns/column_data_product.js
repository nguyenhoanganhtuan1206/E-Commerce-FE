export const productColumns = [
  {
    field: "name",
    headerName: "Product Name",
    width: 250,
  },
  {
    field: "categorization",
    headerName: "Categorization",
    width: 230,
    renderCell: (params) => {
      return (
        <div style={{ height: "maxContent" }}>
          {Object.entries(params.row.inventories)
            .sort((a, b) => a[1].colorValue - b[1].colorValue)
            .map((inventory, index) => (
              <p key={index}>
                {inventory[1].colorValue}, {inventory[1].sizeValue}
              </p>
            ))}
        </div>
      );
    },
  },
];
