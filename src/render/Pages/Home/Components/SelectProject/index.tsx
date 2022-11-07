import { apiRequest } from "@/render/utils/api";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const SelectProject = ({
  arkivskaper,
  current,
  set,
  setUpdateProject,
  updateProject,
}: {
  arkivskaper: Arkivskaper | undefined;
  current: Project | undefined;
  set: React.Dispatch<React.SetStateAction<Project | undefined>>;
  setUpdateProject: React.Dispatch<React.SetStateAction<boolean>>;
  updateProject: boolean;
}) => {
  const [projects, setProjects] = React.useState<Array<Project>>();

  useEffect(() => {
    const fetchData = async () => {
      if (arkivskaper?.id) {
        await apiRequest("get", `/project/get/${arkivskaper.id}`)
          .then((response: AxiosResponse<Array<Project>>) => {
            if (updateProject === true) {
              setUpdateProject(false);
            }
            if (response.data) {
              setProjects(response.data);
              if (response?.data[0]?.navn && response?.data[0]?.id) {
                set({
                  id: response.data[0].id,
                  navn: response.data[0].navn,
                });
              } else {
                set(undefined);
                return toast.warn(
                  "Det finnes ingen prosjekter på denne arkivskaperen enda. Legg til en ny?",
                  {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  }
                );
              }
            }
          })
          .catch((err) => console.error(err));
      }
    };

    fetchData().catch((err) => {
      throw err;
    });
  }, [arkivskaper, updateProject]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.children[index];
    const id = el.getAttribute("id");
    const value = el.getAttribute("value");
    if (id && value) {
      set({
        id: id,
        navn: value,
      });
    }
  };
  return (
    <div>
      <p>Velg prosjekt:</p>
      <select
        className="form-select select-arrow-down border w-full"
        onChange={handleChange}
        value={current?.navn}
        disabled={arkivskaper?.id === undefined}
      >
        {projects?.map((a?) => {
          return (
            <option
              className="form-select"
              key={a?.navn}
              id={a?.id}
              value={a?.navn}
            >
              {a?.navn}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectProject;
