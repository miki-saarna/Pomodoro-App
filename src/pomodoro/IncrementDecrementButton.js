import React from "react";

function IncrementDecrementButton({ duration, dataInfo, disable, value, name, spanClass }) {
    return (
      <button
        type="button"
        className={`btn btn-primary ${spanClass}`}
        data-testid={dataInfo}
        onClick={duration}
        disabled={disable}
        name={name}
        value={value}
      >
      </button>
    )
}

export default IncrementDecrementButton;