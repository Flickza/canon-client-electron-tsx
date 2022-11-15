import { apiRequest } from "@/render/utils/api";
import { toastOptionsTop } from "@/render/utils/toast";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";
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
  const [show, setShow] = React.useState(true);

  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <p>Velg Arkivserie:</p>
      <span className="flex gap-3">
        <select
          className="form-select select-arrow-down border w-11/12"
          onChange={handleChange}
          value={current ? current?.navn : ""}
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
        <NewSeries
          setUpdateSeries={setUpdateSeries}
          arkivskaper={arkivskaper}
          project={project}
        />
      </div>
    </>
  );
};

export default SelectSeries;
