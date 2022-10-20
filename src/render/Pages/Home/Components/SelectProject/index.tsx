import { Arkivskaper, Project } from "@/render/types";
import axios, { AxiosResponse } from "axios";
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
  current: string | undefined;
  set: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUpdateProject: React.Dispatch<React.SetStateAction<boolean>>;
  updateProject: boolean;
}) => {
  const [projects, setProjects] = React.useState<Array<Project>>();

  useEffect(() => {
    const fetchData = async () => {
      if (arkivskaper?.id) {
        await axios({
          method: "get",
          url: `http://10.170.8.154:7373/project/get/${arkivskaper.id}`,
          responseType: "json",
        })
          .then((response: AxiosResponse<Array<Project>>) => {
            if (updateProject === true) {
              setUpdateProject(false);
            }
            if (response.data) {
              setProjects(response.data);
              if (response?.data[0]?.navn && response?.data[0]?.id) {
                set(response?.data[0].navn);
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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set(event.target.value);
  };
  return (
    <div>
      <p>Velg prosjekt:</p>
      <select
        className="form-select select-arrow-down border w-full"
        onChange={handleChange}
        value={current}
        disabled={arkivskaper?.id === undefined}
      >
        {projects?.map((a?) => {
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

export default SelectProject;
