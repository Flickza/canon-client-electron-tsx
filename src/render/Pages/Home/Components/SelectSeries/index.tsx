import { apiRequest } from "@/render/utils/api";
import { toastOptionsTop } from "@/render/utils/toast";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";

const SelectSeries = ({
  arkivskaper,
  project,
  current,
  set,
  setUpdateSeries,
  updateSeries,
}: {
  arkivskaper: Arkivskaper | undefined;
  project: Project | undefined;
  current: Series | undefined;
  set: React.Dispatch<React.SetStateAction<Series | undefined>>;
  setUpdateSeries: React.Dispatch<React.SetStateAction<boolean>>;
  updateSeries: boolean;
}) => {
  const [series, setSeries] = React.useState<Array<Series>>();
  useEffect(() => {
    const fetchData = async () => {
      if (arkivskaper?.id && project?.id) {
        await apiRequest(
          "get",
          `/arkivserie/get/${arkivskaper.id}/${project.id}`
        )
          .then((response: AxiosResponse<Array<Series>>) => {
            if (updateSeries === true) {
              setUpdateSeries(false);
            }
            if (response.data) {
              setSeries(response.data);
            }
            if (response?.data[0]?.navn && response?.data[0]?.id) {
              set({
                id: response.data[0].id,
                navn: response.data[0].navn,
              });
            } else {
              set(undefined);
              return toast.warn(
                `Det finnes ingen arkivserie på ${
                  arkivskaper?.name ? arkivskaper.name : ""
                }, ${project?.navn ? project.navn : ""}. Legg til en ny?`,
                toastOptionsTop as ToastOptions
              );
            }
          })
          .catch((err) => console.error(err));
      }
    };

    fetchData().catch((err) => {
      throw err;
    });
  }, [project, updateSeries]);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.children[index];
    const id = el.getAttribute("id");
    const value = el.getAttribute("value");
    if (id && value) {
      set({
        id: Number(id),
        navn: value,
      });
    }
  };
  return (
    <div>
      <p>Velg Arkivserie:</p>
      <select
        className="form-select select-arrow-down border w-full"
        onChange={handleChange}
        value={project?.id ? current?.navn : ""}
        disabled={project?.id === undefined}
      >
        {series?.map((a?) => {
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

export default SelectSeries;
