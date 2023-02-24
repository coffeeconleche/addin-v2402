import React from "react";
const App = ({ device, session, api }) => {
  //console.log(props);
  const [openDiv, setOpenDiv] = React.useState(false);
  const [odometroDiv, setOdometroDiv] = React.useState("");
  const obtenerOdometro = ({ device }) => {
    console.log("Se presionó el botón de obtener odómetro");
    console.log(device.id);
    var now = new Date().toISOString(),
      diagnostic = {
        id: "DiagnosticOdometerAdjustmentId",
      };
    api.call(
      "Get",
      {
        typeName: "StatusData",
        search: {
          fromDate: now,
          toDate: now,
          diagnosticSearch: diagnostic,
          deviceSearch: { id: device.id },
        },
      },
      (result) => {
        let odometro = result[0].data / 1000;
        console.log(odometro);
        setOpenDiv(true);
        setOdometroDiv(odometro);
        //return <Odometro odometro={odometro} />;

        // return (
        //   <>
        //     <h1>El kilometraje de {device.name}!</h1>
        //     <h1>{odometro}</h1>
        //   </>
        // );
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const Odometro = () => <h1>El odómetro es {odometroDiv}</h1>;
  return (
    <div>
      <h1>Diego - Primer addin de Geotab Drive!</h1>

      <h1>Bienvenido {session.userName}!</h1>
      <h1>El vehículo que seleccionaste es {device.name}</h1>

      <button
        className="boton-odometro"
        type="button"
        onClick={() => obtenerOdometro({ device })}
      >
        Consultar odómetro actual de {device.name}
      </button>
      <div>{openDiv ? <Odometro /> : null}</div>
    </div>
  );
};

export default App;
