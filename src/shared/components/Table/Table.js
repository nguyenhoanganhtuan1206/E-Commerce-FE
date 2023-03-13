import "./Table.scss";

const Table = (props) => {
  /*
  ? tableActions is all actions will create it yourself such as edit, delete,...
  */

  const {
    header = [],
    data = [],
    theadPrimary,
    tableStriped,
    tableBordered,
    tableActions,
  } = props;

  const classes = `table 
  ${theadPrimary && "thead-primary"}
  ${tableStriped && "table-striped"}
  ${tableBordered && "table-bordered"}
  ${tableActions}`;

  const keys = Object.keys(data[0]);

  return (
    <div className="table-responsive">
      <table className={`${classes}`}>
        <thead>
          <tr>
            {header.map((headerCell, index) => (
              <th key={index}>{headerCell}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {keys.map((key, keyIndex) => (
                <td key={keyIndex}>{row[key]}</td>
              ))}
            </tr>
          ))}

          {tableActions && <tr>{tableActions}</tr>}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
