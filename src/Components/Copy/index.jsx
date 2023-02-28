import React, { useState } from "react";

function Copy({ column, item }) {
  const [copy, setCopy] = useState(null);

  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      onClick={() => {
        copyTextToClipboard(item[column]);

        setCopy(`${item.id}-${item[column]}`);
        setTimeout(() => {
          setCopy(null);
        }, 1000);
      }}
      className="flex items-center justify-center"
    >
      {copy == `${item.id}-${item[column]}` ? (
        <div className="relative flex flex-col justify-center items-center cursor-pointer">
          <div className="absolute h-8 w-20 p-1 -top-9 bg-[#4ade80] rounded-2xl text-white flex items-center justify-center text-xs font-normal">
            <p style={{ margin: 0 }}>Copied</p>
          </div>
          <i className="fa-solid fa-circle-check"></i>{" "}
        </div>
      ) : (
        <div className="cursor-pointer">
          <i className="fa-solid fa-copy"></i>{" "}
        </div>
      )}
    </div>
  );
}

export default Copy;
