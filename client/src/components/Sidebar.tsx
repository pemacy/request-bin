/*

Assuming bins looks like this:

bins = {
  id: integer
  UUIDv4: string
}
  
*/


const Sidebar = ({ bins }) => {
  const list = Object.values(bins);
  return (
    <nav className="sidebar">
      <div className="sidebar_title">Bins</div>

      {list.length === 0 ? (
        <div className="sidebar_empty">No bins yet</div>
      ) : (
        <ul className="sidebar_list">
          {list.map((bin) => {
            const id = bin.id;
            if (id === null) return null;
            const label = String(bin.UUIDv4 ?? id).slice(0, 8);

            return (
              <li key={id} className="sidebar_item">
                <a
                  className="sidebar_link"
                  href={`/${encodeURIComponent(id)}/records`}
                  title={label}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default Sidebar;
