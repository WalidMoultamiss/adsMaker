import { useEffect, useState } from "react";
import axios from "axios";

export const TableNew = ({
  reload,
  setLivraisons,
  setSelectedLivraisonFromTable,
}) => {
  const [livraisons, setLivraison] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/livraison/")
      .then((response) => response.data)
      .then(
        (result) => {
          setLivraison(result);
          setLivraisons(result);
          console.log(result);
        },
        (error) => console.log("error", error)
      )
      .catch((error) => console.log("error", error));
  }, [reload]);

  const TableHeads = [
    "from",
    "to",
    "kg",
    "price",
    "estimated distance",
    "date de livraison",
    "type de livraison",
    "action",
  ];

  return (
    <div className="-my-2 mt-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
          <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {TableHeads?.map((head, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {livraisons.map((l, i) => (
                <tr
                  key={i}
                  className="transition-all hover:bg-gray-100 hover:shadow-lg"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{l.from}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{l.to}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{l.kg}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{l.montant}</td>
                  <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                    {l.estimatedDistance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {l.dateLivraison}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{l.type}</td>
                  <td className="px-6 py-4 text-sm font-medium flex gap-3 whitespace-nowrap">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 p-3 rounded-full bg-indigo-200"
                      onClick={() => {
                        setSelectedLivraisonFromTable(l);
                      }}
                    >
                      Select Livraison
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
