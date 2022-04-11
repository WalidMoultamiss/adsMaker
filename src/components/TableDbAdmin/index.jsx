import { useEffect } from "react";

export const TableDBAdmin = ({}) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      const [livraisons, setLivraison] = useState([]);
    
    
      useEffect(() => {
        fetch("http://localhost:5000/api/livraison/", requestOptions)
        .then(response => response.json())
        .then(
          (result )=> {setLivraison(result)
            console.log("result")
          },
          (error) => console.log('error', error),
          
        )
        .catch(error => console.log('error', error));
      }, []);


  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
          <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Role
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {livraisons.map((e) => {
                <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Ahmed Kamel
                        </div>
                        <div className="text-sm text-gray-500">
                          ahmed.kamel@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Regional Paradigm Technician
                    </div>
                    <div className="text-sm text-gray-500">Optimization</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    Admin
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit zz
                    </a>
                  </td>
                </tr>;
                
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
