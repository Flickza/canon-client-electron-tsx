import { Project } from "@/render/types";
import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";

const SelectProject = ({
  arkivskaper_id,
  current,
  set,
  setUpdateProject,
  updateProject,
}: {
  arkivskaper_id: number | string | undefined;
  current: string | undefined;
  set: React.Dispatch<React.SetStateAction<string>>;
  setUpdateProject: React.Dispatch<React.SetStateAction<boolean>>;
  updateProject: boolean;
}) => {
  const [projects, setProjects] = React.useState<Array<Project>>();

  useEffect(() => {
    const fetchData = async () => {
      if (arkivskaper_id !== undefined) {
        await axios({
          method: "get",
          url: `http://10.170.8.154:7373/project/get/${arkivskaper_id}`,
          responseType: "json",
        })
          .then((response: AxiosResponse<Array<Project>>) => {
            if (updateProject === true) {
              setUpdateProject(false);
            }
            setProjects(response.data);
          })
          .catch((err) => console.error(err));
      }
    };

    fetchData().catch((err) => {
      throw err;
    });
  }, [arkivskaper_id, updateProject]);

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
        disabled={arkivskaper_id === undefined}
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
