/*Fondo Gral*/

const Fondo = ({ children, image = "/FondoTurnify.png", height = "100vh" }) => {
  return (
    <div
      style={{
        backgroundImage: `url("${image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: height,
      }}
    >
      {children}
    </div>
  );
};

export default Fondo;
