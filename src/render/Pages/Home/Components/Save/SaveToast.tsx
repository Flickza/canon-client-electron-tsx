import { toast, ToastContentProps } from "react-toastify";
import first_image from "../../../../../../assets/image/video-slash.png";

const SaveToast = ({
  closeToast,
  path,
  prefix,
  setImage,
}: {
  closeToast?: ToastContentProps["closeToast"];
  path?: folderObject;
  prefix?: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yesOption: any = async (
    closeToast: ToastContentProps["closeToast"],
    prefix: string,
    path: folderObject
  ) => {
    if (path && prefix) {
      await toast
        .promise(window.electron.saveImage(path, prefix), {
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
        }, {
          autoClose: 2000,
        })
        .then(() => {
          if (closeToast) {
            setImage(first_image);
            closeToast();
          }
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
        .promise(window.electron.deleteImage(path), {
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
        }, {
          autoClose: 2000,
        })
        .then(() => {
          if (closeToast) {
            closeToast();
            setImage(first_image);
          }
        });
    }
  };
  return (
    <div className="container min-w-full min-h-full cursor-default">
      <div className="border-b border-neutral-600">
        <h3 className="text-lg">Lagre bildet?</h3>
      </div>
      <div className="border-b flex justify-center p-2 border-neutral-600">
        {prefix ? `${prefix}` : "C:/PATH/TO/IMAGE"}
      </div>
      <div className="flex justify-center align-center gap-3 pt-5 pr-5 pl-5 bg-transparent min-w-full">
        <button
          className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-5 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
          onClick={() => noOption(closeToast, path)}
        >
          Nei
        </button>
        <button
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-5 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
