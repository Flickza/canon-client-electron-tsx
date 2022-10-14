import axios, { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";

const NewProject = ({
  arkivskaper_id,
  setUpdateProject,
}: {
  arkivskaper_id: number | undefined;
  setUpdateProject: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [input, setInput] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.replace(/[^a-zA-Z 0-9_-]/g, ""));
  };

  const createProject = async () => {
    if (input.length > 0 && arkivskaper_id !== undefined) {
      await toast
        .promise(
          axios({
            method: "post",
            url: `http://10.170.8.154:7373/project/${arkivskaper_id}/${input}`,
          }),
          {
            pending: `Opretter nytt prosjekt: ${input}.`,
            success: `Opretting av prosjekt: ${input} fullført.`,
            error: {
              render({ data }: AxiosResponse) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
                return `Noe gikk galt, prøv igjen senere. \n ${data?.response?.data?.code}`;
              },
            },
          }
        )
        .then(() => {
          if (arkivskaper_id !== undefined) {
            console.log(arkivskaper_id);
            setInput("");
            setUpdateProject(true);
          }
        });
    }
  };

  return (
    <div>
      <p>Nytt prosjekt:</p>
      <span className="flex gap-3">
        <input
          type="text"
          className="form-control border w-5/6"
          value={input}
          onChange={handleChange}
          disabled={arkivskaper_id === undefined}
        />
        <button
          className="btn btn-main border w-1/6"
          onClick={createProject}
          disabled={arkivskaper_id === undefined}
        >
          <span className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </span>
        </button>
      </span>
    </div>
  );
};

export default NewProject;
