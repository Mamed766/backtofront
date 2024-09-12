"use client";
/* eslint-disable */
import { useState } from "react";
import { useRequest, useRequestMutation } from "./_http/axiosFetcher";
import { CheckStatus } from "./_utils/helper";
import EditModal from "./edit/[id]/page";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const { data, isLoading, error } = useRequest("todos", {
    method: "GET",
    module: "devApi",
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { trigger: deleteProject } = useRequestMutation("dataWithId", {
    method: "DELETE",
    module: "devApi",
  });

  if (isLoading) {
    return <div> Loading..</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async (card: any) => {
    try {
      await deleteProject({
        dynamicValue: card._id,
      });
      mutate("todo");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-10">
      <button
        onClick={() => router.push("/create")}
        className="bg-[#684DF4]  text-white p-2 mb-5 rounded-md"
      >
        Create new
      </button>
      <div className=" bg-white shadow-2xl justify-center flex gap-5 flex-wrap rounded-md p-5">
        {data &&
          data?.data?.map((item: any) => (
            <div
              key={item.id}
              className="bg-white shadow-2xl rounded-lg  flex justify-center flex-col gap-2 min-w-[300px] max-w-[400px] py-5 px-5  mb-4"
            >
              <div className="flex gap-2 justify-between">
                <div className="font-semibold"> Name: {item.name}</div>
                <div className="flex items-center  gap-2">
                  Status:{" "}
                  <p
                    className={`${CheckStatus(
                      item.status
                    )}  text-[10px] p-1 rounded`}
                  >
                    {" "}
                    {item.status}{" "}
                  </p>
                </div>
              </div>
              <div>
                <p>Surname: {item.surname}</p>
              </div>
              <div>
                <p>Age: {item.age}</p>
              </div>
              <div
                style={{
                  width: `${item.percent}%`,
                }}
                className={` h-2 bg-blue-300 rounded ${CheckStatus(
                  item.status
                )}`}
              ></div>
              <button
                onClick={() => handleEditClick(item)}
                className="bg-[#684DF4] text-white p-2 rounded-md mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="bg-red-500 p-2 rounded-md text-white"
              >
                Delete
              </button>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <EditModal card={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
}
