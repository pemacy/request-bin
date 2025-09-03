import type { Bin } from '../utils/types'
/*

Assuming bins looks like this:

bins = {
  id: integer
  UUIDv4: string
}
  
*/


const Sidebar = ({ bins }: { bins: Bin[] }) => {
  const list = Object.values(bins);
  return (
    <nav className="h-full flex flex-col">
      <div className="px-4 py-3 text-lg font-semibold border-b border-gray-700">
        Bins
      </div>

      {list.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          No bins yet
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto p-4 space-y-2">
          {list.map((bin) => {
            const id = bin.id;
            if (id === null) return null;
            const label = String(id).slice(0, 8);

            return (
              <li key={id}>
                <a
                  className="block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white transition"
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
