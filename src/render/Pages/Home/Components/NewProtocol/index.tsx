import { apiRequest } from "@/render/utils/api";
import { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";

const NewProtocol = ({
  series,
  setUpdateProtocol,
}: {
  series: Series | undefined;
  setUpdateProtocol: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [input, setInput] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.replace(/[^a-zA-Z 0-9_-]/g, "").toUpperCase());
  };

  const CreateProtocol = async () => {
    if (input.length > 0 && series?.id !== undefined) {
      console.log(`/protokoll/${series?.id}/${input}`);
      await toast
        .promise(apiRequest("post", `/protocol/${series?.id}/${input}`), {
          pending: `Opretter ny protokoll: ${input}.`,
          success: `Opretting av protokoll: ${input} fullført.`,
          error: {
            render({ data }: AxiosResponse) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
              return `Noe gikk galt, prøv igjen senere. \n ${data?.response?.data?.code}`;
            },
          },
        })
        .then(() => {
          if (series.id !== undefined) {
            setInput("");
            setUpdateProtocol(true);
          }
        });
    }
  };

  const [show, setShow] = React.useState(true);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      <button className="btn btn-main border w-full" onClick={toggleShow}>
        <span className="flex justify-center text-lg text-left">
          <p>Ny Protokoll</p>
        </span>
      </button>
      <div className="transition-all mt-1" hidden={show}>
        <span className="flex gap-3">
          <input
            type="text"
            className="form-control border w-5/6"
            value={input}
            onChange={handleChange}
            disabled={series?.id === undefined}
          />
          <button
            className="btn btn-main border w-1/6"
            onClick={CreateProtocol}
            disabled={series?.id === undefined}
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
    </div>
  );
};

export default NewProtocol;