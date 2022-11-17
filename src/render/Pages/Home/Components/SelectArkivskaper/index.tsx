import React, { useEffect } from "react";
import { AxiosResponse } from "axios";
import { toast, ToastOptions } from "react-toastify";
import { apiRequest } from "@/render/utils/api";
import { toastOptionsTop } from "@/render/utils/toast";
import NewArkivskaper from "../NewArkivskaper";
import addIcon from "../../../../../../assets/icons/add.svg";
import Add from "../Add";

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
  const toggle = () => {
    toast(<NewArkivskaper setUpdateArkivskaper={setUpdateArkivskaper} />, {
      toastId: "newOption",
      position: "bottom-right",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      theme: "dark",
    });
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
        <button className="btn btn-main border w-1/12" onClick={toggle}>
          <Add />
        </button>
      </span>
    </>
  );
};

export default SelectArkivskaper;
