import React from "react";

const Series = ({
  current,
  set,
}: {
  current: string | undefined;
  set: React.Dispatch<React.SetStateAction<string>>;
  }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    set(event.target.value);
  }
  return (
    <div>
      <p>Arkivserie:</p>
      <input type="text" className="form-control border w-full" onChange={handleChange} value={current} />
    </div>
  );
};

export default Series;
