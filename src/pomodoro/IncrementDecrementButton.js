import React from "react";

function IncrementDecrementButton({duration, dataInfo, disable, value, name, spanClass}) {
    return (
      <button
        type="button"
        className="btn btn-primary"
        data-testid={dataInfo}
        onClick={duration}
        disabled={disable}
        name={name}
        value={value}
      >
        <span className={spanClass} />
      </button>
    )
}

export default IncrementDecrementButton;