import { apiRequest } from "@/render/utils/api";
import { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import NewProject from "../NewProject";

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
  const [show, setShow] = React.useState(true);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <p>Velg prosjekt:</p>
      <span className="flex gap-3">
        <select
          className="form-select select-arrow-down border w-11/12"
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
        <NewProject
          arkivskaper={arkivskaper}
          setUpdateProject={setUpdateProject}
        />
      </div>
    </>
  );
};

export default SelectProject;
