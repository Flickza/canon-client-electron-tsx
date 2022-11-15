import { apiRequest } from "@/render/utils/api";
import { toastOptionsTop } from "@/render/utils/toast";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";
import NewProtocol from "../NewProtocol";

const SelectProtocol = ({
  series,
  current,
  set,
  setUpdateProtocol,
  updateProtocol,
}: {
  series: Series | undefined;
  current: Protocol | undefined;
  set: React.Dispatch<React.SetStateAction<Protocol | undefined>>;
  setUpdateProtocol: React.Dispatch<React.SetStateAction<boolean>>;
  updateProtocol: boolean;
}) => {
  const [protocol, setProtocol] = React.useState<Array<Protocol>>();
  useEffect(() => {
    const fetchData = async () => {
      if (series?.id === undefined) return setProtocol(undefined);
      await apiRequest("get", `/protocol/get/${series?.id?.toString()}`)
        .then((response: AxiosResponse<Array<Protocol>>) => {
          setUpdateProtocol(false);
          setProtocol(response?.data);

          if (response?.data[0]?.navn && response?.data[0]?.id) {
            return set({
              id: response.data[0].id,
              navn: response.data[0].navn,
              series_id: series.id,
            });
          } else {
            set(undefined);
            return toast.warn(
              `Det finnes ingen protokoll på ${
                series?.navn ? series.navn : ""
              }. Legg til en ny?`,
              toastOptionsTop as ToastOptions
            );
          }
        })
        .catch((err) => console.error(err));
    };

    fetchData().catch((err) => {
      throw err;
    });
  }, [series, updateProtocol]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.children[index];
    const id = el.getAttribute("id");
    const value = el.getAttribute("value");
    if (id && value) {
      set({
        id: Number(id),
        navn: value,
        series_id: series?.id,
      });
    }
  };
  const [show, setShow] = React.useState(true);

  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <p>Velg Protokoll:</p>
      <span className="flex gap-3">
        <select
          className="form-select select-arrow-down border w-11/12"
          onChange={handleChange}
          value={protocol ? current?.navn : ""}
          disabled={series?.id === undefined}
        >
          {protocol?.map((a?) => {
            return (
              <option className="form-select" key={a?.navn} value={a?.id}>
                {a?.navn}
              </option>
            );
          })}
        </select>
        <button className="btn btn-main border w-1/12" onClick={toggleShow}>
          <span className="flex justify-center">
            <svg
              fill="white"
              width={"60%"}
              x="0px"
              y="0px"
              viewBox="0 0 290 290"
            >
              <g>
                <path d="M255,110c-19.299,0-35,15.701-35,35s15.701,35,35,35s35-15.701,35-35S274.299,110,255,110z" />
                <path d="M35,110c-19.299,0-35,15.701-35,35s15.701,35,35,35s35-15.701,35-35S54.299,110,35,110z" />
                <path d="M145,110c-19.299,0-35,15.701-35,35s15.701,35,35,35s35-15.701,35-35S164.299,110,145,110z" />
              </g>
            </svg>
          </span>
        </button>
      </span>
      <div className="transition-all mt-1" hidden={show}>
        <NewProtocol setUpdateProtocol={setUpdateProtocol} series={series} />
      </div>
    </>
  );
};

export default SelectProtocol;
