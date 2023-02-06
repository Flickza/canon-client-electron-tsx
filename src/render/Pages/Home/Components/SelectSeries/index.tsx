import { apiRequest } from "@/render/utils/api";
import { toastOptionsTop } from "@/render/utils/toast";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";
import Add from "../Add";
import NewSeries from "../NewSeries";

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
      if (!arkivskaper?.id || project?.id === undefined) {
        setSeries(undefined);
        set(undefined);
        return;
      }
      await apiRequest("get", `/arkivserie/get/${arkivskaper.id}/${project.id}`)
        .then((response: AxiosResponse<Array<Series>>) => {
          setUpdateSeries(false);
          setSeries(response?.data);

          if (response?.data[0]?.navn && response?.data[0]?.id) {
            return set({
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
    };

    fetchData().catch((err) => {
      throw err;
    });
  }, [project, updateSeries]);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const value = e.target.selectedOptions[0].dataset.name;
    if (id && value) {
      set({
        id: Number(id),
        navn: value,
      });
    }
  };
  const toggle = () => {
    toast(
      <NewSeries
        setUpdateSeries={setUpdateSeries}
        arkivskaper={arkivskaper}
        project={project}
      />,
      {
        toastId: "newOption",
        position: "bottom-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        theme: "dark",
      }
    );
  };
  return (
    <>
      <p>Velg Arkivserie:</p>
      <span className="flex gap-3">
        <select
          className="form-select select-arrow-down w-11/12 border"
          onChange={handleChange}
          value={current ? current?.id : ""}
          disabled={project?.id === undefined}
        >
          {series?.map((a?) => {
            return (
              <option
                className="form-select"
                key={a?.id}
                value={a?.id}
                data-name={a?.navn}
              >
                {a?.navn}
              </option>
            );
          })}
        </select>
        <button className="btn btn-main step-9 w-1/12 border" onClick={toggle}>
          <Add />
        </button>
      </span>
    </>
  );
};

export default SelectSeries;
