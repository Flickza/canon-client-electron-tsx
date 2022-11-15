import { apiRequest } from "@/render/utils/api";
import { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";

const NewSeries = ({
  arkivskaper,
  project,
  setUpdateSeries,
}: {
  arkivskaper: Arkivskaper | undefined;
  project: Project | undefined;
  setUpdateSeries: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [input, setInput] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.replace(/[^a-zA-Z 0-9_-]/g, "").toUpperCase());
  };

  const createSeries = async () => {
    if (
      input.length > 0 &&
      arkivskaper?.id !== undefined &&
      project?.id !== undefined
    ) {
      console.log(`/arkivserie/${arkivskaper?.id}/${project?.id}/${input}`);
      await toast
        .promise(
          apiRequest(
            "post",
            `/arkivserie/${arkivskaper?.id}/${project?.id}/${input}`
          ),
          {
            pending: `Opretter ny arkivserie: ${input}.`,
            success: `Opretting av arkivserie: ${input} fullført.`,
            error: {
              render({ data }: AxiosResponse) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
                return `Noe gikk galt, prøv igjen senere. \n ${data?.response?.data?.code}`;
              },
            },
          }
        )
        .then(() => {
          if (arkivskaper.id !== "" && project.id !== undefined) {
            setInput("");
            setUpdateSeries(true);
          }
        });
    }
  };

  return (
    <>
      <label htmlFor="input">Ny Serie:</label>
      <span className="flex gap-3">
        <input
          type="text"
          className="form-control border w-5/6"
          onChange={handleChange}
          value={input}
        />
        <button className="btn btn-main border w-1/6" onClick={createSeries}>
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
    </>
  );
};

export default NewSeries;
