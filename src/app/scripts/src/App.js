import React from "react";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { downloadBlob } from "./descargar";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Tarjeta de propiedad"),
  createData("SOAT"),
  createData("Llave de contacto"),
  createData("Llanta de repuesto"),
  createData("Llave de ruedas"),
];

const App = ({ device, session, api }) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
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
  const descargarCL = () => {
    try {
      downloadBlob(
        "https://test-publico.s3.amazonaws.com/Check+list+camionetas.pdf",
        "Checklist_SF"
      );
    } catch (error) {
      console.log("Error al descargar CL: ", error);
    }
  };
  const Odometro = () => <>El odómetro es {odometroDiv} km</>;
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <div>
        <Switch {...label} defaultChecked />

        <Switch {...label} />

        <Switch {...label} disabled defaultChecked />

        <Switch {...label} disabled />
      </div>
      <h1>Diego - Primer addin de Geotab Drive!</h1>
      Aquí se debería mostrar el usuario: <br />
      {session.userName} <br />
      <br />
      Aquí se debería mostrar el vehículo asignado: <br />
      {device.name} <br />
      <br />
      Este botón debería mostrar el odómetro actual del vehículo asignado:
      <br />
      <button
        className="boton-odometro"
        type="button"
        onClick={() => obtenerOdometro({ device })}
      >
        Click para obtener odómetro de {device.name}
      </button>
      <div>{openDiv ? <Odometro /> : null}</div> <br />
      <h2>Tratando de replicar checklist de San Fernando</h2>
      Aquí debería poder ver el logo de SF:
      <br />
      <center>
        <img
          src="https://play-lh.googleusercontent.com/f35RMXXJjKSlUptfB6DZ9tIqHxEVIS-cszNfZ5fvjHPxnrbgg9hr-KBdIEiUcz1Ba3M"
          alt="Logo San Fernando"
          width="50%"
        ></img>
      </center>
      <br />
      Aquí debería poder seleccionar SOLO UNA opción de las 3 disponibles:
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table" style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>COMPONENTES EXTERNOS </TableCell>{" "}
            </TableRow>

            <TableRow>
              <TableCell align="left">Requisito</TableCell>

              <TableCell align="center">Bueno</TableCell>
              <TableCell align="center">Regular</TableCell>
              <TableCell align="center">Malo</TableCell>

              {/* <TableCell align="left">Regular</TableCell>
              <TableCell align="left">Malo</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell align="center" colSpan={3}>
                  {/* El colSpan es para indicar cuantas columnas abarca */}
                  <FormControl hiddenLabel={true}>
                    <RadioGroup row align="center">
                      <FormControlLabel
                        value="bueno"
                        control={<Radio />}
                        align="center"
                      />

                      <FormControlLabel
                        value="regular"
                        control={<Radio />}
                        align="center"
                      />

                      <FormControlLabel
                        value="malo"
                        control={<Radio />}
                        align="center"
                      />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      Aquí debería poder descargar el PDF del checklist original de SF:
      <br />
      <a href="Checklist_SF.pdf" download>
        <button>Descargar CL de SF</button>
      </a>
    </div>
  );
};

export default App;
