import { apiRequest } from "@/render/utils/api";
import { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";

const NewArkivskaper = ({
  setUpdateArkivskaper,
}: {
  setUpdateArkivskaper: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [input, setInput] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(
      event.target.value.replace(/[^a-zA-Z 0-9_-æøå]/g, "").toUpperCase()
    );
  };

  const createCreator = async () => {
    if (input.length > 0) {
      await toast
        .promise(apiRequest("post", `/creator/${input}`), {
          pending: `Opretter ny arkivskaper: ${input}.`,
          success: `Opretting av arkivskaper: ${input} fullført.`,
          error: {
            render({ data }: AxiosResponse) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
              return `Noe gikk galt, prøv igjen senere. \n ${data?.response?.data?.code}`;
            },
          },
        })
        .then((data: AxiosResponse<{ insertId: number }>) => {
          if (data?.data?.insertId) {
            setInput("");
            setUpdateArkivskaper(true);
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
          <p>Ny Arkivskaper</p>
        </span>
      </button>
      <div className="transition-all mt-1" hidden={show}>
        <span className="flex gap-3">
          <input
            type="text"
            className="form-control border w-5/6"
            onChange={handleChange}
            value={input}
          />
          <button className="btn btn-main border w-1/6" onClick={createCreator}>
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

export default NewArkivskaper;
