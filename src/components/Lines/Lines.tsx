export const LineUnderFile = ({
  height,
  top,
}: {
  height: number;
  top: number;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: `${top}%`,
        left: "50%",
        width: "1px",
        height: `${height}px`,
        backgroundColor: "#ccc",
        transform: "translate(-50%)",
        pointerEvents: "none",
      }}
    />
  );
};

export const LineBeforeFile = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "-77%",
        width: "12.5px",
        height: "1px",
        backgroundColor: "#ccc",
        pointerEvents: "none",
      }}
    />
  );
};
