import React, { useEffect } from "react";
import { AxiosResponse } from "axios";
import { toast, ToastOptions } from "react-toastify";
import { apiRequest } from "@/render/utils/api";
import { toastOptionsTop } from "@/render/utils/toast";
import NewArkivskaper from "../NewArkivskaper";
import addIcon from "../../../../../../assets/icons/add.svg";

const SelectArkivskaper = ({
  current,
  set,
  updateArkivskaper,
  setUpdateArkivskaper,
}: {
  current: Arkivskaper | undefined;
  set: React.Dispatch<React.SetStateAction<Arkivskaper>>;
  updateArkivskaper: boolean;
  setUpdateArkivskaper: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [Arkivskapere, setArkivskapere] = React.useState<Array<Creator>>();

  useEffect(() => {
    if (current === undefined || updateArkivskaper === true) {
      const fetchData = async () => {
        await apiRequest("get", "/creator/get")
          .then((response: AxiosResponse<Array<Creator>>) => {
            if (response.data.length === 0) {
              return toast.warn(
                "Det finnes ingen arkivskapere enda. Legg til en ny?",
                toastOptionsTop as ToastOptions
              );
            }
            setArkivskapere(response.data);
            if (response.data[0].id && response.data[0].navn) {
              set({
                id: response.data[0].id.toString(),
                name: response.data[0].navn,
              });
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    toast.dismiss(1);
    const index = e.target.selectedIndex;
    const el = e.target.children[index];
    const id = el.getAttribute("id");
    const value = el.getAttribute("value");
    if (id && value) {
      set({
        id: id,
        name: value,
      });
    }
  };
  const [show, setShow] = React.useState(true);

  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <p>Velg arkivskaper:</p>
      <span className="flex gap-3">
        <select
          className="form-select select-arrow-down focus:select-arrow-up border w-11/12"
          onChange={handleChange}
          value={current?.name}
        >
          {Arkivskapere?.map((a?) => {
            return (
              <option
                className="form-select"
                key={a?.id}
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
        <NewArkivskaper setUpdateArkivskaper={setUpdateArkivskaper} />
      </div>
    </>
  );
};

export default SelectArkivskaper;
