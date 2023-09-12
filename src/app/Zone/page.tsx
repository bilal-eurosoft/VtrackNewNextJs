"use client";

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getZoneListByClientId } from "@/utils/API_CALLS";
import { zonelistType } from "@/types/zoneType";

export default function Zone() {
  const { data: session } = useSession();
  const [zoneList, setZoneList] = useState<zonelistType[]>([]);
  const [inputs, setInputs] = useState("");
  useEffect(() => {
    (async function () {
      if (session) {
        const allzoneList = await getZoneListByClientId({
          token: session?.accessToken,
          clientId: session?.clientId,
        });
        setZoneList(allzoneList);
      }
    })();
  }, []);

  const router = useRouter();

  function handleSearchClick(e: React.FormEvent<HTMLFormElement>) {
    if (inputs === "") {
      setZoneList(zoneList);
      return;
    }
    e.preventDefault();
    const filterBySearch = zoneList.filter((item) => {
      if (
        item.zoneName.toLowerCase().includes(inputs.toLowerCase()) ||
        item.zoneShortName.toLowerCase().includes(inputs.toLowerCase())
      )
        return item;
    });

    setZoneList(filterBySearch);
  }

  const handleClick = () => {
    router.push("/AddZone");
  };

  return (
    <div>
      <form onSubmit={handleSearchClick}>
        <div className="mx-4">
          <p className="bg-[#00B56C] px-4 py-1 text-white">Zone</p>
          <div className="grid lg:grid-cols-2 md:grid-cols-2  gap-6 pt-5 px-5 bg-green-50 ">
            <div className="lg:col-span-1">
              <label className="">Zone name</label>
              <input
                type="text"
                className="block py-2 px-0 w-full text-sm text-grayLight bg-white-10 border-0 border-2 border-gray-200 appearance-none px-3 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none "
                placeholder="Enter Zone Name "
                required
                onChange={(e) => setInputs(e.target.value)}
              />
            </div>
            <div className="lg:col-span-1 md:col-span-1 col-span-1">
              <label className="">Zone sort name</label>
              <input
                type="text"
                className="block py-2 px-0 w-full text-sm text-grayLight bg-white-10 border-0 border-2 border-grayLight-200 appearance-none px-3 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none "
                placeholder="Enter Zone Name "
                required
                onChange={(e) => setInputs(e.target.value)}
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2  gap-6 pt-5 px-5 bg-green-50 ">
            <div className="lg:col-span-1">
              <label>Geofence</label>
              <select
                className="block py-2 px-0 w-full text-sm text-grayLight bg-white-10 border-0 border-2 border-gray-200 appearance-none px-3 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 outline-none "
                placeholder="Enter Zone Name "
                required
                onChange={(e) => setInputs(e.target.value)}
              >
                <option>On-Site</option>
                <option>Off-Site</option>
                <option>City-Area</option>
              </select>
            </div>
            <div className="lg:col-span-1 md:col-span-1 col-span-1">
              <label className="">Zone Type</label>
              <br></br>
              <button className=" border-2 border-grayLight px-4 h-10">
                Circle
              </button>
              <button className=" border-2 border-grayLight px-4 h-10">
                Polygon
              </button>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2  gap-6 pt-5 px-5 bg-green-50 ">
            <div className="lg:col-span-1">
              <div className="text-start">
                <button
                  className="text-white px-4 h-10 bg-[#00B56C] mr-3"
                  /* onClick={handleSearchClick} */
                  type="submit"
                >
                  Search
                </button>
                <button className="text-gray px-7 h-10 bg-white border-2 border-gray-200">
                  Clear
                </button>
              </div>
            </div>
            <div className="lg:col-span-1 md:col-span-1 col-span-1">
              <div className="lg:text-end sm:text-start text-start ">
                <button
                  className="text-white px-4 h-10 bg-[#00B56C] mr-3"
                  onClick={handleClick}
                >
                  Add Zone
                </button>
                <button className="text-gray px-7 h-10 bg-white border-2 border-gray-200">
                  Delete Zone
                </button>
              </div>
              <br></br>
            </div>
          </div>
        </div>
        <br></br>
      </form>
      <div className="bg-gray-100  mx-4 ">
        <p className="bg-[#00B56C] px-4 py-1 text-white ">Zone</p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-96">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  zone Name
                </th>
                <th scope="col" className="px-6 py-3">
                  zone Short Name
                </th>
                <th scope="col" className="px-6 py-3">
                  zone Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {zoneList?.map((item: zonelistType) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.zoneName}
                  </th>
                  <td className="px-6 py-4">{item.zoneShortName}</td>
                  <td className="px-6 py-4">{item.zoneType}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
