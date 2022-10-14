import React, { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Creator } from "@/render/types";
import { toast } from "react-toastify";

const SelectArkivskaper = ({
  current,
  updateArkivskaper,
  setUpdateArkivskaper,
  set,
}: {
  current: number | undefined;
  updateArkivskaper: boolean;
  setUpdateArkivskaper: React.Dispatch<React.SetStateAction<boolean>>;
  set: React.Dispatch<React.SetStateAction<number | undefined | string>>;
}): JSX.Element => {
  const [Arkivskapere, setArkivskapere] = React.useState<Array<Creator>>();

  useEffect(() => {
    if (current === undefined || updateArkivskaper === true) {
      const fetchData = async () => {
        await axios({
          method: "get",
          url: `http://10.170.8.154:7373/creator/get`,
          responseType: "json",
        })
          .then((response: AxiosResponse<Array<Creator>>) => {
            if (response.data.length === 0) {
              return toast.warn(
                "Det finnes ingen arkivskapere enda. Legg til en ny?",
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
            setArkivskapere(response.data);
            if (response.data[0].id !== undefined) {
              set(response.data[0].id);
              setUpdateArkivskaper(false);
            }
          })
          .catch((err) => console.error(err));
      };
      fetchData().catch((err) => {
        throw err;
      });
    }
  }, [setArkivskapere, updateArkivskaper]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    set(event.target.value);
  };
  return (
    <div>
      <p>Velg arkivskaper:</p>
      <select
        className="form-select select-arrow-down focus:select-arrow-up border w-full"
        onChange={handleChange}
        value={current}
      >
        {Arkivskapere?.map((a?) => {
          return (
            <option className="form-select" key={a?.id} value={a?.id}>
              {a?.navn}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectArkivskaper;
