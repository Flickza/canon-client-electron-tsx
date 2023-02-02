import { apiRequest } from "@/render/utils/api";
import { toast, ToastContentProps } from "react-toastify";
import first_image from "../../../../../../assets/image/video-slash.png";

const SaveToast = ({
  id,
  closeToast,
  path,
  prefix,
  setImage,
  setCaptureDisabled,
}: {
  id: string | undefined;
  closeToast?: ToastContentProps["closeToast"];
  path?: folderObject;
  prefix?: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setCaptureDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yesOption: any = (
    closeToast: ToastContentProps["closeToast"],
    prefix: string,
    path: folderObject
  ) => {
    if (path && prefix && id) {
      apiRequest("post", `/camera/save-to-path`, {
        id: id,
        filename: prefix,
      }).then(async (response) => {
        await toast
          .promise(
            window.electron.saveImage(path, prefix),
            {
              pending: `Jobber...`,
              success: {
                render({ data }: { data: string }) {
                  return `${data}`;
                },
              },
              error: {
                render({ data }: { data: string }) {
                  return `Noe gikk galt.. ${data}`;
                },
              },
            },
            {
              autoClose: 2000,
            }
          )
          .then(() => {
            if (closeToast) {
              setImage(first_image);
              closeToast();
              setCaptureDisabled(false);
            }
          });
      });
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const noOption: any = async (
    closeToast: ToastContentProps["closeToast"],
    path: folderObject
  ) => {
    if (path) {
      await toast
        .promise(
          window.electron.deleteImage(path),
          {
            pending: `Sletter bildet...`,
            success: {
              render({ data }: { data: string }) {
                return `${data}`;
              },
            },
            error: {
              render({ data }: { data: string }) {
                return `Noe gikk galt.. ${data}`;
              },
            },
          },
          {
            className: "toastify__save",
            autoClose: 2000,
          }
        )
        .then(() => {
          if (closeToast) {
            closeToast();
            setImage(first_image);
            setCaptureDisabled(false);
          }
        });
    }
  };
  return (
    <div className="container min-h-full min-w-full cursor-default">
      <div className="border-b border-neutral-600">
        <h3 className="text-lg">Lagre bildet?</h3>
      </div>
      <div className="flex justify-center border-b border-neutral-600 p-2">
        {prefix ? `${prefix}` : "C:/PATH/TO/IMAGE"}
      </div>
      <div className="align-center flex min-w-full justify-center gap-3 bg-transparent pt-5 pr-5 pl-5">
        <button
          className="mr-1 mb-1 rounded-lg bg-red-500 px-5 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-600"
          type="button"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
          onClick={() => noOption(closeToast, path)}
        >
          Nei
        </button>
        <button
          className="mr-1 mb-1 rounded-lg bg-emerald-500 px-5 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
          type="button"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
          onClick={() => yesOption(closeToast, prefix, path)}
        >
          Ja
        </button>
      </div>
    </div>
  );
};

export default SaveToast;
