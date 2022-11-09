import { apiRequest } from "@/render/utils/api";
import { toastOptionsTop } from "@/render/utils/toast";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";

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
  return (
    <div>
      <p>Velg Protokoll:</p>
      <select
        className="form-select select-arrow-down border w-full"
        onChange={handleChange}
        value={current ? current?.navn : ""}
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
    </div>
  );
};

export default SelectProtocol;
